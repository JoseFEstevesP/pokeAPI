import { arrayData } from './printApi.js';
import { colorTypes, touppercase, id } from './props.js';
const modal = id('modal');
export const modalPokedex = e => {
	const mq = mq => modal.querySelector(mq);
	mq('.modal__btn').focus()
	const img = mq('.modal__img img');
	img.setAttribute('src', '');
	img.setAttribute('alt', '');
	const result = arrayData.filter(item => item.id === +e.target.dataset.id);
	let src =
		result[0].sprites.other.dream_world.front_default ??
		result[0].sprites.other.home.front_default ??
		result[0].sprites.back_default ??
		'./assets/src/icon/pokemonNull.svg';
	img.setAttribute('src', src);
	img.setAttribute('alt', `this img is ${result[0].name}`);
	mq('.modal__nameText').textContent = touppercase(
		result[0].name.split('-').join(' ')
	);
	mq('.modal__nameNumber').textContent = `N° ${result[0].id}`;
	const contentType = mq('.modal__contentType');
	contentType.textContent = '';
	result[0].types.forEach(types => {
		const name = document.createElement('span');
		name.classList.add('modal__statsValue--types');
		name.style = `--colorTypes:${colorTypes[types.type.name]}`;
		name.textContent = types.type.name;
		contentType.appendChild(name);
	});
	const stats = {
		hp: result[0].stats[0],
		attack: result[0].stats[1],
		defense: result[0].stats[2],
		S_A: result[0].stats[3],
		S_D: result[0].stats[4],
		speed: result[0].stats[5],
	};
	mq('#hp').textContent = stats.hp.base_stat;
	mq('#Attack').textContent = stats.attack.base_stat;
	mq('#defense').textContent = stats.defense.base_stat;
	mq('#S_A').textContent = stats.S_A.base_stat;
	mq('#S_D').textContent = stats.S_D.base_stat;
	mq('#speed').textContent = stats.speed.base_stat;
	modal.classList.toggle('modal--show');
	modal.lastElementChild.classList.toggle('modal__pokedex--show');
	document.body.classList.toggle('scrollNone');
	modal.lastElementChild.firstElementChild.classList.toggle('modal__top--show');
	modal.lastElementChild.lastElementChild.classList.toggle(
		'modal__bottom--show'
	);
	modal.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.classList.toggle(
		'modal__img--show'
	);
};
export const closeModal = () => {
	modal.classList.toggle('modal--show');
	modal.lastElementChild.classList.toggle('modal__pokedex--show');
	document.body.classList.toggle('scrollNone');
	modal.lastElementChild.firstElementChild.classList.toggle('modal__top--show');
	modal.lastElementChild.lastElementChild.classList.toggle(
		'modal__bottom--show'
	);
	modal.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.classList.toggle(
		'modal__img--show'
	);
};
