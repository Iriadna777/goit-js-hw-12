import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let lightbox;

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  if (gallery) {
  gallery.innerHTML = '';
 }
 if (lightbox) {
  lightbox.destroy();
  lightbox = null;
}
}

export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  if (gallery) {
    const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const imgElement = document.createElement('a');
    imgElement.href = image.largeImageURL;
    imgElement.innerHTML = `<img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}"/>
    <div class="image-stats">
    <p>Likes: ${image.likes}</p>
    <p>Views: ${image.views}</p>
    <p>Comments: ${image.comments}</p>
    <p>Downloads: ${image.downloads}</p>
  </div>`;
    fragment.appendChild(imgElement);
  });
  gallery.appendChild(fragment);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
 }
}

export function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'block';
 }
}

export function hideLoader() {
 const loader = document.getElementById('loader')
 if (loader) {
  loader.style.display = 'none';
 }
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight'
  });
}

export function toggleLoadMoreButton(show) {
  const loadMoreContainer = document.getElementById('load-more-container');
  if (loadMoreContainer) {
    loadMoreContainer.style.display = show ? 'block' : 'none';
  }
}

export function showEndOfResults() {
  clearEndOfResultsMessage();
  const endMessage = document.createElement('p');
  endMessage.textContent = "We're sorry, but you've reached the end of search results.";
  endMessage.id = 'end-of-results-message';
  document.body.appendChild(endMessage);
}

export function clearEndOfResultsMessage() {
  const endMessage = document.getElementById('end-of-results-message');
  if (endMessage) {
    endMessage.remove();
  }
}