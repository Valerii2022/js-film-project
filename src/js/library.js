import { refs } from './refs';

window.addEventListener('load', handleLoadLibraryPage);
refs.watched.addEventListener('click', handleWatchedBtnClick);
refs.queue.addEventListener('click', handleQueueBtnClick);

function handleLoadLibraryPage() {}

function handleWatchedBtnClick() {
  refs.watched.classList.add('active-btn');
  refs.queue.classList.remove('active-btn');
}

function handleQueueBtnClick() {
  refs.watched.classList.remove('active-btn');
  refs.queue.classList.add('active-btn');
}
