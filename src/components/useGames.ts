import axios from "axios";
import { useState, useEffect } from "react";

type Game = {
  game_id: number;
  url_thumb: string;
  name: string;
};

export const useGames = (): [Game[]] => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get("/games").then(res => setGames(res.data));
  }, []);

  return [games];
};
