import { API_KEY } from "./rated.js";

document.addEventListener("DOMContentLoaded", async () => {
  const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;
  const response = await fetch(popularMoviesUrl);
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
      <p>Rating: ${Math.floor(movie.vote_average * 10) / 10}</p>
      <p>${movie.release_date}</p>
    `;
    movieContainer.appendChild(movieElement);
  });
});
