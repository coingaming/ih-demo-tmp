import React from "react";
import { useGames } from "./useGames";
import { RouteComponentProps, Link } from "@reach/router";

export const GameListPage: React.FC<RouteComponentProps> = () => {
  const [games] = useGames();

  return (
    <div className="App">
      {games.map(game => (
        <Link key={game.game_id} to={`/game/${game.game_id}`}>
          <img src={game.url_thumb} alt={`${game.name} logo`} />
          {game.name}
        </Link>
      ))}
    </div>
  );
};
