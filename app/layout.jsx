
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { SessionCartProvider } from "@/components/cart/SessionCartProvider";


export const metadata = {
  title: "Pixoul",
  description: "Pixoul immersive experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <SessionCartProvider>
        <Navbar />
        {children}
        </SessionCartProvider>

        <SessionCartProvider>
          <main className="pt-20">
          {children}
        </main>
        </SessionCartProvider>
        
        
        <Footer />
      </body>
    </html>
  );
}

