const images = [
  "images/banner1.jpg",
  "images/banner2.jpg",
  "images/banner3.jpg",
];

let currentIndex = 0;
let isSliding = false;

const bannerImage = document.getElementById("banner-image");

function slideImage(direction) {
  if (isSliding) {
    return;
  }

  isSliding = true;
  const exitPosition = direction === "next" ? "-100%" : "100%";
  const enterPosition = direction === "next" ? "100%" : "-100%";

  // Move the current image out of the banner.
  bannerImage.style.transform = `translateX(${exitPosition})`;

  setTimeout(function () {
    currentIndex =
      direction === "next"
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;

    // Put the next image just outside the opposite edge without animating it.
    bannerImage.style.transition = "none";
    bannerImage.src = images[currentIndex];
    bannerImage.style.transform = `translateX(${enterPosition})`;

    // Restore the CSS transition and slide the new image into view.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bannerImage.style.transition = "";
        bannerImage.style.transform = "translateX(0)";
      });
    });

    setTimeout(function () {
      isSliding = false;
    }, 350);
  }, 300);
}

function nextImage() {
  slideImage("next");
}

function previousImage() {
  slideImage("previous");
}
