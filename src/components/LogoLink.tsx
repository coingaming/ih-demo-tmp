import styled from "styled-components";
import { ReactComponent as Logo } from "./Logo.svg";
import { Link } from "@reach/router";
import React from "react";

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

export const LogoLink: React.FC = () => (
  <StyledLink to="/">
    <LogoStyled />
  </StyledLink>
);
