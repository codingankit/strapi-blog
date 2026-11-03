"use client";

import { useEffect } from "react";

export function AuthDiscovery() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("error_code=otp_expired")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null;
}
