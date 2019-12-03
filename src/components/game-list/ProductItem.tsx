import { Game } from "../game";
import { useState } from "react";
import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { slugify } from "../../utils";

const GameItem = styled(Link)`
  width: 208px;
  margin-bottom: 32px;
  text-decoration: none;
  color: initial;
  transition: opacity 0.2s linear;
  opacity: 1;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
  ${up("tablet")} {
    margin-right: 32px;
    margin-bottom: 64px;
  }
`;

const Image = styled.img`
  min-width: 208px;
  min-height: 156px;
  width: 208px;
  height: 156px;

  border-radius: 4px;
  object-fit: contain;
`;

const Placeholder = styled.div`
  min-width: 208px;
  min-height: 156px;
  width: 208px;
  height: 156px;

  box-sizing: border-box;
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
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

const ShowAll = styled.button`
  margin-right: 16px;

  padding: 16px;
  text-align: center;
  color: rgb(255, 130, 71);
  transition: opacity 0.2s linear;
  opacity: 1;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    opacity: 0.7;
  }
`;

const ShowAllLink = styled.a`
  margin-right: 16px;

  padding: 16px;
  text-align: center;
  color: rgb(255, 130, 71);
  transition: opacity 0.2s linear;
  opacity: 1;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
`;

const ProductGames = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductTitleWrap = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  font-size: 22px;
  line-height: 1.45;
  font-weight: bold;
  color: rgb(125, 131, 139);
`;

type ProductItemProps = {
  gameProduct: {
    product: string;
    games: Game[];
  };
};

const MAX_GAMES = 5;

export const CollapsableProductItem: React.FC<ProductItemProps> = ({
  gameProduct
}) => {
  const [showAll, setShowAll] = useState(false);

  let rightButton = null;

  if (gameProduct.games.length > MAX_GAMES) {
    rightButton = showAll ? (
      <ShowAll onClick={() => setShowAll(false)}>Hide</ShowAll>
    ) : (
      <ShowAll onClick={() => setShowAll(true)}>Show all</ShowAll>
    );
  }

  return (
    <div>
      <ProductHeader>
        <ProductTitleWrap>
          <ProductTitle>{gameProduct.product}</ProductTitle>
        </ProductTitleWrap>
        {rightButton}
      </ProductHeader>
      <ProductGames>
        {(showAll
          ? gameProduct.games
          : gameProduct.games.slice(0, MAX_GAMES)
        ).map(game => (
          <GameItem key={game.game_id} to={`/game/${game.game_id}`}>
            {game.url_thumb ? (
              <Image src={game.url_thumb} alt={`${game.name} logo`} />
            ) : (
              <Placeholder>{game.name}</Placeholder>
            )}

            <Title>{game.name}</Title>
          </GameItem>
        ))}
      </ProductGames>
    </div>
  );
};

export const LinkableProductItem: React.FC<ProductItemProps> = ({
  gameProduct
}) => {
  return (
    <div>
      <ProductHeader>
        <ProductTitleWrap>
          <ProductTitle>{gameProduct.product}</ProductTitle>
        </ProductTitleWrap>
        <ShowAllLink
          target="_blank"
          href={`/s/${slugify(gameProduct.product)}`}
        >
          Show all
        </ShowAllLink>
      </ProductHeader>
      <ProductGames>
        {gameProduct.games.slice(0, MAX_GAMES).map(game => (
          <GameItem key={game.game_id} to={`/game/${game.game_id}`}>
            {game.url_thumb ? (
              <Image src={game.url_thumb} alt={`${game.name} logo`} />
            ) : (
              <Placeholder>{game.name}</Placeholder>
            )}

            <Title>{game.name}</Title>
          </GameItem>
        ))}
      </ProductGames>
    </div>
  );
};

export const ProductItem: React.FC<ProductItemProps> = ({ gameProduct }) => {
  return (
    <div>
      <ProductHeader>
        <ProductTitleWrap>
          <ProductTitle>{gameProduct.product}</ProductTitle>
        </ProductTitleWrap>
      </ProductHeader>
      <ProductGames>
        {gameProduct.games.map(game => (
          <GameItem key={game.game_id} to={`/game/${game.game_id}`}>
            {game.url_thumb ? (
              <Image src={game.url_thumb} alt={`${game.name} logo`} />
            ) : (
              <Placeholder>{game.name}</Placeholder>
            )}

            <Title>{game.name}</Title>
          </GameItem>
        ))}
      </ProductGames>
    </div>
  );
};
