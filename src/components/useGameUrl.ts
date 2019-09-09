import axios from "axios";
import { useState, useEffect } from "react";

export const useGameUrl = (gameId: number): [string] => {
  const [gameUrl, setGameUrl] = useState<string>("");

  useEffect(() => {
    axios.get(`/api/game_url/${gameId}`).then(res => setGameUrl(res.data.url));
  }, [gameId]);

  return [gameUrl];
};
