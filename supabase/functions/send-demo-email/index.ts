import nodemailer from "npm:nodemailer@6.9.10";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (resets on cold start, but sufficient for basic protection)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json();
    const { name, email, organization, role, phone, interest, message, sourceUrl } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!organization || typeof organization !== "string" || organization.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Invalid organization" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const timestamp = new Date().toISOString();

    const emailBody = `New Demo Request

Name: ${name.trim()}
Email: ${email.trim()}
Organization: ${organization.trim()}
Role/Title: ${(role || "N/A").trim()}
Phone: ${(phone || "N/A").trim()}
Primary Interest: ${(interest || "N/A").trim()}
Message: ${(message || "N/A").trim()}

Timestamp: ${timestamp}
IP: ${clientIp}
Source Page: ${sourceUrl || "N/A"}`;

    const transporter = nodemailer.createTransport({
      host: Deno.env.get("GMAIL_SMTP_HOST"),
      port: parseInt(Deno.env.get("GMAIL_SMTP_PORT") || "587"),
      secure: false,
      auth: {
        user: Deno.env.get("GMAIL_SMTP_USER"),
        pass: Deno.env.get("GMAIL_SMTP_PASS"),
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: Deno.env.get("GMAIL_FROM"),
      to: Deno.env.get("GMAIL_TO"),
      subject: `Insight Weave – New Demo Request from ${name.trim()}`,
      text: emailBody,
    });

    console.log(`Demo request sent successfully for ${email.trim()} from IP ${clientIp}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending demo email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
