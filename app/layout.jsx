
import "./globals.css";
import AppChrome from "../components/layout/AppChrome";
import { CartProvider } from "@/components/cart/SessionCartProvider";
import Chatbot from "@/components/chatbot/Chatbot";

import { Providers } from "./providers";


export const metadata = {
  title: "Pixoul",
  description: "Pixoul immersive experiences",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en"  suppressHydrationWarning>
       
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
