import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '99eb9fd1';
const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!query) {
      return;
    }

    try {
      const response = await axios.get(`${OMDB_API_URL}${query}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError('');
      } else {
        setMovies([]);
        setError('Invalid movie name. Please try again.');
      }
    } catch (error) {
      setMovies([]);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="movie-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul className="movie-results">
        {movies.length === 0 && !error ? (
          <li>No movies found.</li>
        ) : (
          movies.map((movie) => (
            <li key={movie.imdbID} className="movie-card">
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MovieSearch;
