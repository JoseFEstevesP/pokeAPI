import { id } from './props.js';
let ranking = [];
const rankingTemplate = id('rankingTemplate').content;
const scoreboard = id('scoreboard');
const drawRanking = rankingData => {
	scoreboard.textContent = '';
	rankingData.sort((a, b) => {
		return b.point - a.point;
	});
	const fragment = document.createDocumentFragment();
	for (const position of rankingData) {
		const clone = rankingTemplate.cloneNode(true);
		const $ = a => clone.querySelector(a);
		$('.scoreboard__user').textContent = position.name;
		$('.scoreboard__totalPoints').textContent = position.point;
		$('.scoreboard__btn').dataset.id = position.id;
		fragment.appendChild(clone);
	}
	scoreboard.appendChild(fragment);
};
const getLocalStorage = rankingData => {
	localStorage.setItem('ranking', JSON.stringify(rankingData));
};
const createUserRanking = (name, point) => {
	const userObjet = { id: `${Date.now()}`, name, point };
	ranking.push(userObjet);
	getLocalStorage(ranking);
	drawRanking(JSON.parse(localStorage.getItem('ranking')));
};
let totalCard = 0;
let dataPoke = [];
const pokeData = async url => {
	const api = await fetch(url);
	const data = await api.json();
	dataPoke.push(data);
	drawCards({ data: dataPoke });
};
const cardGameTemplate = id('cardGame').content;
const gameContent = id('GameContent');
const drawCards = ({ data }) => {
	const dataPokemon = [...data, ...data];
	dataPokemon.sort(() => Math.random() - 0.5);
	const fragment = document.createDocumentFragment();
	gameContent.textContent = '';
	dataPokemon.forEach(i => {
		const clone = cardGameTemplate.cloneNode(true);
		const $ = a => clone.querySelector(a);
		$('.card').dataset.id = i.id;
		$('.card').dataset.pokewin = false;
		$('.card__img').src = i.sprites.other.dream_world.front_default;
		$('.card__title').textContent = i.name;
		fragment.appendChild(clone);
	});
	gameContent.appendChild(fragment);
	const allCardsElement = document.querySelectorAll('.card');
	if (allCardsElement.length === totalCard * 2) {
		setTimeout(() => allCard(allCardsElement), 1000);
		setTimeout(() => allCard(allCardsElement, true), 4000);
	}
};
export const generatePokeCard = totalCard => {
	const getRandomId = (min = 1, max = 151) =>
		Math.floor(Math.random() * (max - min) + min);
	const currentCards = [
		...new Set(Array.from({ length: totalCard }).map(() => getRandomId())),
	];
	if (currentCards.length < totalCard) {
		generatePokeCard(totalCard);
	} else {
		for (const i of currentCards) {
			pokeData(`https://pokeapi.co/api/v2/pokemon/${i}`);
		}
	}
};
let cardPlay = false;
const allCard = (allCardsElement, play = false) => {
	allCardsElement.forEach(card => {
		card.classList.toggle('card--show');
	});
	cardPlay = play;
};
let firstCard = undefined;
let secondCard = undefined;
let fails = 0;
let points = 0;
let combo = 1;
const setPoints = (error = false) => {
	if (!error) {
		points = points + combo * 10;
		combo++;
		id('points').textContent = points;
	} else {
		fails++;
		id('pointsFails').textContent = fails;
		combo = 1;
	}
};
const setCardSelect = (firstCardSelected, secondCardSelected) => {
	if (firstCardSelected.dataset.id === secondCardSelected.dataset.id) {
		firstCardSelected.dataset.pokewin = true;
		secondCardSelected.dataset.pokewin = true;
		setPoints();
		checkPokeWin();
	} else {
		secondCardSelected.addEventListener(
			'transitionend',
			() => {
				firstCardSelected.classList.remove('card--show');
				secondCardSelected.classList.remove('card--show');
			},
			{ once: true }
		);
		setPoints(true);
	}
	firstCard = undefined;
	secondCard = undefined;
	id('combo').textContent = `X ${combo}`;
	id('totalPoint').textContent = points - fails;
};
const checkPokeWin = () => {
	const pokewin = document.querySelectorAll('.card[data-pokewin="true"]');
	if (pokewin.length === totalCard * 2) {
		createUserRanking(nameEmpty, points - fails);
		id('modalWin').classList.add('modalWin--show');
	}
};
export const card = card => {
	if (cardPlay) {
		if (firstCard === undefined) {
			firstCard = card;
		} else {
			secondCard = card;
			setCardSelect(firstCard, secondCard);
		}
	}
};
let nameEmpty;
const difficultyGame = {
	easy: 10,
	normal: 15,
	hard: 20,
};
id('from').addEventListener('submit', e => {
	e.preventDefault();
	const { name, difficulty } = e.target;
	name.value.trim() === ''
		? (nameEmpty = 'user')
		: (nameEmpty = name.value.trim());
	totalCard = difficultyGame[difficulty.value];
	generatePokeCard(totalCard);
	drawRanking(ranking);
	id('modal').classList.remove('modal--show');
});
export const deleteRanking = element => {
	ranking = ranking.filter(r => r.id !== element.dataset.id);
	drawRanking(ranking);
};
export const loadGetLocalStorage = () => {
	if (localStorage.getItem('ranking')) {
		ranking = JSON.parse(localStorage.getItem('ranking'));
	}
};
