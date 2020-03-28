const express = require('express');
const router = express.Router();

router.use("/api/get-code", require('./api'))

module.exports = router;