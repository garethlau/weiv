const express = require("express");
const router = express.Router();
const Moniker = require("moniker");


router.get("/", (req, res) => {
    let nouns = Moniker.generator([Moniker.noun], {
        maxSize: 5,
    })

    let adjs = Moniker.generator([Moniker.adjective], {
        maxSize: 5,
    })
  let noun = nouns.choose();
  let adj = adjs.choose();

  let code = `${adj}-${noun}`;
  return res.status(200).send({ code: code });
});

module.exports = router;
