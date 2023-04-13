import { refs } from './refs';

refs.openModal.addEventListener('click', handleCardsClick);
refs.closeModal.addEventListener('click', handleModalCloseBtnClick);

function handleCardsClick() {
  console.log('open-modal');
}

function handleModalCloseBtnClick() {
  console.log('close-modal');
}
