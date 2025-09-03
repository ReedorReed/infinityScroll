const container = document.getElementById('container');
const API_KEY = '04daff3fa75e2bed2797e93795e233d0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/media/';

console.log(container);

const getPopMovies = async () => {
	try {
		const response = await fetch(
			`${BASE_URL}/movie/popular?api_key=${API_KEY}`
		);

		const data = await response.json();
		handleData(data);
		return data;
	} catch (error) {
		console.log('not working yet');
	}
};


function handleData(data) {
	container.innerHTML = '';

	const movieGrid = document.createElement('div');
	movieGrid.className = 'movie-grid';

	const movieCards = data.results
		.map((movie) => {
			return /*html */ `
            <div class="movie-card" data-movie-id="${movie.id}">
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
            </div>
        `;
		})
		.join('');

	movieGrid.innerHTML = movieCards;
	console.log(movieGrid);

	container.insertAdjacentHTML('beforeend', movieGrid);
}
