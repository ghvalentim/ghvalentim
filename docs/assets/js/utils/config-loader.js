// Exemplo de como injetar os dados de SEO
export async function initMeta() {
  const response = await fetch('config/site.json');
  const site = await response.json();
  
  document.title = site.title;
  document.querySelector('meta[name="description"]').setAttribute("content", site.description);
}