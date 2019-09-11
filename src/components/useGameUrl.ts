import { useState, useEffect } from "react";
import { api } from "./api";

type Params = {
  lang: string;
};

export const useGameUrl = (gameId: number, params: Params): [string] => {
  const [gameUrl, setGameUrl] = useState<string>("");

  useEffect(() => {
    api
      .get(`/game_url/${gameId}`, { params })
      .then(res => setGameUrl(res.data.url));
  }, [gameId, params]);

  return [gameUrl];
};
