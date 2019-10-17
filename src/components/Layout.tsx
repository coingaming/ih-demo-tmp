import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { up } from "styled-breakpoints";
import { ReactComponent as Logo } from "./Logo.svg";

type ContainerProps = {
  fixed: boolean;
};

const Container = styled.main<ContainerProps>`
  padding: 24px;
  margin: auto;
  max-width: 100%;
  ${({ fixed }) =>
    fixed
      ? `@media (min-width: 1200px) {
    max-width: 1256px;
  }`
      : ""}
`;

const LogoStyled = styled(Logo)`
  width: 170px;
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

const Header = styled.header`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  ${up("tablet")} {
    flex-wrap: nowrap;
  }
`;

type Props = {
  filterPocket?: React.ReactNode;
  fixed?: boolean;
};

export const Layout: React.FC<Props> = ({
  children,
  filterPocket,
  fixed = true
}) => {
  return (
    <Container fixed={fixed}>
      <Header>
        <StyledLink to="/">
          <LogoStyled />
        </StyledLink>
        {filterPocket}
      </Header>

      {children}
    </Container>
  );
};
