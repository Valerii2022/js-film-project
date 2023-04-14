import filmCardTemplate from '../templates/filmoteka-cards.hbs';
import modalTemplate from '../templates/modal.hbs';
import trailerTemplate from '../templates/trailer.hbs';
import { refs } from './refs';
import { ThemoviedbAPI } from './API';

const theMovieDbAPI = new ThemoviedbAPI();

refs.openModal.addEventListener('click', handleCardsClick);

window.addEventListener('load', handleLoadPage);

let populareFilms = {};
let searchFilm = {};
let filmId;

async function handleLoadPage() {
  try {
    const { data } = await theMovieDbAPI.fetchPopulareFilms();
    renderGalleryCards(data);
  } catch (error) {
    onFetchError;
  }
}

async function handleCardsClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'UL') {
    refs.backdrop.classList.toggle('hidden');

    filmId = evt.target.parentElement.id;

    try {
      const { data } = await theMovieDbAPI.fetchFullFilmInfo(filmId);
      renderFullInfoModal(data);
    } catch (error) {
      onFetchError;
    }

    refs.closeModal.addEventListener('click', handleModalCloseBtnClick);
    refs.openTrailer.addEventListener('click', handleTrailerOpenBtnClick);
  }
}

function handleModalCloseBtnClick() {
  refs.backdrop.classList.toggle('hidden');
  refs.modal.innerHTML = '';
  refs.closeModal.removeEventListener('click', handleModalCloseBtnClick);
  refs.openTrailer.removeEventListener('click', handleTrailerOpenBtnClick);
}

async function handleTrailerOpenBtnClick() {
  refs.backdrop.classList.toggle('hidden');
  refs.videoModal.classList.toggle('hidden');

  refs.closeVideo.addEventListener('click', handleCloseVideoClick);

  try {
    const { data } = await theMovieDbAPI.fetchFilmVideo(filmId);
    renderTrailer(data);
  } catch (error) {
    onFetchError;
  }
}

function handleCloseVideoClick() {
  refs.trailerWrap.innerHTML = '';
  refs.videoModal.classList.toggle('hidden');
  refs.backdrop.classList.toggle('hidden');
  refs.closeVideo.removeEventListener('click', handleCloseVideoClick);
}

function onFetchError(err) {
  console.warn(err);
}

function renderGalleryCards(data) {
  populareFilms = data.results;

  refs.openModal.insertAdjacentHTML(
    'beforeend',
    filmCardTemplate(data.results)
  );
}

function renderFullInfoModal(data) {
  searchFilm = data;

  refs.modal.insertAdjacentHTML('beforeend', modalTemplate(data));
  refs.openVideo.addEventListener('click', handleModalImgClick);
  refs.watched.addEventListener('click', handleWatchedBtnClick);
  refs.queue.addEventListener('click', handleQueueBtnClick);
}

function renderTrailer(data) {
  const key = findTrailerById(data);
  refs.trailerWrap.insertAdjacentHTML('beforeend', trailerTemplate(key));
}

function handleWatchedBtnClick() {
  console.log('watched');
}

function handleQueueBtnClick() {
  console.log('queue');
}

function findTrailerById(data) {
  console.log(data.results);

  const key = data.results[3].key;
  return key;
}
