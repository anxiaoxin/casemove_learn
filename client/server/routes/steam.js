var express = require('express');
const SteamCtrl = require('../api/steam');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const steamCtrl = new SteamCtrl();
  console.log(req.query);
  steamCtrl.login('guard', req.query);
  res.send('respond with a resource');
});

module.exports = router;
