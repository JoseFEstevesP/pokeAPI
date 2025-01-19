import { pokeApi, pokemonDate } from './api.js';
import theme from './darMode.js';
import { arrayDataName, dataAutocomplete, filterBtn } from './filter.js';
import { closeModal, modalPokedex } from './modalPokedex.js';
import { clear, paginationPrint } from './printApi.js';
import { arrayResults, id, queryAll } from './props.js';
import { btnTypes, types } from './types.js';
const form = id('form');
const suggestions = id('suggestions');
const allType = id('allTypes');
let target;
const urlPokeApi = 'https://pokeapi.co/api/v2/pokemon';
document.addEventListener('DOMContentLoaded', () => {
	types('https://pokeapi.co/api/v2/type/');
	pokeApi(urlPokeApi);
	dataAutocomplete('https://pokeapi.co/api/v2/pokemon?limit=10000');
});
document.addEventListener('click', e => {
	if (e.target.parentElement.matches('#home') || e.target.matches('#home')) {
		btnTypes(allType);
		pokeApi(urlPokeApi);
		allType.classList.add('filter__type--hidden');
	}
	if (e.target.matches('.menu__btn')) {
		e.target.firstElementChild.classList.toggle('menu__bar--show');
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
	if (e.target.matches('.filter__btn')) {
		e.target.offsetParent.lastElementChild.classList.toggle(
			'filter__typeOption--show'
		);
	}
	if (e.target.matches('#allTypes')) {
		btnTypes(e.target);
		queryAll('.filter__option .filter__type').forEach(btnType => {
			btnType.classList.remove('filter__type--hidden');
		});
		e.target.classList.add('filter__type--hidden');
		pokeApi(urlPokeApi);
	}
	if (e.target.matches('.filter__type')) {
		filterBtn(e.target);
	}
});
document.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		if (e.target.matches('.card')) {
			target = e.target;
			modalPokedex(e);
			setTimeout(() => {
				id('modalBtn').focus();
			}, 500);
		}
		if (e.target.matches('.modal__btn')) {
			setTimeout(() => {
				target.focus();
			}, 500);
		}
	}
});
/* nueva prueba 19/01/25 */