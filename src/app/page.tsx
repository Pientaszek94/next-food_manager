"use client";
import Spinner from "@/components/Spinner";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function NotHome() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname == "/") {
      router.push("/home");
    }
  }, [pathname, router]);
  return <Spinner />;
}

export default NotHome;
