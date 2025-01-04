import { API_KEY } from "./rated.js";
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
const personCard = document.querySelector(".personCard");
const moviesCard = document.querySelector(".movieCard");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.toLowerCase();
  const tvUrl =
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`;
  const movieUrl =
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  const personUrl =
    `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`;

  personCard.innerHTML = "";
  moviesCard.innerHTML = "";

  try {
    const personResponse = await fetch(personUrl);
    const personData = await personResponse.json();
    const persons = personData.results;

    const matchedPerson = persons.find((person) =>
      person.name.toLowerCase() === query
    );

    if (matchedPerson) {
      const personElement = document.createElement("div");
      personElement.classList.add("person-card");
      personElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${matchedPerson.profile_path}" alt="${matchedPerson.name}">
        <h2>${matchedPerson.name.toUpperCase()}</h2>
        <p>${matchedPerson.known_for_department.toUpperCase()}</p>
        <h3>Known For:</h3>
        <ul>
          ${
        matchedPerson.known_for.slice(0, 4).map((work) => `
            <li>${(work.title ||
          work.name)} (${work.media_type.toUpperCase()})</li>
          `).join("")
      }
        </ul>
      `;
      personCard.appendChild(personElement);
    } else {
      const tvResponse = await fetch(tvUrl);
      const tvData = await tvResponse.json();
      const series = tvData.results;

      if (series.length > 0) {
        series.forEach((tv) => {
          const tvElement = document.createElement("div");
          tvElement.classList.add("movie-card");
          tvElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}">
            <h2>${tv.name}</h2>
            <p>Rating: ${tv.vote_average}</p>
            <p>${tv.first_air_date}</p>
          `;
          moviesCard.appendChild(tvElement);
        });
      } else {
        const movieResponse = await fetch(movieUrl);
        const movieData = await movieResponse.json();
        const movies = movieData.results;

        if (movies.length > 0) {
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
        } else {
          alert("No results found for your search.");
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again later.");
  }
});
