import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const IpFooter = () => {
  const [ip, setIp] = useState("Loading...");

  useEffect(() => {
    const storedIp = localStorage.getItem("__public_ip");

    if (storedIp) {
      setIp(storedIp);
    }
  }, []);

  return (
    <div className="text-center mt-4">
      <Link
        to="/contact#fingerprint"
        className="text-xs text-primary underline hover:text-primary/80"
      >
        Your IP Address: {ip}
      </Link>
    </div>
  );
};

export default IpFooter;