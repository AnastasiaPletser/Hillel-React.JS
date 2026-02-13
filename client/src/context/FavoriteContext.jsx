import React, { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  

  const toggleFavorite = (item) => {
    setFavoriteItems(prev => {
      const exists = prev.find(fav => fav.id === item.id);

      if (exists) {
        return prev.filter(fav => fav.id !== item.id);
      }

      return [...prev, item];
    });
  };

  const removeFromFavorite = (id) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id) => {
    return favoriteItems.some(item => item.id === id);
  };

  const clearFavorite = () => {
    setFavoriteItems([]);
  };


  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        toggleFavorite,
        removeFromFavorite,
        isFavorite,
        clearFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
