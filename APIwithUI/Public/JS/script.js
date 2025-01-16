document.getElementById('categorySelect').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    console.log(selectedCategory);
    fetchMovies(selectedCategory);
});

const fetchMovies = async (category) => {
    try {
        const requestBody = { category: category };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch('/api/movies', options);

        const movies = await response.json();
        // console.log(response);

        if (response.ok) {
            console.log(movies.data); 
            renderMovies(movies.data.results); 
        } else {
            console.error('Error fetching movies:', movies);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

const renderMovies = (movies) => {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const posterPath = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
        const releaseDate = movie.release_date || movie.first_air_date;
        const voteAverage = movie.vote_average.toFixed(1);
        const title = movie.title || movie.name;
        const overview = movie.overview.substring(0,90);

        const movieCard = `
            <div class="col-md-3 col-sm-6">
                <div class="movie-card">
                    <img src="${posterPath}" class="movie-poster" alt="${title}">
                    <div class="movie-body bg-dark-subtle">
                        <div class="movie-title">${title}</div>
                        <div class="movie-text"><strong>Release Date:</strong> ${releaseDate} 🗓️</div>
                        <div class="movie-text"><strong>Rating:</strong> ${voteAverage} ★</div>
                        <div class="movie-overview">${overview}...</div>
                    </div>
                </div>
            </div>
        `;
        moviesList.innerHTML += movieCard;
    });
};

fetchMovies('trendingmovies'); // !Fetching Trending movies default to show 