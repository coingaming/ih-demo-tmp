import React from "react";
import { useGameUrl } from "./useGameUrl";
import { RouteComponentProps } from "@reach/router";
import { Layout } from "./Layout";
import styled from "styled-components";
import { useGame } from "./useGame";
import { up } from "styled-breakpoints";

type Props = RouteComponentProps & {
  gameId?: string;
};

const AspectContainer = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  padding-top: 75%;
  position: relative;
  border-radius: 4px;
  margin-bottom: 32px;
  ${up("tablet")} {
    width: 50%;
    padding-top: 28.1%;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Frame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameInformation = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px 2px rgba(204, 204, 204, 0.51);
  flex: 1;
  ${up("tablet")} {
    margin-left: 32px;
    flex: initial;
  }
`;

const InfoTitle = styled.h3`
  margin-top: 0;
`;

const NameColumn = styled.td`
  padding-right: 16px;
  color: #7e8389;
`;

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase();
};

export const GamePage: React.FC<Props> = props => {
  const gameId = Number(props.gameId);
  const [gameUrl] = useGameUrl(gameId);
  const [game] = useGame(gameId);

  return (
    <Layout>
      <Container>
        <AspectContainer>
          {game && game.url_background ? (
            <BackgroundImage src={game.url_background} />
          ) : null}
          <Frame src={gameUrl} title="game" frameBorder="none" />
        </AspectContainer>
        {game ? (
          <GameInformation>
            <InfoTitle>Game information</InfoTitle>
            <table>
              <tbody>
                <tr>
                  <NameColumn>Name</NameColumn>
                  <td>{game.name}</td>
                </tr>
                <tr>
                  <NameColumn>Category</NameColumn>
                  <td>{game.category}</td>
                </tr>
                <tr>
                  <NameColumn>Product</NameColumn>
                  <td>{game.product}</td>
                </tr>
                <tr>
                  <NameColumn>Platforms</NameColumn>
                  <td>
                    {game.platforms
                      .map(platform => capitalize(platform.replace("GPL_", "")))
                      .join(", ")}
                  </td>
                </tr>
                <tr>
                  <NameColumn>Freebet Support</NameColumn>
                  <td>{game.freebet_support ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </GameInformation>
        ) : null}
      </Container>
    </Layout>
  );
};
