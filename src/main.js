import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages, showLoader, hideLoader, showError, toggleLoadMoreButton, showEndOfResults } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more-button');
const loadMoreContainer = document.getElementById('load-more-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = document.getElementById('search-input').value.trim();
  if (!currentQuery) {
    showError('Please enter a search term');
    return;
  }
  
  currentPage = 1;
  clearGallery();
  toggleLoadMoreButton(false);
  showLoader();
  
  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(data.hits);
      toggleLoadMoreButton(data.hits.length === 15);
      loadMoreContainer.style.display = 'block';
    }
  } catch (error) {
    showError('Failed to fetch images. Please try again later.');
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  
  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);
    if (data.hits.length < 15 || currentPage * 15 >= data.totalHits) {
      toggleLoadMoreButton(false);
      showEndOfResults();
    } else {
      window.scrollBy({
        top: document.querySelector('.gallery a').getBoundingClientRect().height * 2,
        behavior: 'smooth'
      });
    }
  } catch (error) {
    showError('Failed to fetch images. Please try again later.');
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
});


 


