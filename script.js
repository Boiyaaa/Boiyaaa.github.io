(() => {
  'use strict';

  const root = document.documentElement;
  const languageButton = document.querySelector('#language');
  const languageMenu = document.querySelector('#language-menu');
  const languageOptions = [...languageMenu.querySelectorAll('[data-language]')];
  const translations = document.querySelectorAll('[data-en][data-zh]');
  const navigationLinks = [...document.querySelectorAll('nav a')];
  let language = 'en';
  let refreshNavigation = () => {};

  // Storage can be unavailable when opening the page locally or in private mode.
  function readPreference(key) {
    try {
      return localStorage.getItem(`homepage-${key}`);
    } catch {
      return null;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(`homepage-${key}`, value);
    } catch {
      // The controls still work without persistent storage.
    }
  }

  function setLanguage(value) {
    language = value === 'zh' ? 'zh' : 'en';
    root.lang = language === 'zh' ? 'zh-CN' : 'en';

    translations.forEach((element) => {
      // These translations are trusted, locally authored HTML (em, strong, span).
      element.innerHTML = element.dataset[language];
    });

    languageOptions.forEach((option) => {
      option.setAttribute('aria-current', String(option.dataset.language === language));
    });
    languageButton.setAttribute('aria-label', language === 'en' ? 'Language: English' : '语言：中文');
    document.querySelector('nav').setAttribute('aria-label', language === 'en' ? 'Main navigation' : '主导航');
  }

  function setMenuOpen(open) {
    languageMenu.hidden = !open;
    languageButton.setAttribute('aria-expanded', String(open));
  }

  function initializeLanguageMenu() {
    languageButton.addEventListener('click', () => {
      const open = languageMenu.hidden;
      setMenuOpen(open);
      if (open) languageMenu.querySelector('[aria-current="true"]').focus();
    });

    languageOptions.forEach((option) => {
      option.addEventListener('click', () => {
        setLanguage(option.dataset.language);
        savePreference('language', language);
        setMenuOpen(false);
        languageButton.focus();
        refreshNavigation();
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.language')) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !languageMenu.hidden) {
        setMenuOpen(false);
        languageButton.focus();
      }
    });
  }

  function setActiveSection(id) {
    navigationLinks.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initializeNavigation() {
    const sections = navigationLinks
      .map((link) => document.querySelector(link.hash))
      .filter(Boolean);
    let pending = false;

    function update() {
      const marker = window.innerHeight * 0.3;
      let activeSection = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) activeSection = section;
      }
      // The contact footer is too short to reach the marker at the page bottom.
      if (root.scrollHeight > window.innerHeight &&
          window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
        activeSection = sections[sections.length - 1];
      }
      if (activeSection) setActiveSection(activeSection.id);
      pending = false;
    }

    function scheduleUpdate() {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    refreshNavigation = scheduleUpdate;
    update();
  }

  setLanguage(readPreference('language'));
  document.querySelector('#year').textContent = new Date().getFullYear();

  initializeLanguageMenu();
  initializeNavigation();
})();
