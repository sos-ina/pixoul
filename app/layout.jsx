
import "./globals.css";
import AppChrome from "../components/layout/AppChrome";
import { CartProvider } from "@/components/cart/SessionCartProvider";
import Chatbot from "@/components/chatbot/Chatbot";
import { cookies } from "next/headers";

import { Providers } from "./providers";


export const metadata = {
  title: "Pixoul",
  description: "Pixoul immersive experiences",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const googTrans = cookieStore.get("googtrans")?.value || "";
  const isArabic = decodeURIComponent(googTrans).toLowerCase().endsWith("/ar");
  const htmlLang = isArabic ? "ar" : "en";
  const htmlDir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={htmlLang} dir={htmlDir} suppressHydrationWarning>
       
      <body suppressHydrationWarning className="bg-white text-black dark:bg-black dark:text-white">
        <Providers>

          <CartProvider>
          <AppChrome>{children}</AppChrome>
          <Chatbot />
        </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
