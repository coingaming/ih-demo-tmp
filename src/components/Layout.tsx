import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { up } from "styled-breakpoints";
import { ReactComponent as Logo } from "./Logo.svg";

const Container = styled.main`
  padding: 24px;
  margin: auto;
  max-width: 100%;
  @media (min-width: 1200px) {
    max-width: 1256px;
  }
`;

const LogoStyled = styled(Logo)`
  margin-right: 16px;
`;

const StyledLink = styled(Link)`
  color: initial;
  text-decoration: none;
  transition: opacity 0.2s linear;
  opacity: 1;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
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
  box-sizing: border-box;
  flex-wrap: wrap;
  ${up("tablet")} {
    flex-wrap: nowrap;
  }
`;

const HeaderTitle = styled.h1`
  white-space: nowrap;
`;

type Props = {
  filterPocket?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children, filterPocket }) => {
  return (
    <Container>
      <Header>
        <StyledLink to="/">
          <LogoStyled />
          <HeaderTitle>
            Hub88<Dot>.</Dot>io <Demo>Demo</Demo>
          </HeaderTitle>
        </StyledLink>
        {filterPocket}
      </Header>

      {children}
    </Container>
  );
};
