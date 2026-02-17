"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/Dropdown";
import NavItem from "../ui/NavItem";
import Link from "next/link";
import BookNowButton from '../ui/BookNowButton';

import { useCart } from "@/components/cart/SessionCartProvider";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";


function CartIcon() {
  const { items } = useCart();

  return (
    <Link href="/session-cart" className="relative">
      <img
        src="/logos/cart.png"
        alt="cart"
        className="h-8 w-8 sm:h-9 sm:w-9 border border-[#007EC6] rounded"
      />

      {items.length > 0 && (
        <span
          className="
            absolute -top-2 -right-2
            text-xs
            bg-pink-500
            px-2 py-0.5
            rounded-full
          "
        >
          {items.length}
        </span>
      )}
    </Link>
  );
}





export default function Navbar() {

  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-cover bg-center text-black dark:text-white"
      
    >
      <div>
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <div className="max-w-7xl h-[80px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logos/Pixoul Logo.ico"
            alt="Pixoul Logo"
            className="block h-full w-auto"
          />
        </div>
        <Link href="/virtual-tour">
          {/* 360 tour */}
          <img src="/logos/360 icon.png" alt="3D icon" className=" h-8 w-8 sm:h-9 sm:w-9 border border-[#007EC6] rounded cursor-pointer" />
        </Link>
          


        {/* Navigation Links */}

        <ul className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base">

          <NavItem
            href="/"
            label="Home"
            isActive={pathname === "/"}
            onClick={() => setOpenDropdown(null)}
          />

            <NavItem
                label="Experiences"
                isActive={pathname.includes("/experience")}
                onClick={() => toggleDropdown("experiences")}
            >
                <Dropdown isOpen={openDropdown === "experiences"} >
                    <Link href="/experience/vr" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">VR Games</p></Link>                 
                    <Link href="/experience/pc" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">PC Games</p></Link>
                    <Link href="/experience/retro" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">Retro Games</p></Link>
                    <Link href="/experience/console" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">Console Games</p></Link>
                   <Link href="/experience/arcade" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">Arcade Games</p></Link>
                   <Link href="/experience/sport" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">Sport</p></Link>
                    <Link href="/experience/all" onClick={() => setOpenDropdown(null)}><p className="dropdown-item">All Games</p></Link>

                </Dropdown>
            </NavItem>
            
          <NavItem
            href="/birthday"
            label="Birthday"
            isActive={pathname === "/birthday"}
            onClick={() => setOpenDropdown(null)}
          />

            <NavItem
                label="Events & Groups"
                isActive={pathname.includes("/events")}
                onClick={() => toggleDropdown("eventsGroups")}
                >
            <Dropdown isOpen={openDropdown === "eventsGroups"}>
                <Link href="/events/hall" onClick={() => setOpenDropdown(null)}><p className="dropdown-item cursor-pointer">The Hall</p></Link>
                <Link href="/events/social-room" onClick={() => setOpenDropdown(null)}><p className="dropdown-item cursor-pointer">Social Room</p></Link>
                <Link href="/events/vip-lounge" onClick={() => setOpenDropdown(null)}><p className="dropdown-item cursor-pointer">VIP Lounge</p></Link>
                <Link href="/events/observation-deck" onClick={() => setOpenDropdown(null)}><p className="dropdown-item cursor-pointer">Observation Deck</p></Link>
                <Link href="/events/school-visit" onClick={() => setOpenDropdown(null)}><p className="dropdown-item cursor-pointer">School Visit</p></Link>
            </Dropdown>
            </NavItem>

              <NavItem
                label="Community"
                isActive={pathname.includes("/community")}
                onClick={() => toggleDropdown("community")}
                >
            <Dropdown isOpen={openDropdown === "community"}>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Player Profile</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Reviews</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Forums</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Challenges</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Fan Art</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Dev Updates</p>
            </Dropdown>
            </NavItem>

          
          <NavItem
            label="Plan Your Visit"
            isActive={pathname.includes("/plan")}
            onClick={() => toggleDropdown("planYourVisit")}
            >
            <Dropdown isOpen={openDropdown === "planYourVisit"}>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>How Pixoul Works</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>What to Expect</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Safety &Comfort</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Pricing</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>FAQs</p>
            </Dropdown>
            </NavItem>


           

        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <CartIcon />          
            <BookNowButton className="hidden sm:block" /> 
            <img src="/logos/profile.png" alt="profile icon" className="h-8 w-8 sm:h-9 sm:w-9 border border-[#007EC6] rounded cursor-pointer" />
          
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-black dark:bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black dark:bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black dark:bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-[80px] left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-md transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col px-4 py-4 gap-2">
          <li>
            <Link href="/" onClick={closeMobileMenu}>
              <div className={`py-3 px-2 transition-colors border-b border-gray-700 ${pathname === "/" ? 'text-[#38C2D9]' : 'text-black dark:text-white hover:text-[#007EC6]'}`}>
                Home
              </div>
            </Link>
          </li>

          <li className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-black dark:text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("experiences"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/experience") ? 'text-[#38C2D9]' : ''}`}>
                Experiences
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/experience") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === "experiences" ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "experiences" && (
              <div className="pl-4 pb-2">
                <Link href="/experience/vr" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">VR Games</p>
                </Link>
                <Link href="/experience/pc" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">PC Games</p>
                </Link>
                <Link href="/experience/retro" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">Retro Games</p>
                </Link>
                <Link href="/experience/console" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">Console Games</p>
                </Link>
                <Link href="/experience/arcade" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">Arcade Games</p>
                </Link>
                <Link href="/experience/sport" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">Sport</p>
                </Link>
                <Link href="/experience/all" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6]">All Games</p>
                </Link>
              </div>
            )}
          </li>

          <li className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-black dark:text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("eventsGroups"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/events") ? 'text-[#38C2D9]' : ''}`}>
                Events & Groups
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/events") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === "eventsGroups" ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "eventsGroups" && (
              <div className="pl-4 pb-2">
                <Link href="/events/hall" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">The Hall</p>
                </Link>
                <Link href="/events/social-room" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Social Room</p>
                </Link>
                <Link href="/events/vip-lounge" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">VIP Lounge</p>
                </Link>
                <Link href="/events/observation-deck" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Observation Deck</p>
                </Link>
                <Link href="/events/school-visit" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">School Visit</p>
                </Link>
              </div>
            )}
          </li>

          <li className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-black dark:text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("community"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/community") ? 'text-[#38C2D9]' : ''}`}>
                Community
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/community") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === "community" ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "community" && (
              <div className="pl-4 pb-2">
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Player Profile</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Reviews</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Forums</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Challenges</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Fan Art</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Dev Updates</p>
              </div>
            )}
          </li>

          <li className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-black dark:text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("planYourVisit"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/plan") ? 'text-[#38C2D9]' : ''}`}>
                Plan Your Visit
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/plan") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === "planYourVisit" ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "planYourVisit" && (
              <div className="pl-4 pb-2">
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>How Pixoul Works</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>What to Expect</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Safety &Comfort</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Pricing</p>
                <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>FAQs</p>
              </div>
            )}
          </li>

          <li className="py-4">
            <BookNowButton className="w-full" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
