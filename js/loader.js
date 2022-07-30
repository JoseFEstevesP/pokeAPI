import { query } from './props.js';
export const loader = load => {
	const loaderMain = query('.loader');
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
