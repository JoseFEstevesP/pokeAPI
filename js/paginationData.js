import { pokemonDate } from './api.js';
import { paginationPrint } from './printApi.js';
const paginationContent = document.getElementById('pagination');
let currentPage = 1;
let cardPrePage = 20;
export const totNumPage = array => Math.ceil(array.length / cardPrePage);
export const previousPage = (pokemonTypes) => {
	if (currentPage > 1) {
		currentPage--;
		change({ page: currentPage, arrayData: pokemonTypes });
	}
};
export const nextPage = (pokemonTypes) => {
	if (currentPage < totNumPage(pokemonTypes)) {
		currentPage++;
		change({ page: currentPage, arrayData: pokemonTypes });
	}
};
export const change = ({ page, arrayData }) => {
	if (page < 1) page = 1;
	if (page > totNumPage(arrayData)) page = totNumPage(arrayData);
	let arrayPagination = [];
	for (let i = (page - 1) * cardPrePage; i < page * cardPrePage; i++) {
		const data = arrayData[i];
		arrayPagination.push(data);
		if (arrayPagination.length === cardPrePage) {
			const dataFilter = arrayPagination.filter(i => i !== undefined);
			pokemonDate(dataFilter);
		}
	}
	paginationPrint({ print: false });
	drawPagination({ page: page, arrayData: arrayData });
};
const drawPagination = ({ page, arrayData }) => {
	paginationContent.textContent = '';
	const btnNext = document.createElement('a');
	btnNext.setAttribute('href', '#');
	btnNext.className = 'btn btn--paginationTypes ';
	btnNext.id = 'nextTypes';
	const iconNext = document.createElement('img');
	iconNext.setAttribute('src', './assets/src/icon/arrowRight.svg');
	iconNext.setAttribute('alt', 'icon next');
	btnNext.appendChild(iconNext);
	const btnPrevious = document.createElement('button');
	btnPrevious.className = 'btn btn--paginationTypes ';
	btnPrevious.id = 'previousTypes';
	const iconPrevious = document.createElement('img');
	iconPrevious.setAttribute('src', './assets/src/icon/arrowLeft.svg');
	iconPrevious.setAttribute('alt', 'icon previous');
	btnPrevious.appendChild(iconPrevious);
	paginationContent.appendChild(btnPrevious);
	paginationContent.appendChild(btnNext);
	page === 1
		? btnPrevious.classList.add('btn--paginationShow')
		: btnPrevious.classList.remove('btn--paginationShow');
	page === totNumPage(arrayData)
		? btnNext.classList.add('btn--paginationShow')
		: btnNext.classList.remove('btn--paginationShow');
		// loader(false)
};
