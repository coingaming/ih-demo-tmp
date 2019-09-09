import axios from "axios";
import { useState, useEffect } from "react";

type Game = {
  game_id: number;
  url_thumb: string | null;
  name: string;
  product: string;
  category: string;
};

const fixResponse = (data: Game[]) =>
  data.map(item => ({
    ...item,
    url_thumb: item.url_thumb === "null" ? null : item.url_thumb
  }));

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
