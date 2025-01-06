export const API_KEY = "940f6502448182cb6314c2f58810f9b6";

document.addEventListener("DOMContentLoaded", async () => {
  const topRatedMoviesUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" + API_KEY;
  const response = await fetch(topRatedMoviesUrl);
  const data = await response.json();
  console.log(data);
  const movies = _.first(data.results, 10); // _.first() är en funktion som hämtar första 10 filmerna från API:et med hjälp av underscore.js

  const movieContainer = document.querySelector(".movie");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-card");
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>Rating: ${movie.vote_average}</p>
      <p>${movie.release_date}</p>
    `;
    movieContainer.appendChild(movieElement);
  });
});
