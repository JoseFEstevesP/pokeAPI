import { element, arrayOrder,id} from './props.js';
import { loader } from './loader.js';
const cardTemplate = id('card').content;
const main = id('main');
const pagination = id('pagination');
export let arrayData = [];
const fragment = document.createDocumentFragment();
export const printCard = arraySelect => {
	main.textContent = '';
	arrayOrder(arraySelect);
	arraySelect.forEach(data => {
		const clone = cardTemplate.cloneNode(true);
		const $ = a => clone.querySelector(a);
		const card = $('.card');
		const cardElements = $('.card__elements');
		const cardImg = $('.card__img');
		const cardName = $('.card__name');
		card.tabIndex=0
		card.dataset.id = data.id;
		data.types.forEach(item => {
			const div = document.createElement('div');
			const img = document.createElement('img');
			div.classList.add('card__elementIcon');
			img.src = element[item.type.name];
			img.alt = `the icon is ${item.type.name}`;
			img.setAttribute('title', `${item.type.name}`);
			div.appendChild(img);
			cardElements.appendChild(div);
		});
		let src =
			data.sprites.other.dream_world.front_default ??
			data.sprites.other.home.front_default ??
			data.sprites.back_default ??
			'./assets/src/icon/pokemonNull.svg';
		cardImg.src = src;
		cardImg.alt = `this img is ${data.name}`;
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
	btnNext.className = 'btn btn--pagination btn--paginationShow';
	const iconNext = document.createElement('img');
	iconNext.setAttribute('src', './assets/src/icon/arrowRight.svg');
	iconNext.setAttribute('alt', 'icon next');
	btnNext.appendChild(iconNext);
	const btnPrevious = document.createElement('a');
	btnPrevious.setAttribute('href', '#');
	btnPrevious.setAttribute('data-url', data.previous);
	btnPrevious.className = 'btn btn--pagination btn--paginationShow';
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
