const API_KEY = "744baf66a0b8b385b30b023362d286aa";
const BASE_URL = "https://api.themoviedb.org/3";

// Updated fetchMovies to handle pagination dynamically
const fetchMovies = (url, params = {}) =>
  fetch(
    `${BASE_URL}${url}?api_key=${API_KEY}&language=en-US&${new URLSearchParams(
      params
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return { results: [], total_pages: 0 };
    });

// Get Popular Movies (Accepting page parameter)
export const getPopularMovies = (page = 1) =>
  fetchMovies("/movie/popular", { page });

// Get Top Rated Movies (Accepting page parameter)
export const getTopRatedMovies = (page = 1) =>
  fetchMovies("/movie/top_rated", { page });

// Get Upcoming Movies (Accepting page parameter)
export const getUpcomingMovies = (page = 1) =>
  fetchMovies("/movie/upcoming", { page });

// Get Single Movie Details
export const getMovieDetails = (movieId) => {
  const url = `/movie/${movieId}`;
  const queryString = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
  }).toString();
  return fetch(`${BASE_URL}${url}?${queryString}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      return null;
    });
};

// Get Movie Cast
export const getMovieCast = (movieId) => {
  const url = `/movie/${movieId}/credits`;
  const queryString = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
  }).toString();
  return fetch(`${BASE_URL}${url}?${queryString}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.cast)
    .catch((error) => {
      console.error("Error fetching movie cast:", error);
      return [];
    });
};

// Search Movies (Accepting query and page parameter)
export const searchMovies = (query, page = 1) =>
  fetchMovies(`/search/movie`, { query, page });
