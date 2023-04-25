var express = require('express');
const SteamUsers = require('../api/steamUsers');
const { sendSuccess } = require('../utils/util');
const { getPrices } = require('../global/price');
const { secretKey } = require('../constants');
const jwt = require('jsonwebtoken');
const { checkSkey } = require('../service');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next){
  checkSkey(req.body.accountName, req.body.skey);
  return ;
  const steamUser = SteamUsers.create(req.body.accountName);
  let data;

  try {
    data = await steamUser.login('guard', req.body);
  } catch (error) {
    console.log('error', error)
  }

  const { accountName } = req.body;
  const token = 'Bearer ' + jwt.sign(
    {username:accountName},
    secretKey,
    {expiresIn: 3600 * 2});

  res.send({
    status: 0,
    data,
    token
  })
})

router.post('/getBaseInfo', async function(req, res, next) {
  const steamUser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  try {
    const info = await steamUser.getBaseInfo();
  } catch (error) {

  }
})

router.post('/refreshInventory', async function(req, res, next) {
  const data = await steamCtrl.refreshInventory();
  sendSuccess(res, data);
})

router.get('/getPrice', async function(req, res, next) {
  const data = await getPrices();
  sendSuccess(res, data);
})

router.get('/getCasketContents', async function(req, res, next) {
  console.log(2222, req.query, req.auth);
  const { id } = req.query;
  const data = await steamCtrl.getCasketContents(id);
  console.log('res', data);
  sendSuccess(res, data);
})

router.post('/moveOut', async function(req, res, next) {
  const { casketId, itemId } = req.body;
  const data = await steamCtrl.moveOut(casketId ,itemId);
  sendSuccess(res, data);
})

router.post('/moveIn', async function(req, res, next) {
  const { casketId, itemId } = req.body;
  const data = await steamCtrl.moveIn(casketId, itemId);
  console.log('res', data);
  sendSuccess(res, data);
})


module.exports = router;
