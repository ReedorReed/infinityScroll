const container = document.getElementById('container');
const API_KEY = '04daff3fa75e2bed2797e93795e233d0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
let page = 1;

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGRhZmYzZmE3NWUyYmVkMjc5N2U5Mzc5NWUyMzNkMCIsIm5iZiI6MTc1NDU3MDQwMi44NDgsInN1YiI6IjY4OTQ5ZWEyNTgwOGQ2MTVlNDkyMjNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.izL8ZRorjEdMvkctVUiMmYb0eu93iytVt1nvjRBZNfY'
	}
};

fetchMovies(page);

// Observer
const showObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.toggle('show');
			showObserver.unobserve(entry.target);
		}
	});
});

const lastCardObserver = new IntersectionObserver(
	(entries) => {
		const lastCard = entries[0];
		if (!lastCard.isIntersecting) return;
		lastCardObserver.unobserve(lastCard.target);
		page++;
		fetchMovies(page);

		lastCardObserver.unobserve(lastCard.target);
	},
	{
		threshold: 0.5
	}
);

function fetchMovies(pageNumber) {
	const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`;
	fetch(url, options)
		.then((res) => res.json())
		.then((data) => {
            appendMovies(data.results);
            console.log(data);
		})
		.catch((err) => console.error(err));
}

function appendMovies(movies) {
	const fragment = document.createDocumentFragment();

	movies.forEach((movie) => {
		const card = document.createElement('div');
		card.classList.add('movie-card');
		card.setAttribute('data-movie-id', movie.id);

		card.innerHTML = /*html */ `
            <img src="${IMAGE_BASE_URL}w500${movie.poster_path}" alt="${
			movie.title
		}" class="movie-poster">
                    <div class="movie-info">
                        <h2 class="movie-title">${movie.title}</h2>
                        <p class="movie-rating">★ ${movie.vote_average.toFixed(
													1
												)}</p>
                        <p class="movie-overview">${movie.overview}</p>
                        <p class="movie-date">Release: ${movie.release_date}</p>
                    </div>

        `;

		fragment.appendChild(card);
		showObserver.observe(card);
	});

	container.appendChild(fragment);

	const lastCard = document.querySelector('.movie-card:last-child');
	if (lastCard) {
		lastCardObserver.observe(lastCard);
	}
}

// All credit goes to https://www.themoviedb.org/
