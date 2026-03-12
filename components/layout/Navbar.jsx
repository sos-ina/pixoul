"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "../ui/Dropdown";
import NavItem from "../ui/NavItem";
import Link from "next/link";
import BookNowButton from '../ui/BookNowButton';
import { useCart } from "@/components/cart/SessionCartProvider";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";
import { authAPI } from "@/lib/api/experiences";

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
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const timeoutRef = useRef(null);
  const profileMenuRef = useRef(null);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const refreshAuth = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const me = await authAPI.getCurrentUser();
      setIsLoggedIn(!!me?.user?.user_id);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    refreshAuth();

    const handler = () => refreshAuth();
    window.addEventListener("auth:changed", handler);
    return () => window.removeEventListener("auth:changed", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!profileMenuOpen) return;
      const el = profileMenuRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setProfileMenuOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    }

    localStorage.removeItem("auth_token");
    setProfileMenuOpen(false);
    window.dispatchEvent(new Event("auth:changed"));
    router.push("/");
  };

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
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md dark:bg-black/40 bg-white/40 border-b border-white/5 text-black dark:text-white"
    >
      

      <div className="max-w-screen-xl h-[80px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/logos/Pixoul Logo.ico" alt="Pixoul Logo" className="h-full w-auto" />
          </Link>
        </div>
        <div className="flex gap 2 px-2">
           <Link href="/virtual-tour">
          <img src="/logos/360 icon.png" alt="3D icon" className="h-8 w-8 sm:h-9 sm:w-9 border border-[#007EC6] rounded cursor-pointer" />
          </Link>
        </div>
       

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base items-center">
          <NavItem href="/" label="Home" isActive={pathname === "/"} />

          {/* Experiences */}
          <div onMouseEnter={() => handleMouseEnter("experiences")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Experiences" isActive={pathname.includes("/experience")}>
              <Dropdown isOpen={openDropdown === "experiences"}>
                <Link href="/experience/vr" onClick={() => setOpenDropdown(null)} className="dropdown-item block">VR Games</Link>
                <Link href="/experience/pc" onClick={() => setOpenDropdown(null)} className="dropdown-item block">PC Games</Link>
                <Link href="/experience/retro" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Retro Games</Link>
                <Link href="/experience/console" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Console Games</Link>
                <Link href="/experience/arcade" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Arcade Games</Link>
                <Link href="/experience/sport" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Sport</Link>
                <Link href="/experience/all" onClick={() => setOpenDropdown(null)} className="dropdown-item block border-t border-white/10 mt-1 pt-1">All Games</Link>
              </Dropdown>
            </NavItem>
          </div>

          <NavItem href="/birthday" label="Birthday" isActive={pathname === "/birthday"} />

          {/* Events & Groups */}
          <div onMouseEnter={() => handleMouseEnter("eventsGroups")} onMouseLeave={handleMouseLeave}>
            <NavItem label="Events & Groups" isActive={pathname.includes("/events")}>
              <Dropdown isOpen={openDropdown === "eventsGroups"}>
                <Link href="/events/hall" onClick={() => setOpenDropdown(null)} className="dropdown-item block">The Hall</Link>
                <Link href="/events/social-room" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Social Room</Link>
                <Link href="/events/vip-lounge" onClick={() => setOpenDropdown(null)} className="dropdown-item block">VIP Lounge</Link>
                <Link href="/events/observation-deck" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Observation Deck</Link>
                <Link href="/events/school-visit" onClick={() => setOpenDropdown(null)} className="dropdown-item block">School Visit</Link>
              </Dropdown>
            </NavItem>
          </div>

          {/* Community */}
          <div onMouseEnter={() => handleMouseEnter("community")} onMouseLeave={handleMouseLeave}>
            <NavItem
              label="Community"
              isActive={pathname.startsWith("/community")}
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
                <Link href="/plan-your-visit/how-it-works" onClick={() => setOpenDropdown(null)} className="dropdown-item block">How Pixoul Works</Link>
                <Link href="/plan-your-visit/pricing" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Pricing</Link>
                <Link href="/plan-your-visit/faqs" onClick={() => setOpenDropdown(null)} className="dropdown-item block">FAQs</Link>
                <Link href="/plan-your-visit/mission-vision" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Mission & Vision</Link>
                <Link href="/plan-your-visit/our-story" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Our Story</Link>
                <Link href="/plan-your-visit/reach" onClick={() => setOpenDropdown(null)} className="dropdown-item block">Contact Us</Link>
              </Dropdown>
            </NavItem>
          </div>
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 px-2">
          <CartIcon />
          {/*<BookNowButton className="hidden sm:block" />*/}
          <BookNowButton />

          {/* Dynamic Login/Profile Link */}
          {isLoggedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((p) => !p)}
                className="relative group"
                aria-label="Open profile menu"
              >
                <img
                  src="/logos/profile.png"
                  alt="profile icon"
                  className={`h-8 w-8 sm:h-9 sm:w-9 border rounded transition-all cursor-pointer shadow-md border-green-500 shadow-green-500/20`}
                />
              </button>

              {profileMenuOpen ? (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl overflow-hidden">
                  <Link
                    href="/community/player-profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/community/player-profile/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5"
                  >
                    Edit Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-pink-300 hover:bg-white/5"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href="/login">
              <div className="relative group">
                <img
                  src="/logos/profile.png"
                  alt="profile icon"
                  className="h-8 w-8 sm:h-9 sm:w-9 border rounded transition-all cursor-pointer shadow-md border-[#007EC6] hover:border-[#38C2D9] shadow-[#38C2D9]/20"
                />
              </div>
            </Link>
          )}

         

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
  <div className="flex gap-4 justify-end px-8 max-w-screen-xl mx-auto">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-[80px] left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-white/5 transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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
              onClick={() => toggleDropdown("experiences")}
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

           <li>
            <Link href="/birthday" onClick={closeMobileMenu}>
              <div className={`py-3 px-2 transition-colors border-b border-gray-700 ${pathname === "/birthday" ? 'text-[#38C2D9]' : 'text-black dark:text-white hover:text-[#007EC6]'}`}>
                Birthday
              </div>
            </Link>
          </li>

          <li className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-black dark:text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => toggleDropdown("eventsGroups")}
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
              onClick={() => toggleDropdown("community")}
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
                <Link href="/community/player-profile" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Player Profile</p>
                </Link>
                <Link href="/community/reviews" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Reviews</p>
                </Link>
                <Link href="/community/forums" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Forums</p>
                </Link>
                <Link href="/community/challenges" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Challenges</p>
                </Link>
              </div>
            )}
          </li>

          <li className="border-b border-gray-700">
            <button
              className="w-full text-left py-3 px-2 text-black dark:text-white hover:text-[#007EC6] transition-colors flex justify-between items-center"
              onClick={() => toggleDropdown("planYourVisit")}
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
                <Link href="/plan-your-visit/how-it-works" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">How Pixoul Works</p>
                </Link>
                <Link href="/plan-your-visit/pricing" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">Pricing</p>
                </Link>
                <Link href="/plan-your-visit/faqs" onClick={closeMobileMenu}>
                  <p className="py-2 text-gray-600 dark:text-gray-300 hover:text-[#007EC6] cursor-pointer">FAQs</p>
                </Link>
              </div>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}
