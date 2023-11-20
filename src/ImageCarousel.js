import { buildImgHtml, wrapHtmlElements } from "./htmlBuilders";
import CarouselNav from "./CarouselNav";

function buildCarouselImgsContainerHtml() {
  const carouselImgsContainerHtml = document.createElement("div");
  carouselImgsContainerHtml.classList.add("carousel-imgs-container");
  return carouselImgsContainerHtml;
}

function buildCarouselDisplayBoxHtml() {
  const carouselDisplayBoxHtml = document.createElement("div");
  carouselDisplayBoxHtml.classList.add("carousel-display-box");
  return carouselDisplayBoxHtml;
}

export default function ImageCarousel(imageFilesList) {
  const carouselDisplayBoxHtml = buildCarouselDisplayBoxHtml();
  const carouselImgsContainerHtml = buildCarouselImgsContainerHtml();
  const carouselNav = CarouselNav();
  const HTML = wrapHtmlElements(
    "div",
    carouselDisplayBoxHtml,
    carouselImgsContainerHtml,
    carouselNav.HTML,
  );
  HTML.classList.add("image-carousel");

  function addImage(imageFile) {
    const imgHtml = buildImgHtml(imageFile);
    imgHtml.classList.add("carousel-img");
    carouselImgsContainerHtml.appendChild(imgHtml);
  }

  function displayNthImage(n) {
    return function () {
      console.log(`Display image number ${n}...`);
    };
  }

  imageFilesList.forEach((imageFile, index) => {
    addImage(imageFile);
    carouselNav.createNavDot(displayNthImage(index));
  });

  return {
    HTML,
  };
}
