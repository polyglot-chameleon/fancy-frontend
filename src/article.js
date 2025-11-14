const content = document.querySelector("main");

const element = document.querySelector("aside");
const img = document.querySelector("aside > img");

document.addEventListener("mousemove", ({ clientX, clientY }) => {
  const { innerWidth, innerHeight } = window;

  const centerX = innerWidth / 4;
  const centerY = innerHeight / 2;

  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;

  const rotateX = (deltaY / centerY) * -3.75;
  const rotateY = (deltaX / centerX) * 7.5;

  element.style.transform = `perspective(25vw) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

export function makeArticle(article) {
  const articleDiv = document.createElement("article");

  articleDiv.innerHTML = `<h2>${article.title}</h2>${article.tags
    .map((tag) => `<span class="badge">#${tag}</span>`)
    .join(" ")}<time datetime="${article.datetime}">${new Date(
    article.datetime
  ).toUTCString()}</time>`;

  const summary = document.createElement("summary");
  summary.innerText = article.summary;
  articleDiv.append(summary);

  article.content.map((chunk) => {
    const p = document.createElement("p");
    p.innerText = chunk.text;
    articleDiv.append(p);
    p.onmouseover = () => (img.src = chunk.img);
  });

  content.append(articleDiv);

  articleDiv.onclick = () => {
    const isActive = document.querySelector("article#active");
    isActive && (isActive.id = "");
    articleDiv.id = "active";
    articleDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelector("aside > img").src = article.img_url;
  };

  articleDiv.ondblclick = () => {
    window.location.hash = article.slug;

    const isSelected = document.querySelector("article#selected");
    isSelected && (isSelected.id = "");

    const isActive = document.querySelector("article#active");
    isActive && (isActive.id = "");

    articleDiv.id = "selected";
  };
}
