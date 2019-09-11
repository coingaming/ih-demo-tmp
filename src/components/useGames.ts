import { useState, useEffect } from "react";
import { Game, fixResponse } from "./game";
import { api } from "./api";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    api
      .get("/games")
      .then(res => res.data)
      .then(fixResponse)
      .then(setGames);
  }, []);

  const categories = [...new Set(games.map(game => game.category))];

  return {
    games: games.filter(
      game =>
        (!category || game.category === category) &&
        game.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ),
    categories,
    category,
    setCategory,
    query,
    setQuery
  };
};
