import React, { useState, useRef } from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";
import { Layout } from "../Layout";
import { up } from "styled-breakpoints";
import { ReactComponent as SearchIcon } from "../SearchIcon.svg";
import { ReactComponent as CrossIcon } from "../CrossIcon.svg";
import useOnClickOutside from "use-onclickoutside";
import { useGames } from "../useGames";
import { CollapsableProductItem } from "./ProductItem";

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

type Props = RouteComponentProps;

export const GameListPage: React.FC<Props> = () => {
  const { games, query, setQuery } = useGames();

  return (
    <Layout filterPocket={<SearchForm onChange={setQuery} value={query} />}>
      {games.map(gameProduct => (
        <CollapsableProductItem
          key={gameProduct.product}
          gameProduct={gameProduct}
        />
      ))}
    </Layout>
  );
};
