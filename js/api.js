import { paginationPrint, printCard, arrayData, clear } from './printApi.js';
import { loader } from './props.js';
export const pokeApi = async url => {
	try {
		loader(true);
		const api = await fetch(url);
		const data = await api.json();
		pokemonDate(data.results);
		paginationPrint({ data });
	} catch (error) {
		console.error(error);
	}
};
export const pokemonDate = url => {
	try {
		clear();
		url.forEach(async index => {
			const api = await fetch(index.url);
			const data = await api.json();
			arrayData.push(data);
			printCard(arrayData);
		});
	} catch (error) {
		console.error(error);
	}
};
