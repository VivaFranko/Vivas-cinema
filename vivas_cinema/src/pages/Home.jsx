import React from 'react';
import MovieList from '../components/MovieList';
import { movies } from '../data/movies';

const Home = () => {
  return (
    <main>
      <MovieList movies={movies} />
    </main>
  );
};

export default Home;
