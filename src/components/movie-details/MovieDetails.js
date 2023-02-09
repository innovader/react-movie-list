import React from "react"
import styles from "./MovieDetails.module.css"

function MovieDetails({movie}) {
  return movie === "" ? (<div className={styles.empty}>No movie selected</div>) :
    (<div className={styles.details}>
      <h1>{movie.title}</h1>
      <p>{movie.opening_crawl}</p>
      <span className={styles.director}>Directed by: {movie.director}</span>
    </div>)
}

export default MovieDetails;
