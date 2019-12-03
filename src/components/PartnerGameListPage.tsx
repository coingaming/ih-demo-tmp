import { RouteComponentProps } from "@reach/router";
import { useGames } from "./useGames";
import { Layout } from "./Layout";
import React from "react";
import { LinkableProductItem } from "./game-list/ProductItem";

type Props = { partner?: string } & RouteComponentProps;

export const PartnerGameListPage: React.FC<Props> = ({ partner }) => {
  const { games } = useGames(partner);

  return (
    <Layout>
      {games.map(gameProduct => (
        <LinkableProductItem
          key={gameProduct.product}
          gameProduct={gameProduct}
        />
      ))}
    </Layout>
  );
};
