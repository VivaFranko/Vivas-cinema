import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="movie-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Пошук фільмів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="no-movies">
            <p>Фільми не знайдені</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieList;
