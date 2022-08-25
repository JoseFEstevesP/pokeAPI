import theme from './darMode.js';
import { loader } from './loader.js';
import { card } from './gameCard.js';
import { id } from './props.js';
window.addEventListener('load', () => {
	loader(false);
	id('modal').classList.add('modal--show');
});
document.addEventListener('click', e => {
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
	if (e.target.matches('.card') || e.target.parentElement.matches('.card')) {
		e.target.parentElement.classList.add('card--show');
		card(e.target.parentElement);
	}
});
