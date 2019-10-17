import React from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { LogoLink } from "./LogoLink";

const Container = styled.main`
  padding: 24px;
  margin: auto;
  max-width: 100%;
  @media (min-width: 1200px) {
    max-width: 1256px;
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
};

export const Layout: React.FC<Props> = ({ children, filterPocket }) => {
  return (
    <Container>
      <Header>
        <LogoLink />
        {filterPocket}
      </Header>

      {children}
    </Container>
  );
};
