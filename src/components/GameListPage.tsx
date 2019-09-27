import React, { useState, useRef } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import styled from "styled-components";
import { Layout } from "./Layout";
import { up } from "styled-breakpoints";
import { ReactComponent as SearchIcon } from "./SearchIcon.svg";
import { ReactComponent as CrossIcon } from "./CrossIcon.svg";
import useOnClickOutside from "use-onclickoutside";
import { useGamesContext } from "./GamesContext";
import { Game } from "./game";

const GameItem = styled(Link)`
  width: 250px;
  margin-bottom: 32px;
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
  ${up("tablet")} {
    margin-right: 32px;
    margin-bottom: 64px;
  }
`;

const Image = styled.img`
  min-width: 250px;
  min-height: 215px;
  width: 250px;
  height: 215px;

  border-radius: 4px;
  object-fit: cover;
`;

const Placeholder = styled.div`
  min-width: 250px;
  min-height: 215px;
  width: 250px;
  height: 215px;

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

type FilterButtonProps = {
  active: boolean;
};

const Filters = styled.nav`
  display: flex;
  flex-wrap: wrap;
`;

const FilterItemButton = styled.button<FilterButtonProps>`
  border-radius: 18px;
  padding-right: 16px;
  padding-left: 16px;
  height: 40px;
  border: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-radius: 50px;
  background-color: #fff;
  outline: none;
  color: ${({ active }) =>
    active ? "rgb(255, 130, 71)" : "rgb(125, 131, 139)"};
  font-size: 14px;
  font-weight: 600;
  margin-right: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    color: rgb(255, 130, 71);
  }
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

type SearchFormWrapProps = {
  isExpanded: boolean;
};

const SearchFormWrap = styled.form<SearchFormWrapProps>`
  background: rgb(255, 255, 255);
  border-radius: 50px;
  will-change: width;
  transition: width 500ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  overflow: hidden;
  margin-right: 32px;
  width: ${({ isExpanded }) => (isExpanded ? 290 : 40)}px;
  display: flex;
  height: 40px;
  margin-bottom: 16px;
  ${up("tablet")} {
    margin-bottom: 0;
    margin-left: 32px;
  }
`;

const SearchInput = styled.input`
  height: 40px;
  border: none;
  outline: none;
  padding: 0 8px;
  flex: 1;
  min-width: 195px;
`;

const ToggleSearch = styled.button`
  background: none;
  outline: none;
  border: none;
  min-width: 40px;
  min-height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;

  color: rgb(169, 173, 178);
  &:hover {
    color: rgb(255, 130, 71);
  }
`;

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ value, onChange }) => {
  const [isShow, setShow] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShow(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <SearchFormWrap onSubmit={handleSubmit} isExpanded={isShow} ref={ref}>
      <ToggleSearch
        onClick={e => {
          setShow(!isShow);
        }}
      >
        <SearchIcon width="18px" height="18px" />
      </ToggleSearch>
      {isShow && (
        <>
          <SearchInput
            autoFocus
            placeholder="Search games"
            value={value}
            onChange={e => {
              const { value } = e.currentTarget;
              onChange(value);
            }}
          />
          {value ? (
            <ToggleSearch
              onClick={e => {
                onChange("");
              }}
            >
              <CrossIcon width="14px" height="14px" />
            </ToggleSearch>
          ) : null}
        </>
      )}
    </SearchFormWrap>
  );
};

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

const MAX_GAMES = 4;

const ProductItem: React.FC<ProductItemProps> = ({ gameProduct }) => {
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

export const GameListPage: React.FC<RouteComponentProps> = () => {
  const {
    games,
    categories,
    category: activeCategory,
    setCategory,
    query,
    setQuery
  } = useGamesContext();

  return (
    <Layout filterPocket={<SearchForm onChange={setQuery} value={query} />}>
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

      {games.map(gameProduct => (
        <ProductItem key={gameProduct.product} gameProduct={gameProduct} />
      ))}
    </Layout>
  );
};
