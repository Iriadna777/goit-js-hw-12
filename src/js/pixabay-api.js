import axios from 'axios';

const API_KEY = '23963114-6d0d5d874ae460d9125bacd21';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);
  return response.data;
}

  