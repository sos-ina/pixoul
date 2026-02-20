"use client";

import FooterColumn from "../ui/FootColumn";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">

        {/* Column 1: Logo */}
        <div className="flex flex-col gap-3 md:gap-4">
           <div className="flex items-center gap-2">
          <img
            src="/logos/Pixoul Logo.ico"
            alt="Pixoul Logo"
            className="h-[200px] w-auto"
          />
        </div>
          <p className="text-xs sm:text-sm md:text-sm dark:text-gray-400 text-gray-600">
            Immersive experiences beyond reality.
          </p>
          <div >
          <p>
            Subscribe to out newsLetter
          </p>
          <span className="flex">
            <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded-l bg-white/80 dark:bg-black/80 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#38C2D9]/50 focus:border-[#38C2D9]/50 text-sm" />
          </span>
        </div>
        </div>
        

        {/* Column 2: Quick Links */}
        <FooterColumn title="Quick Links">
          <Link href="/"><span className="footer-item">Home</span></Link>
          <Link href="/experience/all"><span className="footer-item">All Experiences</span></Link>
          <Link href="/events/hall"><span className="footer-item">The Hall</span></Link>
          <Link href="/birthday"><span className="footer-item">Birthday</span></Link>
        </FooterColumn>

        {/* Column 3: Experiences (placeholder) */}
        <FooterColumn title="Experiences">
          <Link href="/experience/vr"><span className="footer-item">VR Experience</span></Link>
          <Link href="/experience/arcade"><span className="footer-item">Arcade Games</span></Link>
          <Link href="/experience/pc"><span className="footer-item">PC Games</span></Link>
        </FooterColumn>

        {/* Column 4: Events (placeholder) */}
        <FooterColumn title="Visitors Info">
          <Link href="/health"><span className="footer-item">Health</span></Link>
          <Link href="/parking"><span className="footer-item">Parking</span></Link>
          <Link href="/"><span className="footer-item"></span></Link>
        </FooterColumn>

        {/* Column 5: Legal / Info (placeholder) */}

        <FooterColumn title="Info">
          <Link href="/terms"><span className="footer-item">Terms and Conditions</span></Link>
          <Link href="/privacy"><span className="footer-item">Privacy Policy</span></Link>
          <Link href="/about"><span className="footer-item">About Pixoul</span></Link>
          <Link href="/contact"><span className="footer-item">Contact Us</span></Link>
          <Link href="/faqs"><span className="footer-item">FAQs</span></Link>
        </FooterColumn>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 text-center py-4 md:py-6 px-4 text-xs sm:text-sm md:text-sm dark:text-gray-500 text-gray-700">
        © {new Date().getFullYear()} PixoulGaming. All rights reserved.
      </div>
    </footer>
  );
}
