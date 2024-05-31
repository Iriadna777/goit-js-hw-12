import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages, showLoader, hideLoader, showError } from './js/render-functions.js';

const form = document.getElementById('search-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (!query) {
    showError('Please enter a search term');
    return;
  }
  
  clearGallery();
  showLoader();
  
  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(images);
    }
  } catch (error) {
    showError('Failed to fetch images. Please try again later.');
  } finally {
    hideLoader();
  }
});


 


