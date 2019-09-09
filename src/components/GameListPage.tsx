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
  margin-right: 32px;
  margin-bottom: 64px;
  text-decoration: none;
  color: initial;
  transition: opacity 0.2s linear;
  opacity: 1;
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 8px 2px rgba(204, 204, 204, 0.51);
  &:hover {
    opacity: 0.7;
  }
`;

const Image = styled.img`
  min-width: 345px;
  min-height: 300px;
  width: 345px;
  height: 300px;
  border-radius: 4px;
  object-fit: cover;
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

type FilterButtonProps = {
  active: boolean;
};

const Filters = styled.nav`
  display: flex;
  margin-left: 32px;
`;

const FilterItemButton = styled.button<FilterButtonProps>`
  border-radius: 18px;
  padding: 8px 16px;
  border: none;
  background-color: #fff;
  outline: none;
  color: ${({ active }) => (active ? "#ed8858" : "#7e8389")};
  font-weight: 500;
  margin-right: 16px;
  cursor: pointer;
`;

type FilterItemProps = {
  active: boolean;
  onClick: () => void;
};

const FilterItem: React.FC<FilterItemProps> = ({
  children,
  active,
  onClick
}) => (
  <div>
    <FilterItemButton active={active} onClick={onClick}>
      {children}
    </FilterItemButton>
  </div>
);

export const GameListPage: React.FC<RouteComponentProps> = () => {
  const {
    games,
    categories,
    category: activeCategory,
    setCategory
  } = useGames();

  return (
    <Layout
      filterPocket={
        <Filters>
          <FilterItem
            active={activeCategory === null}
            onClick={() => setCategory(null)}
          >
            Casino Lobby
          </FilterItem>
          {categories.map(category => (
            <FilterItem
              key={category}
              active={activeCategory === category}
              onClick={() => setCategory(category)}
            >
              {category}
            </FilterItem>
          ))}
        </Filters>
      }
    >
      <List>
        {games.map(game => (
          <GameItem key={game.game_id} to={`/game/${game.game_id}`}>
            {game.url_thumb ? (
              <Image src={game.url_thumb} alt={`${game.name} logo`} />
            ) : (
              <Placeholder>{game.name}</Placeholder>
            )}

            <Title>{game.name}</Title>
            <Subtitle>{game.product}</Subtitle>
          </GameItem>
        ))}
      </List>
    </Layout>
  );
};
