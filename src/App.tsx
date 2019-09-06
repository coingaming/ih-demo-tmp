import React from "react";
import "./App.css";
import { GameListPage } from "./components/GameListPage";
import { GamePage } from "./components/GamePage";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <Router>
      <GameListPage path="/" />
      <GamePage path="/game/:gameId" />
    </Router>
  );
};

export default App;
