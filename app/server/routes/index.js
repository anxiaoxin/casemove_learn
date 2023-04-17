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
  console.log('start login')
  steamCtrl = new SteamCtrl();
  let data;
  try {
    data = await steamCtrl.login('guard', req.body);
    console.log('data', data);
  } catch (error) {
    console.log('error', error)
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

router.get('/getCasketContents', async function(req, res, next) {
  console.log(req.query);
  const { id } = req.query;
  const data = await steamCtrl.getCasketContents(id);
  console.log('res', data);
  sendSuccess(res, data);
})

router.post('/moveOut', async function(req, res, next) {
  const { casketId, itemId } = req.body;
  const data = await steamCtrl.moveOut(id);
  console.log('res', data);
  sendSuccess(res, data);
})

router.post('/moveIn', async function(req, res, next) {
  const { casketId, itemId } = req.body;
  const data = await steamCtrl.moveIn(id);
  console.log('res', data);
  sendSuccess(res, data);
})


module.exports = router;
