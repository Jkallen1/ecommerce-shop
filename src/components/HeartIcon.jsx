import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavouritesContext';

const HeartIcon = ({ productId }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const handleFavoriteToggle = () => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const icon = isFavorite(productId) ? '❤️' : '🤍';

  return <div onClick={handleFavoriteToggle}>{icon}</div>;
};

export default HeartIcon;