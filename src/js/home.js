import filmCardTemplate from '../templates/filmoteka-cards.hbs';
import modalTemplate from '../templates/modal.hbs';
import { refs } from './refs';
import { ThemoviedbAPI } from './API';

const theMovieDbAPI = new ThemoviedbAPI();

refs.openModal.addEventListener('click', handleCardsClick);
window.addEventListener('load', handleLoadPage);

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

    const filmId = evt.target.parentElement.id;

    try {
      const { data } = await theMovieDbAPI.fetchFullFilmInfo(filmId);
      renderFullInfoModal(data);
    } catch (error) {
      onFetchError;
    }

    refs.closeModal.addEventListener('click', handleModalCloseBtnClick);
  }
}

function handleModalCloseBtnClick() {
  refs.backdrop.classList.toggle('hidden');
  refs.modal.innerHTML = '';
  refs.closeModal.removeEventListener('click', handleModalCloseBtnClick);
}

async function handleModalImgClick() {
  refs.videoModal.classList.toggle('hidden');
  console.log('hi');
  refs.openVideo.removeEventListener('click', handleModalImgClick);

  try {
    const { data } = await theMovieDbAPI.fetchFullFilmInfo();
    //  renderFullInfoModal(data);
  } catch (error) {
    onFetchError;
  }

  refs.closeVideo.addEventListener('click', handleCloseVideoClick);
}

function handleCloseVideoClick() {
  refs.videoModal.classList.toggle('hidden');
  refs.closeVideo.removeEventListener('click', handleCloseVideoClick);
}

// function onFetchSuccess(data) {
// }

function onFetchError(err) {
  console.warn(err);
}

function renderGalleryCards(data) {
  console.log(data.results);
  refs.openModal.insertAdjacentHTML(
    'beforeend',
    filmCardTemplate(data.results)
  );
}

function renderFullInfoModal(data) {
  console.log(data);
  refs.modal.insertAdjacentHTML('beforeend', modalTemplate(data));
  refs.openVideo.addEventListener('click', handleModalImgClick);
}
