import React from "react";
import { useGames } from "./useGames";
import { RouteComponentProps, Link } from "@reach/router";
import styled from "styled-components";
import { Layout } from "./Layout";

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameItem = styled(Link)`
  margin-right: 16px;
  margin-bottom: 32px;
  text-decoration: none;
  color: initial;
  transition: opacity 0.2s linear;
  opacity: 1;
  &:hover {
    opacity: 0.7;
  }
`;

const WrapperImage = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 8px 2px rgba(204, 204, 204, 0.51);
`;

const Image = styled.img`
  width: 345px;
  height: 300px;
  border-radius: 4px;
`;

const Placeholder = styled.div`
  width: 345px;
  height: 300px;
  color: #7e8389;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 16px 0 8px;
`;

const Subtitle = styled.div`
  color: #7e8389;
`;

export const GameListPage: React.FC<RouteComponentProps> = () => {
  const [games] = useGames();

  return (
    <Layout>
      <List>
        {games.map(game => (
          <GameItem key={game.game_id} to={`/game/${game.game_id}`}>
            <WrapperImage>
              {game.url_thumb ? (
                <Image src={game.url_thumb} alt={`${game.name} logo`} />
              ) : (
                <Placeholder>{game.name}</Placeholder>
              )}
            </WrapperImage>
            <Title>{game.name}</Title>
            <Subtitle>{game.product}</Subtitle>
          </GameItem>
        ))}
      </List>
    </Layout>
  );
};
