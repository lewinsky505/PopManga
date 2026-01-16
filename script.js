// قاعدة بيانات المانجا والفصول مع روابط GitHub وهمية
const mangaData = [
  {
    title: "Manga 1",
    cover: "https://raw.githubusercontent.com/username/PopManga/main/images/manga1.jpg",
    chapters: [
      {
        name: "Chapter 1",
        pdf: "https://raw.githubusercontent.com/username/PopManga/main/pdfs/manga1-ch1.pdf",
        pages: [
          "https://raw.githubusercontent.com/username/PopManga/main/images/ch1-1.jpg",
          "https://raw.githubusercontent.com/username/PopManga/main/images/ch1-2.jpg"
        ]
      },
      {
        name: "Chapter 2",
        pdf: "https://raw.githubusercontent.com/username/PopManga/main/pdfs/manga1-ch2.pdf",
        pages: [
          "https://raw.githubusercontent.com/username/PopManga/main/images/ch2-1.jpg",
          "https://raw.githubusercontent.com/username/PopManga/main/images/ch2-2.jpg"
        ]
      }
    ]
  },
  {
    title: "Manga 2",
    cover: "https://raw.githubusercontent.com/username/PopManga/main/images/manga2.jpg",
    chapters: [
      {
        name: "Chapter 1",
        pdf: "https://raw.githubusercontent.com/username/PopManga/main/pdfs/manga2-ch1.pdf",
        pages: [
          "https://raw.githubusercontent.com/username/PopManga/main/images/ch1-1.jpg"
        ]
      }
    ]
  }
];

const mangaList = document.getElementById("manga-list");
const contentDiv = document.getElementById("content");

// توليد قائمة المانجا
function generateMangaList(filter = "") {
  mangaList.innerHTML = "";
  mangaData
    .filter(m => m.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((manga, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${manga.cover}" alt="${manga.title}">
        <h3>${manga.title}</h3>
        <button onclick="openManga(${index})">Open</button>
      `;
      mangaList.appendChild(card);
    });
}

generateMangaList();

// البحث
const searchInput = document.getElementById("search-input");
const clearSearch = document.getElementById("clear-search");

searchInput.addEventListener("input", () => {
  const value = searchInput.value;
  generateMangaList(value);
  clearSearch.style.display = value ? "inline" : "none";
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  generateMangaList();
  clearSearch.style.display = "none";
});

// فتح صفحة تفاصيل المانجا
function openManga(index) {
  const manga = mangaData[index];
  contentDiv.innerHTML = `
    <section>
      <h2>${manga.title} - Chapters</h2>
      <div class="list-container">
        ${manga.chapters.map((ch, i) => `
          <div class="card">
            <h3>${ch.name}</h3>
            <button onclick="openChapter(${index}, ${i})">Read Chapter</button>
            <button onclick="openPDF('${ch.pdf}')">Open PDF</button>
          </div>
        `).join('')}
      </div>
      <button class="back-button" onclick="goBack()">Back</button>
    </section>
  `;
}

// فتح الفصل بالصور
function openChapter(mangaIndex, chapterIndex) {
  const chapter = mangaData[mangaIndex].chapters[chapterIndex];
  contentDiv.innerHTML = `
    <section>
      <h2>${chapter.name}</h2>
      <div class="list-container">
        ${chapter.pages.map(p => `<img src="${p}" alt="Page">`).join('')}
      </div>
      <button class="back-button" onclick="openManga(${mangaIndex})">Back to Chapters</button>
    </section>
  `;
}

// العودة للصفحة الرئيسية
function goBack() {
  contentDiv.innerHTML = `
    <section>
      <h2>Popular Manga</h2>
      <div class="list-container" id="manga-list"></div>
    </section>
  `;
  generateMangaList();
}

// فتح PDF
function openPDF(pdfPath) {
  window.open(pdfPath, "_blank");
}

