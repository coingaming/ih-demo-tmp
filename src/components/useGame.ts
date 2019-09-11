import { useState, useEffect } from "react";
import { Game, fixResponse } from "./game";
import { api } from "./api";

export const useGame = (gameId: number): [Game | null] => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    api
      .get("/games")
      .then(res => res.data)
      .then(fixResponse)
      .then(games => games.find(game => game.game_id === gameId))
      .then(game => setGame(game ? game : null));
  }, [gameId]);

  return [game];
};
