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
  : 816;
const hub88Url = process.env.HUB88_URL || "http://server1.ih.testenv.io:8091";

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

const ALLOWED_GAME_CODES = [
  "ont_steamvault",
  "ont_goldenstripe",
  "ont_luckylion",
  "ont_watfordslot",
  "ont_fortuneminer-3reels",
  "klg_treeofgold",
  "klg_monkeygod",
  "klg_jokersupreme",
  "klg_mermaidsgalore",
  "klg_bangkokdreams",
  "clt_dragonrising",
  "clt_basketballpro",
  "clt_magicforest",
  "clt_lostsaga",
  "clt_cuteycats"
];

app.use(json());

app.get("/api/games", (req, res) => {
  const message = { operator_id: operatorId };

  hub88api
    .post("/operator/generic/v2/game/list", message)
    .then(data => {
      res.send(
        data.data.filter((game: { game_code: string }) =>
          ALLOWED_GAME_CODES.includes(game.game_code)
        )
      );
    })
    .catch(e => {
      res.status(400);
      res.send(e.response.data);
    });
});

app.get("/api/game_url/:gameId", (req, res) => {
  const message = {
    operator_id: operatorId,
    game_id: Number(req.params.gameId),
    currency: "XXX",
    country: "EE",
    lang: req.query.lang || "en",
    lobby_url: "https://amazing-casino.com/lobby",
    ip: "142.245.172.168",
    platform: req.query.platform || "GPL_DESKTOP"
  };

  hub88api
    .post("/operator/generic/v2/game/url", message)
    .then(data => {
      res.send(data.data);
    })
    .catch(e => {
      console.log(e.response);
      res.status(400);
      res.send(e.response.data);
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
