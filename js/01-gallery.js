import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `
          <div class="gallery__item">
          <a class="gallery__link" href="${original}">
          <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
          </a>
          </div>
          `
    )
    .join("");
}

function onGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}">`
  );

  instance.show();
  closeModalOnEscapeClick(instance);
}

function closeModalOnEscapeClick(instance) {
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      instance.close();
    }
  });
}

gallery.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));
gallery.addEventListener("click", onGalleryClick);
