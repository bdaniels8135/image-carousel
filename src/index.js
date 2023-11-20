import "./index.css";

import leafImg from "./img/leaf.jpg";
import flowerImg from "./img/purple-coneflower.jpg";
import ImageCarousel from "./ImageCarousel";

const testImagesList = [leafImg, flowerImg];

const imageCarousel = ImageCarousel(testImagesList);

const body = document.querySelector("body");
body.appendChild(imageCarousel);
