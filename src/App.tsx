import React from "react";
import { GameListPage } from "./components/game-list/GameListPage";
import { GamePage } from "./components/GamePage";
import { Router } from "@reach/router";
import { GlobalStyle } from "./components/GlobalStyle";
import { Normalize } from "styled-normalize";
import { PartnerGameListPage } from "./components/PartnerGameListPage";
import { SupplierGameListPage } from "./components/SupplierGameListPage";

const App: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Router>
        <GameListPage path="/" />
        <PartnerGameListPage path="/bbin" partner="bbin" />
        <PartnerGameListPage path="/casumo" partner="casumo" />
        <SupplierGameListPage path="/s/:supplier" />
        <GamePage path="/game/:gameId" />
      </Router>
    </>
  );
};

export default App;
