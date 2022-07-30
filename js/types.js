import { colorTypes, query } from './props.js';
import { change } from './paginationData.js';
const filterTypeContent = query('.filter__option');
export const types = async url => {
	try {
		const api = await fetch(url);
		const data = await api.json();
		typePrint(data.results);
	} catch (error) {
		console.error(error);
	}
};
export let pokemonTypes = [];
export const typesSelectApi = async url => {
	try {
		const api = await fetch(url);
		const data = await api.json();
		pokemonTypes = [];
		data.pokemon.forEach(i => {
			pokemonTypes.push(i.pokemon);
		});
		change({ page: 1, arrayData: pokemonTypes });
	} catch (error) {
		console.error(error);
	}
};
const typePrint = data => {
	const arrayFilter = data.filter(
		types => types.name !== 'shadow' && types.name !== 'unknown'
	);
	const fragment = document.createDocumentFragment();
	filterTypeContent.textContent = '';
	arrayFilter.forEach(element => {
		const btn = document.createElement('button');
		btn.classList.add('filter__type');
		btn.textContent = element.name;
		btn.style = `--BGTypes:${colorTypes[element.name]}`;
		btn.setAttribute('data-url', element.url);
		fragment.appendChild(btn);
	});
	filterTypeContent.appendChild(fragment);
};
export const btnTypes = btn => {
	const filterContent = query('.filter__content');
	filterContent.textContent = '';
	const btnType = document.createElement('button');
	btnType.classList.add('filter__type');
	let name = btn.innerText;
	if (name === '') {
		name = 'All';
	}
	btnType.style = `--BGTypes:${colorTypes[name] ?? colorTypes['normal']};`;
	btnType.textContent = name;
	filterContent.appendChild(btnType);
};
