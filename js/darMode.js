import { id } from './props.js';
const sun = id('sun');
const moon = id('moon');
const html = document.documentElement.classList;
const theme = ({ theme, btnShow, local = true }) => {
	const themeOptions = {
		dark: 'light',
		light: 'dark',
	};
	const btnOptions = {
		sun: moon,
		moon: sun,
	};
	html.remove(themeOptions[theme]);
	html.add(theme);
	btnShow.classList.add('btn--DarkModeShow');
	btnOptions[btnShow.id].classList.remove('btn--DarkModeShow');
	if (local) {
		localStorage.setItem('theme', theme);
	}
};
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
	if (currentTheme === 'dark') {
		theme({
			theme: 'dark',
			btnShow: sun,
			local: false,
		});
	} else {
		theme({
			theme: 'light',
			btnShow: moon,
			local: false,
		});
	}
} else {
	let theme;
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		sun.classList.add('btn--DarkModeShow');
		html.toggle('dark');
		theme = 'dark';
	} else {
		moon.classList.add('btn--DarkModeShow');
		html.toggle('light');
		theme = 'light';
	}
	localStorage.setItem('theme', theme);
}
export default theme;
