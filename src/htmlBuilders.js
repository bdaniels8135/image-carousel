export function buildImgHtml(imageFile) {
  const imgHtml = document.createElement("img");
  imgHtml.src = imageFile;
  return imgHtml;
}

export function wrapHtmlElements(wrapperTag, ...elements) {
  const wrapperHtml = document.createElement(wrapperTag);
  wrapperHtml.append(...elements);
  return wrapperHtml;
}
