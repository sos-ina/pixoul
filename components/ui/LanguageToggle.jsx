"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const pathSegments = (pathname || '/').split('/').filter(Boolean);
  const currentLocale = pathSegments[0] === 'ar' || pathSegments[0] === 'en'
    ? pathSegments[0]
    : 'en';

  function toggleLanguage() {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    
    startTransition(() => {
      const hasLocalePrefix = pathSegments[0] === 'ar' || pathSegments[0] === 'en';
      const restPath = hasLocalePrefix ? `/${pathSegments.slice(1).join('/')}` : pathname;
      const normalizedRestPath = restPath === '/' ? '' : restPath;
      const newPath = `/${newLocale}${normalizedRestPath}`;
      router.replace(newPath);
    });
  }

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="
        border border-gray-300 dark:border-gray-700
        px-3 py-2
        text-sm
        hover:border-[#38C2D9]
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
      aria-label={`Switch to ${currentLocale === 'en' ? 'Arabic' : 'English'}`}
    >
      {currentLocale === 'en' ? 'العربية' : 'English'}
    </button>
  );
}