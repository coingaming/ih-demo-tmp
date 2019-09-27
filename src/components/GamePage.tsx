import React, { useState, useMemo } from "react";
import { useGameUrl } from "./useGameUrl";
import { RouteComponentProps, Link } from "@reach/router";
import { Layout } from "./Layout";
import styled from "styled-components";
import { useGame } from "./useGame";
import { up } from "styled-breakpoints";
import { ReactComponent as CrossIcon } from "./CrossIcon.svg";
import ArrowSelectIcon from "./ArrowSelectIcon.svg";

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
    margin-bottom: 0;
    width: 60%;
    padding-top: 33.7%;
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
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  padding-bottom: 8px;
  color: #7e8389;
  vertical-align: center;
`;

const LinkPocket = styled.nav`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const BackLink = styled(Link)`
  color: #7e8389;
  display: block;
  width: 24px;
  transition: opacity 0.2s linear;
  opacity: 1;
  margin-bottom: 16px;
  &:hover {
    opacity: 0.7;
  }
`;

const Select = styled.select`
  width: 158px;
  height: 40px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #dbe0e3;
  padding: 0;
  padding-left: 16px;
  background: url(${ArrowSelectIcon}) no-repeat 125px center;
  background-size: 24px;
  outline: none;
  cursor: pointer;
  color: #1a212a;
  user-select: none;
  -webkit-appearance: button;
`;

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase();
};

export const GamePage: React.FC<Props> = props => {
  const gameId = Number(props.gameId);

  const [language, setLanguage] = useState("en");
  const [platform, setPlatform] = useState("GPL_DESKTOP");

  const params = useMemo(() => ({ lang: language, platform }), [
    language,
    platform
  ]);

  const [gameUrl] = useGameUrl(gameId, params);

  const [game] = useGame(gameId);

  return (
    <Layout
      filterPocket={
        <LinkPocket>
          <BackLink to="/">
            <CrossIcon />
          </BackLink>
        </LinkPocket>
      }
    >
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
                  <NameColumn>Language</NameColumn>
                  <td>
                    <Select
                      value={language}
                      onChange={e => setLanguage(e.currentTarget.value)}
                    >
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="ru">Русский</option>
                      <option value="pt">Português</option>
                      <option value="zh">中文</option>
                      <option value="es">Español</option>
                      <option value="tr">Türkçe</option>
                      <option value="ko">한국어</option>
                      <option value="th">ภาษาไทย</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <NameColumn>Platform</NameColumn>
                  <td>
                    <Select
                      value={platform}
                      onChange={e => setPlatform(e.currentTarget.value)}
                    >
                      {game.platforms
                        .map(platform => ({
                          value: platform,
                          label: capitalize(platform.replace("GPL_", ""))
                        }))
                        .map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </Select>
                  </td>
                </tr>
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
