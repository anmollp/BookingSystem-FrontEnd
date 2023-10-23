import React from 'react';

const MovieCard = ({ movieName, imageUrl, cardContent }) => (
  <>
    <h2>{movieName}</h2>
    <img src={imageUrl} alt={movieName} />
    {/* <p>{cardContent}</p> */}
  </>
);

export default MovieCard;
