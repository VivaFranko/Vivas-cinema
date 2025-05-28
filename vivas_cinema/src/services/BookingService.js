const BOOKING_STORAGE_KEY = 'bookings';

const BookingService = {
  // Отримання бронювань для заданого movieId
  getBookingsForMovie(movieId) {
    const data = localStorage.getItem(BOOKING_STORAGE_KEY);
    if (!data) return [];
    const bookings = JSON.parse(data);
    return bookings[movieId] || [];
  },

  // Збереження бронювання для movieId
  saveBooking(movieId, bookingData) {
    const data = localStorage.getItem(BOOKING_STORAGE_KEY);
    let bookings = data ? JSON.parse(data) : {};
    const movieBookings = bookings[movieId] || [];
    movieBookings.push(bookingData);
    bookings[movieId] = movieBookings;
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
    return true;
  }
};

export default BookingService;
