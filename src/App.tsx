import React, { useState } from "react";
import "./App.css";
import axios from "axios";

type Game = {
  game_id: number;
  url_thumb: string;
  name: string;
};

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  axios.get("/games").then(res => setGames(res.data));

  return (
    <div className="App">
      {games.map(game => (
        <div key={game.game_id}>
          <img src={game.url_thumb} />
          {game.name}
        </div>
      ))}
    </div>
  );
};

export default App;
