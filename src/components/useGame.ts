import axios from "axios";
import { useState, useEffect } from "react";
import { Game, fixResponse } from "./game";

export const useGame = (gameId: number): [Game | null] => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    axios
      .get("/api/games")
      .then(res => res.data)
      .then(fixResponse)
      .then(games => games.find(game => game.game_id === gameId))
      .then(game => setGame(game ? game : null));
  }, [gameId]);

  return [game];
};
