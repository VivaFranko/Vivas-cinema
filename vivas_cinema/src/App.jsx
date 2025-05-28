import React from 'react';
import MovieList from './components/MovieList';
import { movies } from './data/movies';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
        </div>
        <nav className="header-nav">
          <button className="nav-button">Головна</button>
          <button className="nav-button">Популярні</button>
          <button className="nav-button">Новинки</button>
          <button className="nav-button">Про нас</button>
        </nav>
      </header>
      <main>
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

export default App;
