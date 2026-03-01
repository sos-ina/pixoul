"use client";

import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const readGoogleLang = () => {
      const match = document.cookie
        .split('; ')
        .find((entry) => entry.startsWith('googtrans='));

      if (!match) return 'en';

      const value = decodeURIComponent(match.split('=')[1] || '');
      return value.toLowerCase().endsWith('/ar') ? 'ar' : 'en';
    };

    const hideGoogleBanner = () => {
      const selectors = [
        '.goog-te-banner-frame',
        'iframe.goog-te-banner-frame',
        '.skiptranslate.goog-te-banner-frame',
        '.VIpgJd-ZVi9od-ORHb-OEVmcd',
        '.VIpgJd-ZVi9od-ORHb',
        'iframe[src*="translate.google.com"]',
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((node) => {
          node.style.display = 'none';
          node.style.visibility = 'hidden';
          node.setAttribute('aria-hidden', 'true');
        });
      });

      if (document.body) {
        document.body.style.top = '0px';
      }
      if (document.documentElement) {
        document.documentElement.style.top = '0px';
      }
    };

    const currentLang = readGoogleLang();
    setLang(currentLang);
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    const initTranslate = () => {
      if (!window.google?.translate?.TranslateElement) return;

      const mountNode = document.getElementById('google_translate_element');
      if (!mountNode || mountNode.childElementCount > 0) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'ar,en',
          autoDisplay: false,
        },
        'google_translate_element'
      );

      hideGoogleBanner();
    };

    window.googleTranslateElementInit = initTranslate;

    const existingScript = document.getElementById('google-translate-script');
    if (existingScript) {
      initTranslate();
    } else {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Hide Google's branding
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-banner-frame { display: none !important; }
      .goog-te-banner-frame.skiptranslate { display: none !important; }
      iframe.goog-te-banner-frame { display: none !important; }
      .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; visibility: hidden !important; }
      .VIpgJd-ZVi9od-ORHb { display: none !important; visibility: hidden !important; }
      .goog-te-combo { display: none !important; }
      body, html { top: 0 !important; }
    `;
    document.head.appendChild(style);

    hideGoogleBanner();
    const observer = new MutationObserver(hideGoogleBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      delete window.googleTranslateElementInit;
      observer.disconnect();
    };
  }, []);

  const switchLanguage = () => {
    if (!mounted) return;

    const newLang = lang === 'en' ? 'ar' : 'en';
    const googTransValue = newLang === 'ar' ? '/en/ar' : '/en/en';

    const cookieValue = `googtrans=${encodeURIComponent(googTransValue)};path=/`;
    document.cookie = cookieValue;
    document.cookie = `${cookieValue};domain=${window.location.hostname}`;

    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    window.location.reload();
  };

  if (!mounted) {
    return <div className="w-14 h-9 shrink-0" aria-hidden="true" />;
  }

  return (
    <>
      <div
        id="google_translate_element"
        style={{ position: 'absolute', left: '-9999px', top: '0' }}
      ></div>
      
      <button
        onClick={switchLanguage}
        translate="no"
        className="notranslate border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-black/60 px-2.5 py-1.5 text-xs font-medium hover:border-[#38C2D9] hover:text-[#38C2D9] transition-all rounded shrink-0"
        aria-label={lang === 'en' ? 'Switch language to Arabic' : 'Switch language to English'}
      >
        <span className="notranslate" translate="no">
          {lang === 'en' ? 'العربية' : 'English'}
        </span>
      </button>
    </>
  );
}