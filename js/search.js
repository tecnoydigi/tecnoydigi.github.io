document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("search-input");
  const topicsDiv = document.getElementById("topics-filter");
  const resultsDiv = document.getElementById("search-results");

  await loadResources();

  resourcesData.topics.forEach(topic => {
    const cb = document.createElement("div");
    cb.className = "topic-filter";
    cb.innerHTML = `
      <label>
        <input type="checkbox" value="${topic.id}" class="topic-checkbox" />
        ${topic.name[lang] || topic.name["en"]}
      </label>
    `;
    topicsDiv.appendChild(cb);
  });

  const getCheckedTopics = () =>
    Array.from(document.querySelectorAll(".topic-checkbox"))
         .filter(cb => cb.checked)
         .map(cb => cb.value);

  const searchAndFilter = () => {
    resultsDiv.innerHTML = "";
    const term = input.value.toLowerCase();
    const checkedTopics = getCheckedTopics();

    resourcesData.books.forEach(book => {
      book.chapters.forEach(chapter => {
        chapter.resources.forEach(res => {
          const title = res.title[lang] || res.title["en"];
          const matchTerm = title.toLowerCase().includes(term);
          const matchTopic =
            checkedTopics.length === 0 ||
            res.topics.some(t => checkedTopics.includes(t));

          if (matchTerm && matchTopic) {
            const div = document.createElement("div");
            div.className = "result";
            div.innerHTML = `<h3>${title}</h3>`;
            if (res.type === "pdf")
              div.innerHTML += `<a href="${res.url}" target="_blank">📄 Open PDF</a>`;
            resultsDiv.appendChild(div);
          }
        });
      });
    });
  };

  input.addEventListener("input", searchAndFilter);
  document.querySelectorAll(".topic-checkbox").forEach(cb => cb.addEventListener("change", searchAndFilter));
});
