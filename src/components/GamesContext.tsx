import React from "react";
import { useGames } from "./useGames";

type ContextType = ReturnType<typeof useGames>;

const GamesContext = React.createContext<ContextType | undefined>(undefined);

export const useGamesContext = () => {
  const context = React.useContext(GamesContext);
  if (!context) {
    throw new Error(`useGames must be used within a GamesProvider`);
  }
  return context;
};

export const GamesProvider: React.FC = props => {
  const value = useGames();

  return <GamesContext.Provider value={value} {...props} />;
};
