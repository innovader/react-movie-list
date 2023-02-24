import React, { useEffect, useState } from "react";
import MovieDetails from "../../components/movie-details/MovieDetails";
import MoviesList from "../../components/movies-list/MoviesList";
import SearchBar from "../../components/search-bar/SearchBar";
import styles from "./MoviesView.module.css";

function MoviesView() {
  const [movies, setMovies] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState("episode_id");
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const handleSorting = (data, sortField, sortOrder = "asc") => {
    if (sortField) {
      const sorted = data.sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setMovies(sorted);
      return sorted;
    }
  };

  const searchList = (searchBy) => setSearchValue(searchBy);

  const getMovieDetails = movie => setSelectedMovie(movie);
  
  useEffect(() => {
    const url = "https://swapi.dev/api/films";
    const filterList = (data, value) => {
      const filteredMovies = data.filter(
        (movie) =>
          movie.episode_id.toString().includes(value.toLowerCase()) ||
          movie.title.toLowerCase().includes(value.toLowerCase()) ||
          movie.release_date.toLowerCase().includes(value.toLowerCase())
      );
      return setMovies(filteredMovies);
    };
    
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("movies could not be fetched");
        return res.json();
      })
      .then((data) => handleSorting(data?.results, selectedSorting))
      .then((sortedData) => filterList(sortedData, searchValue))
      .catch((err) => console.error(err.message));
  }, [selectedSorting, searchValue]);

  return (
    <div>
      <div className={styles.filters}>
        <label>
          <span className={styles.sortingText}>Sort by:</span>
          <select
            value={selectedSorting}
            onChange={(e) => setSelectedSorting(e.target.value)}
          >
            <option value="episode_id">Episode</option>
            <option value="release_date">Year</option>
          </select>
        </label>
        <SearchBar searchList={searchList} />
      </div>

      <div className={styles.movies}>
        <MoviesList data={movies} passMovieDetails={getMovieDetails}/>
        <MovieDetails movie={selectedMovie} />
      </div>
    </div>
  );
}

export default MoviesView;
