let resourcesData = null;
async function loadResources() {
  const res = await fetch("data/resources.json");
  resourcesData = await res.json();
}
async function loadLanguage(lang) {
  const res = await fetch(`lang/${lang}.json`);
  return await res.json();
}
