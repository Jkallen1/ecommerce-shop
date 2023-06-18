import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavouritesContext';

const FavouritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favourites</h1>
      {favorites.length === 0 ? (
        <p>No favourites selected</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite}>
              <span>{favorite}</span>
              <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPage;