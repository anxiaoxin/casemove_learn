var express = require('express');
const SteamUsers = require('../api/steamUsers');
const { sendSuccess, sendFailed, getRandomCode } = require('../utils/util');
const { getPrices } = require('../global/price');
const { secretKey } = require('../constants');
const jwt = require('jsonwebtoken');
const { checkSkey, createUser } = require('../service');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next){
  const { accountName, skey } = req.body;
  const user = await checkSkey(accountName, skey);
  if (user === null) {
    sendFailed(res, 1, '用户不存在');
    return;
  }

  if (user.skey !== skey) {
    sendFailed(res, 1, '秘钥错误');
    return;
  }

  const token = 'Bearer ' + jwt.sign(
    {username:accountName},
    secretKey,
    {expiresIn: 3600 * 2});

  if (user.isAdmin) {
    res.send({
      status: 0,
      data: {isAdmin: true},
      token
    })
    return;
  }

  const steamUser = SteamUsers.create(req.body.accountName);
  let data;

  try {
    data = await steamUser.login('guard', req.body);
  } catch (error) {
    console.log('error', error)
  }

  res.send({
    status: 0,
    data,
    token
  })
})

router.get('/getBaseInfo', async function(req, res, next) {
  const steamUser = SteamUsers.get(req.auth.username);

  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  try {
    const info = await steamUser.getBaseInfo();
    sendSuccess(res, info);
  } catch (error) {
    sendFailed(res, 1, '请求失败，请重试');
  }
})

router.post('/refreshInventory', async function(req, res, next) {
  const steamUser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  try {
    const data = await steamUser.refreshInventory();
    sendSuccess(res, data);
  } catch(error) {
    sendFailed(res, 1, '请求失败，请重试');
  }
})

router.get('/getPrice', async function(req, res, next) {
  const data = await getPrices();
  sendSuccess(res, data);
})

router.get('/getCasketContents', async function(req, res, next) {
  const steamuser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { id } = req.query;

  try {
    const data = await steamuser.getCasketContents(id);
    sendSuccess(res, data);
  } catch (error) {
    sendFailed(res, 1, '请求失败，请重试');
  }

})

router.post('/moveOut', async function(req, res, next) {
  const steamuser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { casketId, itemId } = req.body;

  try {
    const data = await steamuser.moveOut(casketId ,itemId);
    sendSuccess(res, data);
  } catch (error) {
    sendFailed(res, 1, '请求失败，请重试');
  }

})

router.post('/moveIn', async function(req, res, next) {
  const steamuser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { casketId, itemId } = req.body;
  try {
    const data = await steamCtrl.moveIn(casketId, itemId);
    sendSuccess(res, data);
  } catch (error) {
    sendFailed(res, 1, '请求失败，请重试');
  }
})

router.get('/genSkey', async function(req, res, next) {
  const { name } = req.query;
  const user = await checkSkey(name);
  if (user) {
    sendFailed(res, 1, '用户已存在');
    return;
  }
  const skey = getRandomCode(16);
  const result = await createUser(name, skey);
  if (result) {
    sendSuccess(res, skey);
    return;
  } else {
    sendFailed(res, 1, '创建失败');
  }
})

module.exports = router;
