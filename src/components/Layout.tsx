import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const Container = styled.main`
  padding: 24px;
`;

const StyledLink = styled(Link)`
  color: initial;
  text-decoration: none;
  transition: opacity 0.2s linear;
  opacity: 1;
  &:hover {
    opacity: 0.7;
  }
`;

const Dot = styled.span`
  color: #64ca74;
  font-size: 36px;
`;

const Demo = styled.span`
  font-weight: normal;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 84px;
  box-sizing: border-box;
`;

type Props = {
  filterPocket?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children, filterPocket }) => {
  return (
    <Container>
      <Header>
        <StyledLink to="/">
          <h1>
            Hub88<Dot>.</Dot>io <Demo>Demo</Demo>
          </h1>
        </StyledLink>
        {filterPocket}
      </Header>

      {children}
    </Container>
  );
};
