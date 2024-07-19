import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [dogImage, setDogImage] = useState("");

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setDogImage(response.data.message);
      } catch (error) {
        console.error("Error fetching dog image:", error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <div className="card">
      <img src={dogImage} alt="Dog" />
      <p>
        <b>Title :</b> {movie.title}
      </p>
      <p>
        <b>Author Name :</b> {movie.author_name[0]}
      </p>
      <p>
        {movie.author_name ? movie.author_name.join(", ") : "Unknown author"}
      </p>
    </div>
  );
}

export default MovieCard;
