export const API_KEY = "940f6502448182cb6314c2f58810f9b6";
const moviesCard = document.querySelector(".movie");
const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + API_KEY;

fetch(url)
  .then((res) => res.json())
  .then((json) => {
    const movies = json.results.slice(0, 10);
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie-card");
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>Rating: ${movie.vote_average}</p>
        <p>${movie.release_date}</p>
      `;
      moviesCard.appendChild(movieElement);
    });
  })
  .catch((err) => console.log("error:" + err));
