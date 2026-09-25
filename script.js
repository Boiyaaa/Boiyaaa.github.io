(() => {
  'use strict';

  const languageButton = document.querySelector('#language');
  const themeButton = document.querySelector('#theme');
  const translations = document.querySelectorAll('[data-en][data-zh]');
  const navigationLinks = [...document.querySelectorAll('nav a')];
  let language = 'en';

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
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';

    translations.forEach((element) => {
      // These translations are trusted, locally authored HTML (em, strong, br).
      element.innerHTML = element.dataset[language];
    });

    languageButton.textContent = language === 'en' ? '中文' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    themeButton.setAttribute('aria-label', language === 'en' ? 'Switch color theme' : '切换深浅色主题');
    document.querySelector('nav').setAttribute('aria-label', language === 'en' ? 'Main navigation' : '主导航');
  }

  function setTheme(value) {
    const dark = value === 'dark';
    document.body.classList.toggle('dark', dark);
    themeButton.setAttribute('aria-pressed', String(dark));
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
    const sections = [...document.querySelectorAll('main section[id]')];
    let pending = false;

    function updateActiveSection() {
      const marker = window.innerHeight * 0.3;
      let activeSection = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) activeSection = section;
      }
      // The last section may be too short to reach the marker at the page bottom.
      const root = document.documentElement;
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
      window.requestAnimationFrame(updateActiveSection);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    languageButton.addEventListener('click', scheduleUpdate);
    updateActiveSection();
  }

  setLanguage(readPreference('language'));
  setTheme(readPreference('theme'));
  document.querySelector('#year').textContent = new Date().getFullYear();

  languageButton.addEventListener('click', () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
    savePreference('language', language);
  });

  themeButton.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextTheme);
    savePreference('theme', nextTheme);
  });

  initializeNavigation();
})();
