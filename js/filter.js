import { id, arrayResults } from './props.js';
import { paginationPrint } from './printApi.js';
import { pokemonDate, pokeApi } from './api.js';
const form = id('form');
const suggestions = id('suggestions');
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
	const { search } = e.target;
	const searchValue = search.value.trim().toLowerCase().split(' ').join('-');
	const results = arrayResults({ array: arrayDataName, include: searchValue });
	paginationPrint({ print: false });
	results.length === 0 ? pokemonNotFound() : pokemonDate(results);
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
	const pokemonNotFound = document.getElementById('pokemonNotFound');
	document.body.classList.toggle('scrollNone');
	pokemonNotFound.classList.toggle('pokemonNotFound--show');
	pokemonNotFound.firstElementChild.classList.toggle(
		'pokemonNotFound__content--show'
	);
	setTimeout(() => {
		id('form').firstElementChild.value = '';
		document.body.classList.toggle('scrollNone');
		pokemonNotFound.classList.toggle('pokemonNotFound--show');
		pokemonNotFound.firstElementChild.classList.toggle(
			'pokemonNotFound__content--show'
		);
		pokeApi('https://pokeapi.co/api/v2/pokemon');
	}, 2000);
};
