// Image elements
const img_top_left = document.getElementById("img1");
const img_top_right = document.getElementById("img2");
const img_bottom_left = document.getElementById("img3");
const img_bottom_right = document.getElementById("img4");

function changeImage(newImage, imageElement) {
  imageElement.src = newImage;
}

changeImage(img_bottom_left, "public/assets/aipagebackground.png");
console.log("HELLO");