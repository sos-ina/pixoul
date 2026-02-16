"use client";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/Dropdown";
import NavItem from "../ui/NavItem";
import Link from "next/link";
import BookNowButton from '../ui/BookNowButton';

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ref to handle the "hover out" delay
  const timeoutRef = useRef(null);

  const handleMouseEnter = (dropdownName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); 
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5">
      <div className="max-w-7xl h-[80px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/logos/Pixoul Logo.ico" alt="Pixoul Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base items-center">
          <Link href="/">
            <NavItem label="Home" isActive={pathname === "/"} />
          </Link>

          {/* Experiences */}
          <div onMouseEnter={() => handleMouseEnter("experiences")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Experiences" isActive={pathname.includes("/experience")}>
              <Dropdown isOpen={openDropdown === "experiences"}>
                <Link href="/experience/vr" onClick={() => setOpenDropdown(null)} className="dropdown-item block">VR Games</Link>
                <Link href="/experience/pc" onClick={() => setOpenDropdown(null)} className="dropdown-item block">PC Games</Link>
                <Link href="/experience/retro" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Retro Games</Link>
                <Link href="/experience/console" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Console Games</Link>
                <Link href="/experience/arcade" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Arcade Games</Link>
                <Link href="/experience/all" onClick={() => setOpenDropdown(null)} className="dropdown-item block border-t border-white/10 mt-1 pt-1">All Games</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* Events & Groups */}
          <div onMouseEnter={() => handleMouseEnter("eventsGroups")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Events & Groups" isActive={pathname.includes("/events")}>
              <Dropdown isOpen={openDropdown === "eventsGroups"}>
                <Link href="/events/hall" className="dropdown-item block">The Hall</Link>
                <Link href="/events/birthdays" className="dropdown-item block">Birthday Parties</Link>
                <Link href="/events/corporate" className="dropdown-item block">Corporate Events</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* Community */}
      <div onMouseEnter={() => handleMouseEnter("community")} onMouseLeave={handleMouseLeave}>
        {/* Change isActive to only be true if we are NOT in the dropdown (or use a stricter check) */}
        <NavItem 
          label="Community" 
          isActive={pathname === "/community/player-profile"} 
        >
          <Dropdown isOpen={openDropdown === "community"}>
            <Link href="/community/player-profile" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Player Profile</Link>
              <Link href="/community/reviews" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Reviews</Link>
              <Link href="/community/forums" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Forums</Link>
              <Link href="/community/challenges" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Challenges</Link>
          </Dropdown>
        </NavItem>
      </div>

          {/* Plan Your Visit */}
          <div onMouseEnter={() => handleMouseEnter("planYourVisit")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Plan Your Visit" isActive={pathname.includes("/plan")}>
              <Dropdown isOpen={openDropdown === "planYourVisit"}>
                <Link href="/plan-your-visit/how-it-works"onClick={() => setOpenDropdown(null)} className="dropdown-item block">How Pixoul Works</Link>
                <Link href="/plan-your-visit/pricing" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Pricing</Link>
                <Link href="/plan-your-visit/faqs" onClick={() => setOpenDropdown(null)} className="dropdown-item block">FAQs</Link>
              </Dropdown>
            </NavItem>
          </div>
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <BookNowButton className="hidden sm:block" />
          
          {/* Dynamic Login/Profile Link */}
          <Link href={isLoggedIn ? "/community/player-profile" : "/login"}>
            <div className="relative group">
              <img 
                src="/logos/profile.png" 
                alt="profile icon" 
                className={`h-8 w-8 sm:h-9 sm:w-9 border rounded transition-all cursor-pointer shadow-md ${isLoggedIn ? 'border-green-500 shadow-green-500/20' : 'border-[#007EC6] hover:border-[#38C2D9] shadow-[#38C2D9]/20'}`} 
              />
            </div>
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-[80px] left-0 w-full bg-black/95 border-t border-white/5 transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col px-6 py-6 gap-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-bold">Home</Link>
            <Link href="/community/player-profile" onClick={() => setMobileMenuOpen(false)} className="text-[#38C2D9] text-lg font-bold italic">Player Profile</Link>
            {/* Add more mobile links as needed */}
        </ul>
      </div>
    </nav>
  );
}