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

module.exports = {
  sendSuccess,
  sendNoUser
}
