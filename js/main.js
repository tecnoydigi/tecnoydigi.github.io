let lang = localStorage.getItem("lang") || "en";
let translations = {};

document.addEventListener("DOMContentLoaded", async () => {
  // load translations
  translations = await loadLanguage(lang);
  applyTranslations();

  const selector = document.getElementById("language-switcher");
  if (selector) {
    selector.value = lang;
    selector.addEventListener("change", async (e) => {
      lang = e.target.value;
      localStorage.setItem("lang", lang);
      translations = await loadLanguage(lang);
      applyTranslations();
    });
  }
});

async function loadLanguage(lng) {
  try {
    const res = await fetch(`lang/${lng}.json`);
    return await res.json();
  } catch (err) {
    console.error("Error loading language:", err);
    return {};
  }
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}


