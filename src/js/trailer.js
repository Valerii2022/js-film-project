// import { fetchPopMovies } from './fetchFromTheMovieDB';

import axios from 'axios';

const API_KEY = '7fc57a32bb8b4747bafc97bb7301e33f';
const BASE_API = 'https://api.themoviedb.org';

trailerModalCloseEl = document.querySelector('[data-trailer-close]');
trailerModalEl = document.querySelector('[data-trailer-modal]');
trailerModalOpenEl = document.querySelector('.modal__poster');
trailerModalOpenEl = document.querySelector('.modal__watch-treller');
movieModalEl = document.querySelector('.modal__movie');
iframeEl = document.querySelector('[data-iframe]');

trailerModalOpenEl.addEventListener('click', handleOpenTrailerClick);
trailerModalCloseEl.addEventListener('click', handleCloseTrailerBtnClick);

function handleOpenTrailerClick() {
  renderTrailerModal(315162);
  trailerModalEl.classList.toggle('visually-hidden');
  movieModalEl.classList.toggle('visually-hidden');
  trailerModalEl.addEventListener('click', handleBackdropClick);
  document.addEventListener('keydown', handleEscapeClick);
}

function handleEscapeClick(event) {
  if (event.code === 'Escape') {
    toggleModal();
    document.removeEventListener('keydown', handleEscapeClick);
  }
}

function handleBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModal();
    document.removeEventListener('keydown', handleEscapeClick);
  }
}

function handleCloseTrailerBtnClick() {
  toggleModal();
  document.removeEventListener('keydown', handleEscapeClick);
}

function toggleModal() {
  iframeEl.innerHTML = ' ';
  document.body.classList.toggle('no-scroll');
  movieModalEl.classList.toggle('visually-hidden');
  trailerModalEl.classList.toggle('visually-hidden');
  document.addEventListener('keydown', handleEscapeClick);
}

async function renderTrailerModal(id) {
  try {
    const { data } = await fetchMovieTrailer(id);
    findOfficialTrailer(data.results);
  } catch (error) {
    onFetchError;
  }
}

function onFetchError(err) {
  console.warn(err);
}

async function fetchMovieTrailer(id) {
  try {
    return await axios.get(
      `${BASE_API}/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

function findOfficialTrailer(data) {
  let key;
  data.forEach(el => {
    if (el.name === 'Official Trailer' || el.name === 'Official Trailer 1') {
      key = el.key;
    }
  });
  iframeEl.insertAdjacentHTML(
    'beforeend',
    `<iframe
          class="trailer__iframe"
          src="https://www.youtube.com/embed/${key}"
          title="Official trailer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>`
  );
}
