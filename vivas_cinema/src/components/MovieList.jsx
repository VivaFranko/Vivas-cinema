import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  // Спочатку застосовуємо пошук за назвою
  let filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Застосовуємо фільтр за лайками
  filteredMovies = filteredMovies.filter(movie => {
    const likes = Number(movie.likes) || 0;
    if (filterOption === 'popular') {
      return likes > 50; // популярні: більше 50 лайків
    } else if (filterOption === 'unpopular') {
      return likes <= 50; // не популярні: 50 або менше лайків
    }
    return true;
  });

  // Застосовуємо сортування (за назвою чи часом показу)
  if (sortOption === 'titleAsc') {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'titleDesc') {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption === 'showtimeAsc') {
    filteredMovies.sort((a, b) => a.showtime.localeCompare(b.showtime));
  }

  return (
    <div className="movie-list-container">
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Пошук фільмів..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-sort-container">
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="filter-select"
          >
            <option value="all">Всі реакції</option>
            <option value="popular">Популярні (лайки &gt; 50)</option>
            <option value="unpopular">Не популярні (лайки ≤ 50)</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="">Сортування</option>
            <option value="titleAsc">За назвою (А-Z)</option>
            <option value="titleDesc">За назвою (Z-A)</option>
            <option value="showtimeAsc">За часом показу</option>
          </select>
        </div>
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
    </div>
  );
};

export default MovieList;
