import React from "react";
import { useGameUrl } from "./useGameUrl";
import { RouteComponentProps } from "@reach/router";

type Props = RouteComponentProps & {
  gameId?: string;
};

export const GamePage: React.FC<Props> = ({ gameId }) => {
  const [gameUrl] = useGameUrl(Number(gameId));

  return (
    <div className="App">
      <iframe src={gameUrl} title="game" />
    </div>
  );
};
