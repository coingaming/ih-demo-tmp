import express from "express";
import { HmCrypto } from "hm-crypto-nodejs/lib";
import fs from "fs";
import path from "path";
import { json } from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;

function readPem(filename: string) {
  return fs
    .readFileSync(path.resolve(__dirname, "priv/" + filename))
    .toString("ascii");
}

const digestType = "RSA-SHA256";
const publicKey = readPem("public.pub");
const privateKey = readPem("private.pem");

const hmCrypto = new HmCrypto(digestType, privateKey, publicKey);

app.use(json());

app.get("/games", (req, res) => {
  const message = { operator_id: 16 };
  const signature = hmCrypto.sign(JSON.stringify(message));

  axios
    .post(
      "http://server7.ih.testenv.io:8091/operator/generic/v2/game/list",
      message,
      { headers: { "X-Hub88-Signature": signature } }
    )
    .then(data => {
      res.send(data.data);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
