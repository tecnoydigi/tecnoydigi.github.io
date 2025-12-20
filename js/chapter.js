document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("book");
  const chapterId = params.get("chapter");

  await loadResources();
  const book = resourcesData.books.find(b => b.id === bookId);
  if (!book) return;
  const chapter = book.chapters.find(c => c.id === chapterId);
  if (!chapter) return;

  document.getElementById("chapter-title").textContent = chapter.title[lang] || chapter.title["en"];
  const container = document.getElementById("resources-container");
  container.innerHTML = "";

  if (!chapter.resources || chapter.resources.length === 0) {
    container.innerHTML = `<p>${translations.noResources}</p>`;
    return;
  }

  chapter.resources.forEach(resource => {
    const title = resource.title[lang] || resource.title["en"];
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `<h3>${title}</h3>`;
    if (resource.type === "pdf")
      div.innerHTML += `<a href="${resource.url}" target="_blank">📄 ${title}</a>`;
    container.appendChild(div);
  });
});
