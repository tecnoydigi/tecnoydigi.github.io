let lang = localStorage.getItem("lang") || "en";
let translations = {};

document.addEventListener("DOMContentLoaded", async () => {
  translations = await loadLanguage(lang);
  applyTranslations();

  document.querySelectorAll("#language-switcher").forEach(sel => {
    sel.value = lang;
    sel.addEventListener("change", async e => {
      lang = e.target.value;
      localStorage.setItem("lang", lang);
      translations = await loadLanguage(lang);
      applyTranslations();
      loadPageData();
    });
  });

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
  await loadResources();
  if (document.getElementById("books-container")) showBooks();
}
function showBooks() {
  const container = document.getElementById("books-container");
  container.innerHTML = "";
  resourcesData.books.forEach(book => {
    const bookDiv = document.createElement("div");
    const title = book.title[lang] || book.title["en"];
    bookDiv.innerHTML = `<h2>${title}</h2>`;
    book.chapters.forEach(ch => {
      const chTitle = ch.title[lang] || ch.title["en"];
      bookDiv.innerHTML += `<div class="chapter"><a href="chapter.html?book=${book.id}&chapter=${ch.id}">${chTitle}</a></div>`;
    });
    container.appendChild(bookDiv);
  });
}
