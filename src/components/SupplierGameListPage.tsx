import { RouteComponentProps } from "@reach/router";
import { useGames } from "./useGames";
import { Layout } from "./Layout";
import React from "react";
import { ProductItem } from "./game-list/ProductItem";
import { slugify } from "../utils";

type Props = { supplier?: string } & RouteComponentProps;

export const SupplierGameListPage: React.FC<Props> = ({ supplier }) => {
  const { games } = useGames();

  const filtered = games.filter(game => slugify(game.product) === supplier);

  return (
    <Layout>
      {filtered.map(gameProduct => (
        <ProductItem key={gameProduct.product} gameProduct={gameProduct} />
      ))}
    </Layout>
  );
};
