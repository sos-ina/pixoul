"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

function isAuthRoute(pathname) {
  if (!pathname) return false;
  if (pathname === "/login") return true;
  if (pathname === "/forgot-password") return true;
  if (pathname.startsWith("/auth")) return true;
  return false;
}

export default function AppChrome({ children }) {
  const pathname = usePathname();
  const hideChrome = isAuthRoute(pathname);

  return (
    <>
      {!hideChrome && <Navbar />}
      <div className={hideChrome ? "" : "pt-[72px]"}>{children}</div>
      {!hideChrome && <Footer />}
    </>
  );
}
