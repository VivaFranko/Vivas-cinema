import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="modern-movie-card">
      <div className="poster-wrapper">
        <img src={movie.poster} alt={movie.title} className="movie-poster" loading="lazy" />
        <div className="overlay">
          <h2 className="movie-title">{movie.title}</h2>
        </div>
      </div>
      <div className="movie-details">
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        <div className="info-bar">
          <span className="showtime">{movie.showtime}</span>
          <span className="duration">{movie.duration}</span>
        </div>
        <button className="booking-btn" onClick={handleBooking}>
          Купити квиток
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
