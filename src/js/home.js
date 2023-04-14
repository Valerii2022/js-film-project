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
    refs.addQueue.addEventListener('click', addFilmToQueueStorale);
    refs.addWatched.addEventListener('click', addFilmToWatchedStorale);
  }
}

function handleModalCloseBtnClick() {
  refs.backdrop.classList.toggle('hidden');
  refs.modal.innerHTML = '';
  refs.closeModal.removeEventListener('click', handleModalCloseBtnClick);
  refs.openTrailer.removeEventListener('click', handleTrailerOpenBtnClick);
  refs.addQueue.removeEventListener('click', addFilmToQueueStorale);
  refs.addWatched.removeEventListener('click', addFilmToWatchedStorale);
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
  refs.addWatched.addEventListener('click', handleWatchedBtnClick);
  refs.addQueue.addEventListener('click', handleQueueBtnClick);
}

function renderTrailer(data) {
  const key = findTrailerById(data);
  refs.trailerWrap.insertAdjacentHTML('beforeend', trailerTemplate(key));
}

function addFilmToWatchedStorale() {
  const watchedStorage = [JSON.parse(localStorage.getItem('watched'))];
  console.log(watchedStorage);

  const updateWatched = watchedStorage.push(searchFilm);
  console.log(updateWatched);

  localStorage.setItem('watched', JSON.stringify(updateWatched));
}

function addFilmToQueueStorale() {}

function findTrailerById(data) {
  console.log(data.results);

  const key = data.results[3].key;
  return key;
}
