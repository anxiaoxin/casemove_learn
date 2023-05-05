var express = require('express');
const SteamUsers = require('../api/steamUsers');
const { sendSuccess, sendFailed, getRandomCode, decode } = require('../utils/util');
const { getPrices } = require('../global/price');
const { secretKey } = require('../constants');
const jwt = require('jsonwebtoken');
const { checkSkey, createUser, getUsers } = require('../service');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next){
  const { accountName, password, twoFactorCode } = req.body;
  const passwordD = decode(password);
  const twoFactorCodeD = decode(twoFactorCode);
  const user = await checkSkey(accountName);
  if (user === null) {
    sendFailed(res, 1, '用户不存在');
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

  if (SteamUsers.canUse(req.body.accountName)) {
    res.send({
      status: 0,
      data: true,
      token
    })
    return;
  }

  const steamUser = SteamUsers.create(req.body.accountName);

  let data;

  try {
    data = await steamUser.login('guard', {accountName, password: passwordD, twoFactorCode: twoFactorCodeD});
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

    if (error === 'no session') {
      sendFailed(res, 2, '');
      return;
    }
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

    if (error === 'no session') {
      sendFailed(res, 2, '');
      return;
    }
    sendFailed(res, 1, '请求失败，请重试');
  }
})

router.get('/getPrice', async function(req, res, next) {
  const data = await getPrices();
  sendSuccess(res, data);
})

router.get('/getCasketContents', async function(req, res, next) {
  const steamUser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { id } = req.query;

  try {
    const data = await steamUser.getCasketContents(id);
    sendSuccess(res, data);
  } catch (error) {

    if (error === 'no session') {
      sendFailed(res, 2, '');
      return;
    }
    sendFailed(res, 1, '请求失败，请重试');
  }

})

router.post('/moveOut', async function(req, res, next) {
  console.log(req.auth.username);
  const steamUser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { casketId, itemId } = req.body;

  try {
    const data = await steamUser.moveOut(casketId ,itemId);
    sendSuccess(res, data);
  } catch (error) {
    if (error === 'no session') {
      sendFailed(res, 2, '');
      return;
    }
    sendSuccess(res, false);
  }

})

router.post('/moveIn', async function(req, res, next) {
  const steamUser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { casketId, itemId } = req.body;
  try {
    const data = await steamUser.moveIn(casketId, itemId);
    sendSuccess(res, data);
  } catch (error) {
    if (error === 'no session') {
      sendFailed(res, 2, '');
      return;
    }
    sendSuccess(res, false);
  }
})

router.post('/rename', async function(req, res, next) {
  const steamUser = SteamUsers.get(req.auth.username);
  if (!(steamUser instanceof Object)) {
    res.send({status: 1, error: steamUser});
    return;
  }

  const { casketId, name } = req.body;
  try {
    const data = await steamUser.renameStorageUnit(casketId, name);
    sendSuccess(res, data);
  } catch (error) {
    if (error === 'no session') {
      sendFailed(res, 2, '');
      return;
    }
    sendSuccess(res, false);
  }
})

router.get('/getUsers', async function(req, res, next) {
  const admin = await checkSkey(req.auth.username);

  if (!admin || !admin.isAdmin) {
    sendFailed(res, 1, '无操作权限');
    return;
  }

  try {
    const data = await getUsers();
    sendSuccess(res, data);
  } catch (error) {
    sendSuccess(res, false);
  }
})

router.get('/addUser', async function(req, res, next) {
  const admin = await checkSkey(req.auth.username);

  if (!admin || !admin.isAdmin) {
    sendFailed(res, 1, '无操作权限');
    return;
  }

  const { name, validityM } = req.query;
  const user = await checkSkey(name);
  if (user) {
    sendFailed(res, 1, '用户已存在');
    return;
  }
  const skey = getRandomCode(16);
  const result = await createUser(name, validityM);
  if (result) {
    sendSuccess(res, skey);
    return;
  } else {
    sendFailed(res, 1, '创建失败');
  }
})

router.post('/updateUser', async function(req, res, next) {
  const admin = await checkSkey(req.auth.username);

  if (!admin || !admin.isAdmin) {
    sendFailed(res, 1, '无操作权限');
    return;
  }


})

module.exports = router;
