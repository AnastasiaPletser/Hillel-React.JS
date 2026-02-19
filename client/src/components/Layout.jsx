import { useState } from "react";
import Header from "../pages/Header/Header";
import FavoriteSidebar from "./Favorite/FavoriteSidebar/FavoriteSidebar";

export default function Layout({ children }) {
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);

  const toggleFavorite = () => setIsFavoriteOpen(prev => !prev);
  const closeFavorite = () => setIsFavoriteOpen(false);

  return (
    <>
      <Header openFavorite={toggleFavorite} />

      <main>
        {children}
      </main>

      <FavoriteSidebar
        isOpen={isFavoriteOpen}
        onClose={closeFavorite}
      />
    </>
  );
}
