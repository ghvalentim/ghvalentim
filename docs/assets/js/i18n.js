export async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const data = await response.json();
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const keys = key.split('.');
      let value = data;
      
      keys.forEach(k => value = value[k]);
      
      if (value) {
        element.textContent = value;
      }
    });
    
    localStorage.setItem('lang', lang);
  } catch (err) {
    console.error('Error loading language', err);
  }
}