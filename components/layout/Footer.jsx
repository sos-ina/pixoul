"use client";

import FooterColumn from "../ui/FootColumn";

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
        </div>

        {/* Column 2: Quick Links */}
        <FooterColumn title="Quick Links">
          <span className="footer-item">Home</span>
          <span className="footer-item">Games</span>
          <span className="footer-item">VR Experience</span>
          <span className="footer-item">Events</span>
          <span className="footer-item">Contact</span>
        </FooterColumn>

        {/* Column 3: Experiences (placeholder) */}
        <FooterColumn title="Experiences">
          <span className="footer-item">Single Player</span>
          <span className="footer-item">Multiplayer</span>
          <span className="footer-item">Arcade</span>
        </FooterColumn>

        {/* Column 4: Events (placeholder) */}
        <FooterColumn title="Events">
          <span className="footer-item">Birthdays</span>
          <span className="footer-item">Corporate</span>
          <span className="footer-item">Private Parties</span>
        </FooterColumn>

        {/* Column 5: Legal / Info (placeholder) */}

        <FooterColumn title="Info">
          <span className="footer-item">About Pixoul</span>
          <span className="footer-item">Privacy Policy</span>
          <span className="footer-item">Terms of Service</span>
        </FooterColumn>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 text-center py-4 md:py-6 px-4 text-xs sm:text-sm md:text-sm dark:text-gray-500 text-gray-700">
        © {new Date().getFullYear()} PixoulGaming. All rights reserved.
      </div>
    </footer>
  );
}
