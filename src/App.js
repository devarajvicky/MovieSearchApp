import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./Components/MovieCard/MovieCard";
import { FaSearch } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import "./App.css";
// import Loader from "react-loader-spinner"; // Import the loader

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Validtion Check

  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("Search query cannot be empty");
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setMovies(response.data.docs);
      setQuery("");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2 className="heading">Movie Search</h2>
      <div className="input-container">
        <div className="input">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="button" onClick={handleSearch}>
            <FaSearch aria-label="search-icon" />
          </button>
        </div>
      </div>
      {/*Loading and Error View */}
      {loading && (
        <div className="loading-container">
          <TailSpin
            visible={true}
            height="50"
            width="50"
            color="blue"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {/* Spinner */}
      {error && (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="connection-Error-img"
          />
          <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
          <p className="failure-view-description">
            We cannot seem to find the page you are looking for.
          </p>
        </div>
      )}
      {/* suucess and No jobs View */}
      <div className="movies-list-container">
        {movies.length > 0 ? (
          movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="no-jobs-heading">No Movies Found</h1>
            <p className="no-jobs-description">We could not find any Movies.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
