import React from "react";
import { GameListPage } from "./components/GameListPage";
import { GamePage } from "./components/GamePage";
import { Router } from "@reach/router";
import { GlobalStyle } from "./components/GlobalStyle";
import { Normalize } from "styled-normalize";

const App: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Router>
        <GameListPage path="/" />
        <GamePage path="/game/:gameId" />
      </Router>
    </>
  );
};

export default App;
