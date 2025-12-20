let lang = localStorage.getItem("lang") || "en";
let translations = {};

document.addEventListener("DOMContentLoaded", async () => {
  // Cargar traducciones
  translations = await loadLanguage(lang);
  applyTranslations();

  // Selector de idioma
  document.querySelectorAll("#language-switcher").forEach(sel => {
    sel.value = lang;
    sel.addEventListener("change", async e => {
      lang = e.target.value;
      localStorage.setItem("lang", lang);
      translations = await loadLanguage(lang);
      applyTranslations();
      loadPageData(); // solo si hay contenido dinámico
    });
  });

  // Cargar datos dinámicos si corresponde
  loadPageData();
});

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

async function loadPageData() {
  if (typeof loadResources === "function") {
    await loadResources();
  }

  // Puedes detectar contenedores para cargar datos dinámicos:
  if (document.getElementById("books-container") && typeof showBooks === "function") {
    showBooks();
  }

  if (document.getElementById("topics-container") && typeof showTopics === "function") {
    showTopics();
  }

  if (document.getElementById("resources-container") && typeof showChapterResources === "function") {
    showChapterResources();
  }
}
