import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="booking-page">
        <div className="error-message">
          <h2>Фільм не знайдено</h2>
          <Link to="/" className="back-link">Повернутися до списку фільмів</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <header className="booking-header">
        <Link to="/" className="back-button">← Повернутися</Link>
        <div className="movie-info">
          <img src={movie.poster} alt={movie.title} className="movie-poster-thumb" />
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.genre} • {movie.duration}</p>
            <p className="showtime">Сеанс: {movie.showtime}</p>
          </div>
        </div>
      </header>
      <div className="booking-container">
        <CinemaHall movieId={movie.id} />
        <div className="booking-summary">
          <h2>Вибір місць</h2>
          <p>Оберіть зручні місця для перегляду.</p>
          <button className="confirm-booking-btn">Підтвердити бронювання</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
