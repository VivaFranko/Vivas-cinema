import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import BookingService from '../services/BookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const handleSeatsChange = (seats) => {
    setSelectedSeats(seats);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookingForm.name.trim()) newErrors.name = "Введіть ім'я";
    if (!bookingForm.phone.trim()) newErrors.phone = "Введіть телефон";
    if (!bookingForm.email.trim()) {
      newErrors.email = "Введіть емейл";
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.email)) {
      newErrors.email = "Невірний формат емейлу";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const bookingData = {
      user: bookingForm,
      seats: selectedSeats,
      timestamp: new Date().toISOString()
    };

    BookingService.saveBooking(movie.id, bookingData);
    toast.success("Бронювання успішно збережено!");
    setBookingForm({ name: "", phone: "", email: "" });
    setSelectedSeats([]);
    setFormVisible(false);
  };

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
        <Link to="/" className="back-button">← Повернутися до фільмів</Link>
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
        <CinemaHall movieId={movie.id} onSeatsChange={handleSeatsChange} />
        <div className="booking-summary">
          <h2>Вибір місць</h2>
          <p>Оберіть місця для бронювання</p>
          <p className="selected-seats">
            {selectedSeats.length > 0
              ? `Вибрані місця: ${selectedSeats.join(', ')}`
              : 'Місця не обрано'}
          </p>
          <button
            className="confirm-booking-btn"
            onClick={() => setFormVisible(true)}
            disabled={selectedSeats.length === 0}
          >
            Забронювати
          </button>
          {formVisible && (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ім'я</label>
                <input type="text" name="name" value={bookingForm.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input type="text" name="phone" value={bookingForm.phone} onChange={handleChange} />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Емейл</label>
                <input type="text" name="email" value={bookingForm.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <button type="submit" className="submit-btn">Підтвердити бронювання</button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Booking;
