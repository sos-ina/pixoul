"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/Dropdown";
import NavItem from "../ui/NavItem";
import Link from "next/link";
import BookNowButton from '../ui/BookNowButton';




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
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-cover bg-center"
      
    >
      <div className="max-w-7xl h-[80px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logos/Pixoul Logo.ico"
            alt="Pixoul Logo"
            className="h-[300px] w-auto"
          />
        </div>


        {/* Navigation Links */}

        <ul className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base">

          <Link href="/">
            <NavItem
                label="Home"
                isActive={pathname === "/"}
                onClick={() => setOpenDropdown(null)}
            />
            </Link>


            <NavItem
                label="Experiences"
                isActive={pathname.includes("/games")}
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
                label="Events & Groups"
                isActive={pathname.includes("/events")}
                onClick={() => toggleDropdown("eventsGroups")}
                >
            <Dropdown isOpen={openDropdown === "eventsGroups"}>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>The Hall</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Birthday Parties</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Corporate Events</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Private Parties</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>School Trips</p>
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
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Virtual Tour</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>What to Expect</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Safety &Comfort</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>Pricing</p>
                <p className="dropdown-item cursor-pointer" onClick={() => setOpenDropdown(null)}>FAQs</p>
            </Dropdown>
            </NavItem>


           

        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
            <BookNowButton className="hidden sm:block" /> 
            <img src="/logos/profile.png" alt="profile icon" className="h-8 w-8 sm:h-9 sm:w-9 border border-[#007EC6] rounded" />
          
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-[80px] left-0 w-full bg-black/95 backdrop-blur-md transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col px-4 py-4 gap-2">
          
          <Link href="/" onClick={closeMobileMenu}>
            <div className={`py-3 px-2 transition-colors border-b border-gray-700 ${pathname === "/" ? 'text-[#38C2D9]' : 'text-white hover:text-[#007EC6]'}`}>
              Home
            </div>
          </Link>

          <div className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("experiences"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/games") ? 'text-[#38C2D9]' : ''}`}>
                Experiences
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/games") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <span className={`transition-transform ${openDropdown === "experiences" ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openDropdown === "experiences" && (
              <div className="pl-4 pb-2">
                <Link href="/games/vr" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-300 hover:text-[#007EC6]">VR Games</p>
                </Link>
                <Link href="/games/pc" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-300 hover:text-[#007EC6]">PC Games</p>
                </Link>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Retro Games</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Console Games</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Arcade Games</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>All</p>
              </div>
            )}
          </div>

          <div className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("eventsGroups"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/events") ? 'text-[#38C2D9]' : ''}`}>
                Events & Groups
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/events") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <span className={`transition-transform ${openDropdown === "eventsGroups" ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openDropdown === "eventsGroups" && (
              <div className="pl-4 pb-2">
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>The Hall</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Birthday Parties</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Corporate Events</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Private Parties</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>School Trips</p>
              </div>
            )}
          </div>

          <div className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => { toggleDropdown("planYourVisit"); }}
            >
              <span className={`inline-block relative ${pathname.includes("/plan") ? 'text-[#38C2D9]' : ''}`}>
                Plan Your Visit
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#38C2D9] transition-all ${pathname.includes("/plan") ? 'w-full' : 'w-0'}`}></span>
              </span>
              <span className={`transition-transform ${openDropdown === "planYourVisit" ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openDropdown === "planYourVisit" && (
              <div className="pl-4 pb-2">
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>How Pixoul Works</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Virtual Tour</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>What to Expect</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Safety & Comfort</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>Pricing</p>
                <p className="py-2 text-gray-300 hover:text-[#007EC6] cursor-pointer" onClick={closeMobileMenu}>FAQs</p>
              </div>
            )}
          </div>

          <div className="py-3 px-2 text-white hover:text-[#007EC6] transition-colors border-b border-gray-700 cursor-pointer" onClick={closeMobileMenu}>
            About
          </div>

          <div className="py-3 px-2 text-white hover:text-[#007EC6] transition-colors border-b border-gray-700 cursor-pointer" onClick={closeMobileMenu}>
            Contact
          </div>

          <div className="py-4">
            <BookNowButton className="w-full" />
          </div>

        </ul>
      </div>
    </nav>
  );
}
