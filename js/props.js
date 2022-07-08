import { pokeApi } from './api.js';
export const element = {
	bug: './assets/src/icon/element/bug.svg',
	dark: './assets/src/icon/element/dark.svg',
	dragon: './assets/src/icon/element/dragon.svg',
	electric: './assets/src/icon/element/electric.svg',
	fairy: './assets/src/icon/element/fairy.svg',
	fighting: './assets/src/icon/element/fighting.svg',
	fire: './assets/src/icon/element/fire.svg',
	flying: './assets/src/icon/element/flying.svg',
	ghost: './assets/src/icon/element/ghost.svg',
	grass: './assets/src/icon/element/grass.svg',
	ground: './assets/src/icon/element/ground.svg',
	ice: './assets/src/icon/element/ice.svg',
	normal: './assets/src/icon/element/normal.svg',
	poison: './assets/src/icon/element/poison.svg',
	psychic: './assets/src/icon/element/psychic.svg',
	rock: './assets/src/icon/element/rock.svg',
	steel: './assets/src/icon/element/steel.svg',
	water: './assets/src/icon/element/water.svg',
};
export const colorTypes = {
	bug: '#92BC2C',
	dark: '#595761',
	dragon: '#0C69C8',
	electric: '#F2D94E',
	fairy: '#EE90E6',
	fighting: '#D3425F',
	fire: '#ff9741',
	flying: '#A1BBEC',
	ghost: '#5F6DBC',
	grass: '#5FBD58',
	ground: '#DA7C4D',
	ice: '#75D0C1',
	normal: '#A0A29F',
	poison: '#B763CF',
	psychic: '#FA8581',
	rock: '#C9BB8A',
	steel: '#5695A3',
	water: '#539DDF',
};
export const touppercase = name => {
	return name[0].toUpperCase() + name.slice(1);
};
export const loader = load => {
	const loaderMain = document.querySelector('.loader');
	if (load) {
		document.body.classList.add('scrollNone');
		loaderMain.classList.remove('loader--show');
		loaderMain.firstElementChild.classList.remove('loader__icon--show');
	} else {
		document.body.classList.remove('scrollNone');
		loaderMain.classList.add('loader--show');
		loaderMain.firstElementChild.classList.add('loader__icon--show');
	}
};
export const arrayOrder = array => {
	array.sort((a, b) => {
		return a.id - b.id;
	});
};
export const pokemonNotFound = () => {
	const pokemonNotFound = document.getElementById('pokemonNotFound');
	document.body.classList.toggle('scrollNone');
	pokemonNotFound.classList.toggle('pokemonNotFound--show');
	pokemonNotFound.firstElementChild.classList.toggle(
		'pokemonNotFound__content--show'
	);
	setTimeout(() => {
		id({ id: 'form' }).firstElementChild.value = '';
		document.body.classList.toggle('scrollNone');
		pokemonNotFound.classList.toggle('pokemonNotFound--show');
		pokemonNotFound.firstElementChild.classList.toggle(
			'pokemonNotFound__content--show'
		);
		pokeApi('https://pokeapi.co/api/v2/pokemon');
	}, 2000);
};
export const id = id => document.getElementById(id);
export const query = query => document.querySelector(query);
export const arrayResults = ({ array, include }) => {
	return array.filter(index => index.name.includes(include));
};
