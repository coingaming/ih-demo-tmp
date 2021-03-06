import { useState, useEffect } from "react";
import { Game, fixResponse } from "./game";
import { api } from "./api";

const filterGames = (
  list: Game[],
  filter: { category: string | null; query: string }
) =>
  list.filter(
    game =>
      (!filter.category || game.category === filter.category) &&
      game.name.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase())
  );

const groupByProduct = (list: Game[]) => {
  const byProduct: { [k: string]: Game[] } = {};
  list.forEach(game => {
    if (!byProduct[game.product]) {
      byProduct[game.product] = [];
    }
    byProduct[game.product] = [...byProduct[game.product], game];
  });

  return Object.entries(byProduct).map(([product, games]) => ({
    product,
    games
  }));
};

export const useGames = (partner?: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    api
      .get("/games", { params: { partner } })
      .then(res => res.data)
      .then(fixResponse)
      .then(setGames);
  }, [partner]);

  const categories = [...new Set(games.map(game => game.category))];

  return {
    games: groupByProduct(filterGames(games, { query, category })),
    categories,
    category,
    setCategory,
    query,
    setQuery
  };
};
