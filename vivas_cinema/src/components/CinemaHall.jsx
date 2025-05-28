import React, { useState } from 'react';
import './CinemaHall.css';

const CinemaHall = ({ movieId, onSeatsChange }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Кількість рядів та місць у кожному ряді
  const rows = 8;
  const seatsPerRow = 12;

  // Симуляція заброньованих місць (пізніше їх можна завантажити з BookingService)
  const bookedSeats = ['1-5', '1-6', '3-8', '5-3', '5-4', '7-10'];

  const generateSeatId = (row, seat) => `${row}-${seat}`;

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    setSelectedSeats(prev => {
      const newSeats = prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId];
      // Повідомляємо батьківський компонент про зміну вибору
      if (onSeatsChange) onSeatsChange(newSeats);
      return newSeats;
    });
  };

  const getSeatClass = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'seat booked';
    if (selectedSeats.includes(seatId)) return 'seat selected';
    return 'seat available';
  };

  const renderSeats = () => {
    const seatRows = [];
    for (let row = 1; row <= rows; row++) {
      const seats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = generateSeatId(row, seat);
        seats.push(
          <div key={seatId} className={getSeatClass(seatId)} onClick={() => handleSeatClick(seatId)}>
            {seat}
          </div>
        );
      }
      seatRows.push(
        <div key={row} className="seat-row">
          <div className="row-number">{row}</div>
          <div className="seats">{seats}</div>
        </div>
      );
    }
    return seatRows;
  };

  return (
    <div className="cinema-hall">
      <div className="screen">
        <div className="screen-text">ЕКРАН</div>
      </div>
      <div className="seats-container">{renderSeats()}</div>
      <div className="legend">
        <div className="legend-item">
          <div className="seat available small"></div>
          <span>Вільні</span>
        </div>
        <div className="legend-item">
          <div className="seat selected small"></div>
          <span>Вибрані</span>
        </div>
        <div className="legend-item">
          <div className="seat booked small"></div>
          <span>Заброньовані</span>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;
