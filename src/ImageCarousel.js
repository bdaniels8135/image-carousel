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
  carouselDisplayBoxHtml.appendChild(carouselImgsContainerHtml);

  const numOfImages = imageFilesList.length;
  let displayedIndex = 0;

  function setTransformStyle() {
    carouselImgsContainerHtml.style.transform = `translate(calc(-100% / ${numOfImages} * ${displayedIndex}))`;
  }

  let intervalId;

  function createDisplayNthImageFunc(n) {
    return () => {
      displayedIndex = n;
      setTransformStyle();
      markNthDotAsDisplayed(displayedIndex);
      clearInterval(intervalId);
      intervalId = setInterval(displayNextImage, 5000);
    };
  }

  function displayNextImage() {
    displayedIndex = (displayedIndex + 1) % numOfImages;
    setTransformStyle();
    markNthDotAsDisplayed(displayedIndex);
    clearInterval(intervalId);
    intervalId = setInterval(displayNextImage, 5000);
  }

  function displayPreviousImage() {
    displayedIndex = (displayedIndex + numOfImages - 1) % numOfImages;
    setTransformStyle();
    markNthDotAsDisplayed(displayedIndex);
    clearInterval(intervalId);
    intervalId = setInterval(displayNextImage, 5000);
  }

  const carouselNav = CarouselNav(displayPreviousImage, displayNextImage);

  const HTML = wrapHtmlElements(
    "div",
    carouselDisplayBoxHtml,
    carouselNav.HTML,
  );
  HTML.classList.add("image-carousel");

  function markNthDotAsDisplayed(n) {
    const navDots = HTML.querySelectorAll(".nav-dot");
    navDots.forEach((navDot) => {
      navDot.classList.remove("displayed");
    });
    navDots[n].classList.add("displayed");
  }

  function addImage(imageFile) {
    const imgHtml = buildImgHtml(imageFile);
    imgHtml.classList.add("carousel-img");
    const wrappedImgHtml = wrapHtmlElements("div", imgHtml);
    wrappedImgHtml.classList.add("carousel-img-container");
    carouselImgsContainerHtml.appendChild(wrappedImgHtml);
  }

  imageFilesList.forEach((imageFile, index) => {
    addImage(imageFile);
    carouselNav.createNavDot(createDisplayNthImageFunc(index));
  });

  markNthDotAsDisplayed(0);

  intervalId = setInterval(displayNextImage, 5000);

  return {
    HTML,
    displayNextImage,
  };
}
