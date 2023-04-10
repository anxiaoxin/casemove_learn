const sendSuccess = (res, data) =>{
  res.send({
    status: 0,
    data
  })
}

module.exports = {
  sendSuccess
}
