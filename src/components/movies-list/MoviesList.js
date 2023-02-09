import React from "react";
import styles from "./MoviesList.module.css";

const latinNumbers = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

function MoviesList({ data, passMovieDetails }) {
  const getEpisode = function (num) {
    return `EPISODE ${num}`;
  };

  const getTitle = function (movie) {
    const latinNum = latinNumbers[movie.episode_id];
    return `${getEpisode(latinNum)} - ${movie.title}`;
  };

  const handleClick = function (movie) {
    passMovieDetails(movie);
  };

  return (
    <ul className={styles.list}>
      {data.map((movie) => {
        return (
          <li
            key={movie.episode_id}
            className={styles.item}
            onClick={() => handleClick(movie)}
          >
            <span className={styles.episode}>{getEpisode(movie.episode_id)}</span>
            <span>{getTitle(movie)}</span>
            <span>{movie.release_date}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesList;
