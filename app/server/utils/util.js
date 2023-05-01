const AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');

const sendSuccess = (res, data) =>{
  res.send({
    status: 0,
    data
  })
}

const sendNoUser = (res, data) => {
  res.send({
    status: 1
  })
}

const sendFailed = (res, code, message) => {
  res.send({
    status: code,
    message
  })
}

const getRandomCode = (length) => {
   if (length > 0) {
      var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      var nums = "";
      for (var i = 0; i < length; i++) {
         var r = parseInt(Math.random() * 61);
         nums += data[r];
      }
      return nums;
   } else {
      return false;
   }
}

const decode = (text) => {
    const key = CryptoJS.enc.Utf8.parse('2e35f242a46d67eeb74aabc37d5e5d05');
    const iv = CryptoJS.enc.Utf8.parse('Psz4QMjfl6fDXxv6');

    const res = AES.decrypt(text, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7 
    })
    return res.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  sendSuccess,
  sendNoUser,
  getRandomCode,
  sendFailed,
  decode
}
