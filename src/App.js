import React, { useEffect, useState } from "react";

import CardList from "./components/CardList";
import SearchBar from "./components/SearchBar";

import MovieSource from "./api/MovieSource";
import useHttp from "./hooks/use-http";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const { sendRequest: fetchMovies, isLoading, error } = useHttp();

  useEffect(() => {
    const requestConfigObject = {
      url: `https://www.omdbapi.com/?apiKey=1183718b&s=${movieTitle}`,
    };
    fetchMovies(requestConfigObject, (returnedMovies) =>
      setMovies(returnedMovies.Search)
    );
  }, [fetchMovies, movieTitle]);

  const onSearch = (enteredMovieTitle) => {
    setMovieTitle(enteredMovieTitle);
  };

  return (
    <div className="App">
      <div className="container searchApp">
        <h2 className="title is-2 has-text-centered">Sandbox search</h2>
        <SearchBar onSearch={onSearch} />
        <CardList movies={movies} />
      </div>
    </div>
  );
}

export default App;
