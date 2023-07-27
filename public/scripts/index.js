// public/scripts/index.js

function searchMovies() {
  const searchQuery = document.getElementById("searchInput").value;
  const apiUrl = `/search-movies?q=${encodeURIComponent(searchQuery)}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const resultsDiv = document.getElementById("searchResults");
      resultsDiv.innerHTML = ""; // Clear previous results

      if (data.length > 0) {
        data.forEach((movie) => {
          const movieDiv = document.createElement("div");
          movieDiv.className = "movie-item";
          movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <div>
              <h3>${movie.Title}</h3>
              <p>Year: ${movie.Year}</p>
              <p>IMDb Rating: ${movie.imdbRating}</p>
            </div>
          `;
          resultsDiv.appendChild(movieDiv);
        });
      } else {
        resultsDiv.innerHTML = "<p>No movies found.</p>";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
