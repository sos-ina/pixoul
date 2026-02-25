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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5">
      <div className="max-w-7xl h-[80px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/logos/Pixoul Logo.ico" alt="Pixoul Logo" className="w-auto h-10" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="items-center hidden gap-6 text-sm lg:flex xl:gap-8 xl:text-base">
          <Link href="/">
            <NavItem label="Home" isActive={pathname === "/"} />
          </Link>

          {/* Experiences */}
          <div onMouseEnter={() => handleMouseEnter("experiences")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Experiences" isActive={pathname.includes("/experience")}>
              <Dropdown isOpen={openDropdown === "experiences"}>
                <Link href="/experience/vr" onClick={() => setOpenDropdown(null)} className="block dropdown-item">VR Games</Link>
                <Link href="/experience/pc" onClick={() => setOpenDropdown(null)} className="block dropdown-item">PC Games</Link>
                <Link href="/experience/retro" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Retro Games</Link>
                <Link href="/experience/console" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Console Games</Link>
                <Link href="/experience/arcade" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Arcade Games</Link>
                <Link href="/experience/all" onClick={() => setOpenDropdown(null)} className="block pt-1 mt-1 border-t dropdown-item border-white/10">All Games</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* Events & Groups */}
          <div onMouseEnter={() => handleMouseEnter("eventsGroups")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Events & Groups" isActive={pathname.includes("/events")}>
              <Dropdown isOpen={openDropdown === "eventsGroups"}>
                <Link href="/events/hall" className="block dropdown-item">The Hall</Link>
                <Link href="/events/birthdays" className="block dropdown-item">Birthday Parties</Link>
                <Link href="/events/corporate" className="block dropdown-item">Corporate Events</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* Community */}
          <div onMouseEnter={() => handleMouseEnter("community")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Community" isActive={pathname.includes("/community")}>
              <Dropdown isOpen={openDropdown === "community"}>
                <Link href="/community/player-profile" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Player Profile</Link>
                <Link href="/community/reviews" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Reviews</Link>
                <Link href="/community/forums" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Forums</Link>
                <Link href="/community/challenges" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Challenges</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* Plan Your Visit */}
          <div onMouseEnter={() => handleMouseEnter("planYourVisit")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Plan Your Visit" isActive={pathname.includes("/plan")}>
              <Dropdown isOpen={openDropdown === "planYourVisit"}>
                <Link href="/plan-your-visit/how-it-works" onClick={() => setOpenDropdown(null)} className="block dropdown-item">How Pixoul Works</Link>
                <Link href="/plan-your-visit/faqs" onClick={() => setOpenDropdown(null)} className="block dropdown-item">FAQs</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* About Pixoul (Now after Plan Your Visit) */}
          <div onMouseEnter={() => handleMouseEnter("aboutPixoul")} onMouseLeave={handleMouseLeave}>
            <NavItem label="About Pixoul" isActive={pathname.includes("/about")}>
              <Dropdown isOpen={openDropdown === "aboutPixoul"}>
                <Link href="/about/our-story" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Our Story</Link>
                <Link href="/about/mission-vision" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Mission & Vision</Link>
                <Link href="/about/reach" onClick={() => setOpenDropdown(null)} className="block dropdown-item">Reach</Link>
              </Dropdown>
            </NavItem>
          </div>
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <BookNowButton className="hidden sm:block" />
          
          <Link href={isLoggedIn ? "/community/player-profile" : "/login"}>
            <div className="relative group">
              <img 
                src="/logos/profile.png" 
                alt="profile icon" 
                className={`h-8 w-8 sm:h-9 sm:w-9 border rounded transition-all cursor-pointer shadow-md ${isLoggedIn ? 'border-green-500 shadow-green-500/20' : 'border-[#007EC6] hover:border-[#38C2D9] shadow-[#38C2D9]/20'}`} 
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}