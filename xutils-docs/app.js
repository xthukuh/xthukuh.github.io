document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');

	function navigateTo(url) {
			// history.pushState(null, null, url);
			loadContent(url);
	}

	function loadContent(url) {
			fetch(url)
					.then(response => response.text())
					.then(html => {
							console.log({html});
							app.innerHTML = new DOMParser().parseFromString(html, 'text/html').querySelector('body').innerHTML;
					})
					.catch(err => console.error('Failed to load content', err));
	}

	window.addEventListener('popstate', () => {
			loadContent(location.pathname);
	});

	document.body.addEventListener('click', (e) => {
			if (e.target.matches('a')) {
					e.preventDefault();
					navigateTo(e.target.href);
			}
	});

	// loadContent(location.pathname);
	loadContent('./main.html');
});
