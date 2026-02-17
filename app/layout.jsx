
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
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
       
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Providers>

          <CartProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Chatbot />
          <Footer />
        </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
