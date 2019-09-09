import axios from "axios";
import { useState, useEffect } from "react";
import { Game, fixResponse } from "./game";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/games")
      .then(res => res.data)
      .then(fixResponse)
      .then(setGames);
  }, []);

  const categories = [...new Set(games.map(game => game.category))];

  return {
    games: category ? games.filter(game => game.category === category) : games,
    categories,
    category,
    setCategory
  };
};
