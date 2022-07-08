import theme from './darMode.js';
import { pokeApi, pokemonDate } from './api.js';
import { clear, paginationPrint } from './printApi.js';
import { id, arrayResults } from './props.js';
import { dataAutocomplete, arrayDataName } from './filter.js';
import { modalPokedex, closeModal } from './modalPokedex.js';
const form = id('form');
const suggestions = id('suggestions');
document.addEventListener('DOMContentLoaded', () => {
	pokeApi('https://pokeapi.co/api/v2/pokemon');
	dataAutocomplete('https://pokeapi.co/api/v2/pokemon?limit=10000');
});
document.addEventListener('click', e => {
	if (e.target.matches('#home')) {
		pokeApi('https://pokeapi.co/api/v2/pokemon');
	}
	if (e.target.matches('.btn--menu')) {
		e.target.firstElementChild.classList.toggle('btn--menuBarShow');
		e.target.nextElementSibling.classList.toggle('menu__nav--show');
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
});
