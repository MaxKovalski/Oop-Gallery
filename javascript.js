class Gallery {
  images = [];
  imgElem;
  currentImage = -1;
  interval;
  transitionDuration = 500;

  constructor(elemId, ...imageUrls) {
    this.images = imageUrls;
    const galleryElem = document.getElementById(elemId);
    galleryElem.classList.add("gallery");
    const right = document.createElement("div");
    right.classList.add("arrow", "right");
    right.addEventListener("click", () => this.prevImage());
    galleryElem.appendChild(right);
    const left = document.createElement("div");
    left.classList.add("arrow", "left");
    left.addEventListener("click", () => this.nextImage());
    galleryElem.appendChild(left);
    this.imgElem = document.createElement("img");
    galleryElem.addEventListener("mouseover", () => {
      this.stopAuto();
    });
    galleryElem.addEventListener("mouseout", () => {
      const myEvent = new CustomEvent("startAllGallery");
      dispatchEvent(myEvent);
    });
    addEventListener("startAllGallery", () => this.startAuto());
    galleryElem.appendChild(this.imgElem);
    this.nextImage();
    this.startAuto();
  }

  nextImage() {
    const previousImage = this.currentImage;
    this.currentImage++;
    if (this.currentImage >= this.images.length) {
      this.currentImage = 0;
    }
    this.fadeOutImage(() => {
      this.imgElem.src = this.images[this.currentImage];
      this.fadeInImage();
    });
  }
  prevImage() {
    const previousImage = this.currentImage;
    this.currentImage--;
    if (this.currentImage < 0) {
      this.currentImage = this.images.length - 1;
    }
    this.fadeOutImage(() => {
      this.imgElem.src = this.images[this.currentImage];
      this.fadeInImage();
    });
  }
  fadeInImage() {
    this.imgElem.style.opacity = "1";
  }

  fadeOutImage(callback) {
    this.imgElem.style.opacity = "0";
    setTimeout(callback, this.transitionDuration);
  }
  startAuto() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.nextImage();
    }, 3 * 1000);
  }

  stopAuto() {
    clearInterval(this.interval);
  }
}
const Gallery1 = new Gallery(
  "gallery1",
  "./images/image1.jpg",
  "./images/image2.jpg",
  "./images/image3.jpg",
  "./images/image4.jpg",
  "./images/image5.jpg"
);

const Gallery2 = new Gallery(
  "gallery2",
  "./images/image1.jpg",
  "./images/image2.jpg",
  "./images/image3.jpg",
  "./images/image4.jpg",
  "./images/image5.jpg"
);
