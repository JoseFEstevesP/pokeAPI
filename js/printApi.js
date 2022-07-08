import { element, arrayOrder, loader } from './props.js';
const cardTemplate = document.getElementById('card').content;
const main = document.getElementById('main');
const pagination = document.getElementById('pagination');
export let arrayData = [];
const fragment = document.createDocumentFragment();
export const printCard = arraySelect => {
	main.textContent = '';
	arrayOrder(arraySelect);
	arraySelect.forEach(data => {
		const clone = cardTemplate.cloneNode(true);
		const card = clone.querySelector('.card');
		const cardElements = clone.querySelector('.card__elements');
		const cardImg = clone.querySelector('.card__img');
		const cardName = clone.querySelector('.card__name');
		card.setAttribute('data-id', data.id);
		data.types.forEach(item => {
			const div = document.createElement('div');
			const img = document.createElement('img');
			div.classList.add('card__elementIcon');
			img.setAttribute('src', element[item.type.name]);
			img.setAttribute('alt', `the icon is ${item.type.name}`);
			img.setAttribute('title', `${item.type.name}`);
			div.appendChild(img);
			cardElements.appendChild(div);
		});
		let src =
			data.sprites.other.dream_world.front_default ??
			data.sprites.other.home.front_default ??
			data.sprites.back_default ??
			'./assets/src/icon/pokemonNull.svg';
		cardImg.setAttribute('src', src);
		cardImg.setAttribute('alt', `this img is ${data.name}`);
		cardImg.setAttribute('loading', 'lazy');
		cardImg.setAttribute('decoding', 'async');
		cardName.textContent = data.name.split('-').join(' ');
		fragment.appendChild(clone);
	});
	main.appendChild(fragment);
	loader(false);
};
export const clear = () => {
	arrayData = [];
};
export const paginationPrint = ({ data, print = true }) => {
	if (!print) {
		return (pagination.innerHTML = '');
	}
	pagination.textContent = '';
	const btnNext = document.createElement('a');
	btnNext.setAttribute('href', '#');
	btnNext.setAttribute('data-url', data.next);
	btnNext.classList.add('btn');
	btnNext.classList.add('btn--pagination');
	btnNext.classList.add('btn--paginationShow');
	const iconNext = document.createElement('img');
	iconNext.setAttribute('src', './assets/src/icon/arrowRight.svg');
	iconNext.setAttribute('alt', 'icon next');
	btnNext.appendChild(iconNext);
	const btnPrevious = document.createElement('a');
	btnPrevious.setAttribute('href', '#');
	btnPrevious.setAttribute('data-url', data.previous);
	btnPrevious.classList.add('btn');
	btnPrevious.classList.add('btn--pagination');
	btnPrevious.classList.add('btn--paginationShow');
	const iconPrevious = document.createElement('img');
	iconPrevious.setAttribute('src', './assets/src/icon/arrowLeft.svg');
	iconPrevious.setAttribute('alt', 'icon previous');
	btnPrevious.appendChild(iconPrevious);
	pagination.appendChild(btnPrevious);
	pagination.appendChild(btnNext);
	data.next
		? btnNext.classList.remove('btn--paginationShow')
		: btnNext.classList.add('btn--paginationShow');
	data.previous
		? btnPrevious.classList.remove('btn--paginationShow')
		: btnPrevious.classList.add('btn--paginationShow');
};
