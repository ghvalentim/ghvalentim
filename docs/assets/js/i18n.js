export async function loadLanguage(lang) {
  try {
    // Adicione a barra (/) no início para forçar o caminho absoluto a partir da raiz
    const response = await fetch(`/config/languages/${lang}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
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