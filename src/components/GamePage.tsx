import React from "react";
import { useGameUrl } from "./useGameUrl";
import { RouteComponentProps } from "@reach/router";
import { Layout } from "./Layout";
import styled from "styled-components";

type Props = RouteComponentProps & {
  gameId?: string;
};

const AspectContainer = styled.div`
  height: 0;
  max-width: 50%;
  overflow: hidden;
  padding-top: 28.1%;
  position: relative;
  border-radius: 4px;
`;

const Frame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const GamePage: React.FC<Props> = ({ gameId }) => {
  const [gameUrl] = useGameUrl(Number(gameId));

  return (
    <Layout>
      <AspectContainer>
        <Frame src={gameUrl} title="game" frameBorder="none" />
      </AspectContainer>
    </Layout>
  );
};
