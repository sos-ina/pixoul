
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


export const metadata = {
  title: "Pixoul",
  description: "Pixoul immersive experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

