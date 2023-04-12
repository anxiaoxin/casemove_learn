var express = require('express');
const SteamCtrl = require('../api/steamCtrl');
const { sendSuccess } = require('../utils/util');
const { getPrices } = require('../global/price');
var router = express.Router();

let steamCtrl;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next){
  steamCtrl = new SteamCtrl();
  console.log(11111, req.body);
  let data;
  try {
    data = await steamCtrl.login('guard', req.body);
    console.log('data', data);
  } catch (error) {

  }
  sendSuccess(res, data)
})

router.post('/refreshInventory', function(req, res, next) {
  steamCtrl.refreshInventory();
  res.send('respond with a resource');
})

router.get('/getPrice', async function(req, res, next) {
  const data = await getPrices();
  sendSuccess(res, data);
})

module.exports = router;
