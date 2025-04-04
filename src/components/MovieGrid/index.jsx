import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "../../services/api";

import MovieCard from "../MovieCard";
import "./index.css";
import Pagination from "../Pagination";

const MovieGrid = ({ category }) => {
  const { query } = useParams(); // Use React Router to get the search query
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      let fetchedData = { results: [], total_pages: 0 };

      if (category === "popular") {
        fetchedData = await getPopularMovies(currentPage);
      } else if (category === "top-rated") {
        fetchedData = await getTopRatedMovies(currentPage);
      } else if (category === "upcoming") {
        fetchedData = await getUpcomingMovies(currentPage);
      } else if (category === "search") {
        fetchedData = await searchMovies(query, currentPage); // Use the query from useParams
      }

      setMovies(fetchedData.results);
      setTotalPages(fetchedData.total_pages);
    };

    fetchMovies();
  }, [category, query, currentPage]);

  return (
    <div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MovieGrid;
