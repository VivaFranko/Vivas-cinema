import React, { useState } from 'react';
import './CinemaHall.css';

const CinemaHall = ({ movieId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Генеруємо зал 8x12 (8 рядів по 12 місць)
  const rows = 8;
  const seatsPerRow = 12;
  
  // Симуляція заброньованих місць
  const bookedSeats = ['1-5', '1-6', '3-8', '5-3', '5-4', '7-10'];

  const generateSeatId = (row, seat) => `${row}-${seat}`;

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
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
          <div
            key={seatId}
            className={getSeatClass(seatId)}
            onClick={() => handleSeatClick(seatId)}
          >
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
      
      <div className="seats-container">
        {renderSeats()}
      </div>
      
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
      
      {selectedSeats.length > 0 && (
        <div className="selected-info">
          <h3>Вибрані місця: {selectedSeats.join(', ')}</h3>
          <p>Кількість квитків: {selectedSeats.length}</p>
          <p>Загальна вартість: {selectedSeats.length * 150} грн</p>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;
