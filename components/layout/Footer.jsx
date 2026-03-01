"use client";

import FooterColumn from "../ui/FootColumn";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { name: "Discord", href: "https://discord.com/", icon: "/logos/discord.png" },
    { name: "Facebook", href: "https://facebook.com/", icon: "/logos/facebook.png" },
    { name: "Instagram", href: "https://instagram.com/", icon: "/logos/instagram.png" },
    { name: "LinkedIn", href: "https://linkedin.com/", icon: "/logos/linkedin.png" },
    { name: "X (Twitter)", href: "https://x.com/", icon: "/logos/twitter.jpg" }, 
    { name: "TikTok", href: "https://tiktok.com/", icon: "/logos/tiktok.png" },
    { name: "Twitch", href: "https://twitch.tv/", icon: "/logos/twitch.jpg" },
    { name: "YouTube", href: "https://youtube.com/", icon: "/logos/youtube.png" },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/logos/Pixoul Logo .png"
              alt="Pixoul Logo"
              className="h-[42px] w-auto object-contain"
            />
          </div>

          <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">
            Immersive experiences beyond reality.
          </p>

          {/* Trust + contact */}
          <div className="text-xs sm:text-sm dark:text-gray-400 text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <span aria-hidden>📞</span> <span>02 418 6699</span>
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden>📍</span> <span>Abu Dhabi, UAE</span>
            </p>
          </div>
          
          <div className="pt-3">
            <p className="text-sm font-semibold text-black dark:text-white">
              Opening Hours
            </p>
            <div className="mt-2 text-xs sm:text-sm dark:text-gray-400 text-gray-600 space-y-1">
              <p className="font-semibold text-black/80 dark:text-white/80">
                VR & Esport
              </p>
              <p>
                <span className="font-medium block">Sunday – Wednesday:</span>
                <span>10:00 am – 10:00 pm</span>
              </p>
              <p>
                <span className="font-medium block">Thursday – Saturday:</span>
                <span>10:00 am – 12:00 am (midnight)</span>
              </p>
            </div>
          </div>
        </div>

        <FooterColumn title="Explore">
          <Link href="/">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Home</span>
          </Link>
          <Link href="/experience/all">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">All Experiences</span>
          </Link>
          <Link href="/birthday">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Birthday</span>
          </Link>
          <Link href="/events/hall">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">The Hall</span>
          </Link>
          <Link href="/events/school-visit">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">School Visit</span>
          </Link>
        </FooterColumn>

        <FooterColumn title="Visitor Info">
          <Link href="/plan-your-visit/how-it-works">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">How Pixoul Works</span>
          </Link>
          <Link href="/plan-your-visit/pricing">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Pricing</span>
          </Link>
          <Link href="/plan-your-visit/faqs">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">FAQs</span>
          </Link>
        </FooterColumn>

        <FooterColumn title="Community & Legal">
          <Link href="/community/player-profile">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Player Profile</span>
          </Link>
          <Link href="/community/reviews">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Reviews</span>
          </Link>
          <Link href="/community/forums">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Forums</span>
          </Link>
          <Link href="/community/challenges">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Challenges</span>
          </Link>
        </FooterColumn>

        <FooterColumn title="Company & Updates">
  <Link href="/plan-your-visit/our-story">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Our Story</span>
          </Link>
          <Link href="/plan-your-visit/reach">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Contact Us</span>
          </Link> 
          <Link href="/plan-your-visit/mission-vision">
            <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Mission & Vision</span>
          </Link>

  <div className="my-3 border-t border-black/10 dark:border-white/10"></div>

  <Link href="/terms">
    <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Terms & Conditions</span>
  </Link>
  <Link href="/privacy">
    <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">Privacy Policy</span>
  </Link>

  {/* Divider */}
  <div className="my-3 border-t border-black/10 dark:border-white/10"></div>

  {/* Updates */}
  <Link href="/news">
    <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#38C2D9] transition">News Updates</span>
  </Link>

  {/* Newsletter */}
  <div className="mt-3">
    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
      Subscribe for updates
    </p>

    <div className="flex">
      <input
        type="email"
        placeholder="Your email"
        className="w-full px-3 py-2 rounded-l bg-white dark:bg-black border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#38C2D9]/40 text-sm"
      />
      <button
        className="px-4 py-2 rounded-r bg-[#38C2D9] text-black text-sm font-semibold hover:opacity-90 transition"
      >
        Send
      </button>
    </div>
  </div>
</FooterColumn>
      </div>

      {/* Bottom bar: Social accounts row + Copyright + Payment trust */}
      <div className="border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-6 flex flex-col gap-4">
          {/* Social row (all accounts) */}
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
            <p className="text-xs sm:text-sm dark:text-gray-500 text-gray-700">
              Follow us
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-none border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] hover:scale-[1.04] transition"
                >
                  <img
                    src={s.icon}
                    alt={s.name}
                    className="h-5 w-5 object-contain opacity-90"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright + Trust */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-xs sm:text-sm dark:text-gray-500 text-gray-700">
            <p className="">© {year} PixoulGaming. All rights reserved.</p>

            {/*<p className="text-center md:text-right">
              Secure payments • CVV2/CVC2 verification • Encrypted transactions
            </p>*/}
          </div>
        </div>
      </div>
    </footer>
  );
}