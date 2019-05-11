'use strict';

window.addEventListener('load', () => {
	navigator.serviceWorker.register('/service-worker.js')
		.then(reg => {
			console.log('Service worker registered', reg);
		});
});
