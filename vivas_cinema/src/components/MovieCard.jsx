import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-details">
          <span className="showtime">{movie.showtime}</span>
          <span className="duration">{movie.duration}</span>
        </div>
        <div className="movie-actions">
          <button className="like-button" onClick={handleLike}>
            👍 {likes}
          </button>
          <button className="dislike-button" onClick={handleDislike}>
            👎 {dislikes}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
