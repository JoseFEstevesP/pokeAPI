import theme from './darMode.js';
import { pokeApi, pokemonDate } from './api.js';
import { clear, paginationPrint } from './printApi.js';
import { id, arrayResults, queryAll } from './props.js';
import { dataAutocomplete, arrayDataName } from './filter.js';
import { modalPokedex, closeModal } from './modalPokedex.js';
import { types, typesSelectApi, btnTypes } from './types.js';
import { nextPage, previousPage } from './paginationData.js';
import { loader } from './loader.js';
const form = id('form');
const suggestions = id('suggestions');
const allType = id('allTypes');
document.addEventListener('DOMContentLoaded', () => {
	types('https://pokeapi.co/api/v2/type/');
	pokeApi('https://pokeapi.co/api/v2/pokemon');
	dataAutocomplete('https://pokeapi.co/api/v2/pokemon?limit=10000');
});
document.addEventListener('click', e => {
	if (e.target.parentElement.matches('#home') || e.target.matches('#home')) {
		btnTypes(allType);
		pokeApi('https://pokeapi.co/api/v2/pokemon');
		allType.classList.add('filter__type--hidden');
	}
	if (e.target.matches('.menu__btn')) {
		e.target.firstElementChild.classList.toggle('menu__bar--show')
		e.target.offsetParent.firstElementChild.nextElementSibling.classList.toggle(
			'menu__nav--show'
		);
	}
	if (e.target.matches('#sun')) {
		theme({
			theme: 'light',
			btnShow: moon,
		});
	}
	if (e.target.matches('#moon')) {
		theme({
			theme: 'dark',
			btnShow: sun,
		});
	}
	if (e.target.matches('.card')) {
		modalPokedex(e);
	}
	if (e.target.matches('.modal__btn') || e.target.matches('.modal')) {
		closeModal(e);
	}
	if (e.target.matches('.btn--pagination')) {
		clear();
		pokeApi(e.target.dataset.url);
	}
	if (e.target.matches('.search__linkSuggestions')) {
		form[0].value = e.target.innerText;
		suggestions.classList.remove('search__contentSuggestions--show');
		const searchValue = form[0].value.trim().toLowerCase().split(' ').join('-');
		const results = arrayResults({
			array: arrayDataName,
			include: searchValue,
		});
		paginationPrint({ print: false });
		pokemonDate(results);
	}
	if (e.target.matches('.filter__contentType')) {
		e.target.nextElementSibling.classList.toggle('filter__typeOption--show');
	}
	if (e.target.matches('#allTypes')) {
		btnTypes(e.target);
		queryAll('.filter__option .filter__type').forEach(btnType => {
			btnType.classList.remove('filter__type--hidden');
		});
		e.target.classList.add('filter__type--hidden');
		pokeApi('https://pokeapi.co/api/v2/pokemon');
	}
	if (e.target.matches('.filter__option > .filter__type')) {
		loader(true);
		queryAll('.filter__option .filter__type').forEach(btnType => {
			btnType.classList.remove('filter__type--hidden');
		});
		allType.classList.remove('filter__type--hidden');
		typesSelectApi(e.target.dataset.url);
		e.target.classList.add('filter__type--hidden');
		btnTypes(e.target);
	}
	if (e.target.matches('#nextTypes')) {
		loader(true);
		nextPage();
	}
	if (e.target.matches('#previousTypes')) {
		loader(true);
		previousPage();
	}
});
