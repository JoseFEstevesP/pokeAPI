import { id, queryAll, query, arrayResults } from './props.js';
import { loader } from './loader.js';
import { pokeApi } from './api.js';
import { change } from './paginationData.js';
import { typesSelectApi,btnTypes } from './types.js';
const form = id('form');
const suggestions = id('suggestions');
const allType = id('allTypes');
form[0].addEventListener('input', e => {
	const searchValue = e.target.value.trim().toLowerCase().split(' ').join('-');
	const results = arrayDataName.filter(index =>
		index.name.includes(searchValue)
	);
	suggestions.textContent = '';
	const li = document.createElement('li');
	li.classList.add('search__listSuggestions');
	suggestions.classList.add('search__contentSuggestions--show');
	results.forEach(index => {
		const a = document.createElement('a');
		a.classList.add('search__linkSuggestions');
		a.textContent = index.name.split('-').join(' ');
		a.setAttribute('href', '#');
		li.appendChild(a);
	});
	suggestions.appendChild(li);
	if (e.target.value === '') {
		suggestions.classList.remove('search__contentSuggestions--show');
	}
});
form.addEventListener('submit', e => {
	e.preventDefault();
	suggestions.classList.remove('search__contentSuggestions--show');
	const { search } = e.target;
	if (!search) return;
	const searchValue = search.value.trim().toLowerCase().split(' ').join('-');
	const results = arrayResults({ array: arrayDataName, include: searchValue });
	results.length === 0
		? pokemonNotFound()
		: change({ page: 1, arrayData: results });
});
export let arrayDataName = [];
export const dataAutocomplete = async url => {
	try {
		const api = await fetch(url);
		const data = await api.json();
		data.results.forEach(index => {
			arrayDataName.push(index);
		});
	} catch (error) {
		console.error(error);
	}
};
const pokemonNotFound = () => {
	form.reset();
	pokeApi('https://pokeapi.co/api/v2/pokemon');
};
export const filterBtn = typeElement => {
	typeElement.classList.add('filter__type--hidden');
	loader(true);
	queryAll('.filter__option .filter__type').forEach(btnType => {
		btnType.classList.remove('filter__type--hidden');
	});
	allType.classList.remove('filter__type--hidden');
	typesSelectApi(typeElement.dataset.url);
	btnTypes(typeElement);
	query('.filter__typeOption').classList.remove('filter__typeOption--show');
};
