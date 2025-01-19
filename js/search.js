import { API_KEY } from "./rated.js";
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const resultCard = document.querySelector(".resultCard");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting normally
  const query = searchInput.value.toLowerCase();
  const movieUrl =
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  const personUrl =
    `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`;
  resultCard.innerHTML = "";

  try {
    const [personResponse, movieResponse] = await Promise.all([
      fetch(personUrl),
      fetch(movieUrl),
    ]);

    const personData = await personResponse.json();
    const movieData = await movieResponse.json();

    const persons = personData.results;
    const movies = movieData.results;

    const combinedResults = [...persons, ...movies];

    if (combinedResults.length > 0) {
      combinedResults
        .filter((result) => result.profile_path || result.poster_path) // Filter out results without images
        .forEach((result) => {
          const resultElement = document.createElement("div");
          resultElement.classList.add("result-card");

          const imgElement = document.createElement("img");
          imgElement.src = `https://image.tmdb.org/t/p/w500${
            result.profile_path || result.poster_path
          }`;
          imgElement.alt = result.name || result.title;
          resultElement.appendChild(imgElement);

            resultElement.innerHTML += `
            <h2>${(result.name || result.title).toUpperCase()}</h2>
            <p>${
            result.known_for_department
              ? result.known_for_department.toUpperCase()
              : `Rating: ${Math.floor(result.vote_average * 10) / 10}`
            }</p>
            <p>${result.release_date || ""}</p>
            <p>${result.overview || ""}</p>
            `;

          if (result.known_for) {
            resultElement.innerHTML += `
              <h3>Known For:</h3>
              <ul>
              ${
              _.chain(result.known_for)
                .first(4)
                .map((work) => `
                <li>${(work.title ||
                  work.name)} (${work.media_type.toUpperCase()})</li>
                `)
                .join("")
                .value()
            }
              </ul>
            `;
          }

          resultCard.appendChild(resultElement);
        });
    } else {
      alert("No results found for your search.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again later.");
  }
});
