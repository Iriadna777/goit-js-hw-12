// export const fetchImages = async (query) => {
//     const apiKey = '23963114-6d0d5d874ae460d9125bacd21';
//     const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Sorry, there are no images matching your search query. Please try again!');
//     return response.json();
//   };

const API_KEY = '23963114-6d0d5d874ae460d9125bacd21';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data.hits;
}

  