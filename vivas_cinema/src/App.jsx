import React from 'react';
import MovieList from './components/MovieList';
import { movies } from './data/movies';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 CinemaBooking</h1>
        <p>Оберіть фільм та забронюйте квитки</p>
      </header>
      <main>
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

export default App;