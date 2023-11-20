import leftArrowIcon from "./img/arrow-left-thick.svg";
import rightArrowIcon from "./img/arrow-right-thick.svg";
import { buildImgHtml, wrapHtmlElements } from "./htmlBuilders";

const defaultRightBtnIcon = rightArrowIcon;
const defaultLeftBtnIcon = leftArrowIcon;

function buildNavDotHtml(clickFunc) {
  const navDotHtml = document.createElement("div");
  navDotHtml.addEventListener("click", clickFunc);
  navDotHtml.classList.add("nav-dot");
  return navDotHtml;
}

function buildNavDotsContainerHtml() {
  const navDotsContainerHtml = document.createElement("div");
  navDotsContainerHtml.classList.add("nav-dots-container");
  return navDotsContainerHtml;
}

export default function CarouselNav(
  leftBtnClickFunc,
  rightBtnClickFunc,
  leftBtnIcon = defaultLeftBtnIcon,
  rightBtnIcon = defaultRightBtnIcon,
) {
  const leftBtnHtml = buildImgHtml(leftBtnIcon);
  leftBtnHtml.classList.add("nav-btn");
  leftBtnHtml.addEventListener("click", leftBtnClickFunc);
  const rightBtnHtml = buildImgHtml(rightBtnIcon);
  rightBtnHtml.classList.add("nav-btn");
  rightBtnHtml.addEventListener("click", rightBtnClickFunc);
  const navDotsContainerHtml = buildNavDotsContainerHtml();
  const HTML = wrapHtmlElements(
    "nav",
    leftBtnHtml,
    navDotsContainerHtml,
    rightBtnHtml,
  );
  HTML.classList.add("carousel-nav");

  function createNavDot(clickFunc) {
    const newNavDotHtml = buildNavDotHtml(clickFunc);
    navDotsContainerHtml.appendChild(newNavDotHtml);
  }

  return {
    HTML,
    createNavDot,
  };
}
