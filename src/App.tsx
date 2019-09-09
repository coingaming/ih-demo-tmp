import React from "react";
import { GameListPage } from "./components/GameListPage";
import { GamePage } from "./components/GamePage";
import { Router } from "@reach/router";
import { GlobalStyle } from "./components/GlobalStyle";
import { Normalize } from "styled-normalize";
import { GamesProvider } from "./components/GamesContext";

const App: React.FC = () => {
  return (
    <GamesProvider>
      <Normalize />
      <GlobalStyle />
      <Router>
        <GameListPage path="/" />
        <GamePage path="/game/:gameId" />
      </Router>
    </GamesProvider>
  );
};

export default App;
