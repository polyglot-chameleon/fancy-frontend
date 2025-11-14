import { makeArticle } from "./article.js";
import "./style.css";
import "../public/custom-skinmc.png";

let articles = [];

const masonry = document.querySelector("div.masonry");

window.onload = async () => {
  articles = await (await fetch("/articles")).json();
  articles.forEach((article, i) => {
    makeArticle(article);

    const img = document.createElement("img");
    img.src = article.img_url;
    img.loading = "lazy";
    masonry.append(img);
  });
};

const next = document.querySelector("svg#next");
const prev = document.querySelector("svg#prev");

next.onclick = () => scrollLeft();
prev.onclick = () => scrollRight();

function scrollRight() {
  return window.scrollBy({
    left: -window.innerWidth,
    behavior: "smooth",
  });
}

function scrollLeft() {
  return window.scrollBy({
    left: window.innerWidth,
    behavior: "smooth",
  });
}
