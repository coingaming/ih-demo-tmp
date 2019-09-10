import axios from "axios";
import { useState, useEffect } from "react";

type Params = {
  lang: string;
};

export const useGameUrl = (gameId: number, params: Params): [string] => {
  const [gameUrl, setGameUrl] = useState<string>("");

  useEffect(() => {
    axios
      .get(`/api/game_url/${gameId}`, { params })
      .then(res => setGameUrl(res.data.url));
  }, [gameId, params]);

  return [gameUrl];
};
