import express from "express";
import { HmCrypto } from "hm-crypto-nodejs/lib";
import fs from "fs";
import path from "path";
import { json } from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const operatorId = process.env.OPERATOR_ID
  ? Number(process.env.OPERATOR_ID)
  : 25;
const bbinOperatorId = process.env.BBIN_OPERATOR_ID
  ? Number(process.env.BBIN_OPERATOR_ID)
  : 23;
const casumoOperatorId = process.env.CASUMO_OPERATOR_ID
  ? Number(process.env.CASUMO_OPERATOR_ID)
  : 24;
const hub88Url = process.env.HUB88_URL || "https://api.hub88.io";
const lobbyUrl = process.env.LOBBY_URL || "https://demo.hub88.io";

const partners: { [k: string]: number } = {
  "": operatorId,
  bbin: bbinOperatorId,
  casumo: casumoOperatorId
};

app.use("/healthcheck", require("express-healthcheck")());

function readPem(filename: string) {
  return fs
    .readFileSync(path.resolve(__dirname, "priv/" + filename))
    .toString("ascii");
}

const digestType = "RSA-SHA256";
const publicKey = readPem("public.pub");
const privateKey = readPem("private.pem");

const hmCrypto = new HmCrypto(digestType, privateKey, publicKey);

const hub88api = axios.create({ baseURL: hub88Url });
hub88api.interceptors.request.use(config => {
  const signature = hmCrypto.sign(JSON.stringify(config.data));
  config.headers["X-Hub88-Signature"] = signature;

  return config;
});

type Game = {};

const indexMap: { [k: string]: number } = {
  OneTouch: 100,
  Kalamba: 99,
  Caleta: 98,
  "Green Jade": 97,
  Quickfire: 96,
  RedTiger: 95,
  Quickspin: 94,
  Blueprint: 93,
  Netent: 92,
  Playngo: 91,
  Yggdrasil: 90,
  "Golden Hero": 89,
  GameArt: 88,
  BetSoft: 87,
  Booming: 86,
  "Pragmatic Play": 85,
  "Tom Horn": 84,
  Wazdan: 83,
  "Common Genii": 82
};

const nameReplacements: { [k: string]: string } = {
  Kalamba: "Kalamba Games",
  Quickfire: "Microgaming",
  Caleta: "Caleta Gaming",
  RedTiger: "Red Tiger Gaming",
  Blueprint: "Blueprint Gaming",
  Netent: "NetEnt",
  Playngo: "Play'n GO",
  Booming: "Booming Games",
  "Common Genii": "Genii"
};

const hardcodedGames = [
  {
    product: "Green Jade",
    game_id: -1,
    name: "Hammer of Fortune",
    game_url:
      "https://gjg.immortalonline.com/HammerOfFortune/live/index.html?mode=fun",
    url_thumb:
      "https://greenjade.com/wp-content/uploads/2018/09/logo-uai-1032x652.png",
    platforms: []
  },
  {
    product: "Green Jade",
    game_id: -2,
    name: "Coin Flip Deluxe",
    game_url:
      "https://gjg.immortalonline.com/coinflipdeluxe/live/index.html?mode=fun",
    url_thumb:
      "https://greenjade.com/wp-content/uploads/2018/09/Coin-Flip-Logo_a.png",
    platforms: []
  },
  {
    product: "Green Jade",
    game_id: -3,
    name: "Spin Bet Station",
    game_url: "http://spinbetstation.immortalonline.com/spinbetstation/stage/",
    url_thumb:
      "https://greenjade.com/wp-content/uploads/2018/09/Logo_marketing_01.png",
    platforms: []
  }
];

app.use(json());

const games: { [k: string]: Game[] } = {};

const loadGames = async (operatorId: number) => {
  if (games[operatorId]) {
    return games[operatorId];
  }

  return hub88api
    .post<{ product: string }[]>("/operator/generic/v2/game/list", {
      operator_id: operatorId
    })
    .then(data => {
      games[operatorId] = [...data.data, ...hardcodedGames]
        .sort((a, b) => (indexMap[b.product] || 0) - (indexMap[a.product] || 0))
        .map(game => ({
          ...game,
          product: nameReplacements[game.product]
            ? nameReplacements[game.product]
            : game.product
        }));

      return games[operatorId];
    });
};

app.get("/api/games", (req, res) => {
  const operator = partners[req.query.partner || ""];
  return loadGames(operator)
    .then(games => res.send(games))
    .catch(e => {
      console.log(e);
      res.status(400);
      res.send(e.response.data);
    });
});

app.get("/api/game_url/:gameId", (req, res) => {
  const gameId = Number(req.params.gameId);

  const fakeGame = hardcodedGames.find(game => game.game_id === gameId);
  if (fakeGame) {
    res.send({ url: fakeGame.game_url });
    return;
  }

  const message = {
    operator_id: operatorId,
    game_id: gameId,
    currency: "XXX",
    country: "EE",
    lang: req.query.lang || "en",
    lobby_url: lobbyUrl,
    ip: "142.245.172.168",
    platform: req.query.platform || "GPL_DESKTOP"
  };

  hub88api
    .post("/operator/generic/v2/game/url", message)
    .then(data => {
      res.send(data.data);
    })
    .catch(e => {
      console.log(e);
      res.status(400);
      res.send(e.response.data);
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
