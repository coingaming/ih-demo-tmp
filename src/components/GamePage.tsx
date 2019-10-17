import React, { useState, useMemo } from "react";
import { useGameUrl } from "./useGameUrl";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";
import { useGame } from "./useGame";
import { up } from "styled-breakpoints";
import { ReactComponent as InfoIcon } from "./InfoIcon.svg";
import { ReactComponent as CrossIcon } from "./CrossIcon.svg";
import ArrowSelectIcon from "./ArrowSelectIcon.svg";
import { LogoLink } from "./LogoLink";

type Props = RouteComponentProps & {
  gameId?: string;
};

const AspectContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 0;
  background-color: #000;
  ${up("tablet")} {
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    margin-bottom: 0;
    width: 50%;
    padding-top: 28.1%;
    background: none;
    margin-bottom: 32px;
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
  border: none;
  margin: 0;
  padding: none;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type GameInformationProps = {
  show: boolean;
};

const GameInformation = styled.div<GameInformationProps>`
  position: absolute;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px 2px rgba(204, 204, 204, 0.51);
  flex: 1;
  align-items: center;
  display: ${({ show }) => (show ? "block" : "none")};
  top: 30%;
  ${up("tablet")} {
    display: block;
    position: initial;
    margin-left: 32px;
    flex: initial;
    margin-bottom: 32px;
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

const InfoIconSlot = styled.div`
  position: absolute;
  top: -4px;
  z-index: 1;
  display: block;
  color: #9199b6;
  ${up("tablet")} {
    display: none;
  }
`;

const Header = styled.header`
  padding: 32px;
  display: none;
  ${up("tablet")} {
    display: block;
  }
`;

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase();
};

export const GamePage: React.FC<Props> = props => {
  const gameId = Number(props.gameId);

  const isMobile = window.innerWidth < 768;

  const [language, setLanguage] = useState("en");
  const [platform, setPlatform] = useState(
    isMobile ? "GPL_MOBILE" : "GPL_DESKTOP"
  );

  const params = useMemo(() => ({ lang: language, platform }), [
    language,
    platform
  ]);

  const [gameUrl] = useGameUrl(gameId, params);

  const [game] = useGame(gameId);

  const [showInformation, setShowInfromation] = useState(false);

  return (
    <>
      <Header>
        <LogoLink />
      </Header>

      <InfoIconSlot>
        {showInformation ? (
          <CrossIcon onClick={() => setShowInfromation(false)} />
        ) : (
          <InfoIcon onClick={() => setShowInfromation(true)} />
        )}
      </InfoIconSlot>
      <Container>
        <AspectContainer>
          {game && game.url_background ? (
            <BackgroundImage src={game.url_background} />
          ) : null}
          <Frame
            allowFullScreen={isMobile}
            scrolling="no"
            src={gameUrl}
            title="game"
            frameBorder="none"
          />
        </AspectContainer>
        {game ? (
          <GameInformation show={showInformation}>
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
    </>
  );
};
