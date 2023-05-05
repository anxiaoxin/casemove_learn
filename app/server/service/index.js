const { User } = require("../sql/Models")

const checkSkey = async (name) => {
  const user = await User.findOne({
    where: {
      name: name
    }
  });
  return user.dataValues;
}

const createUser = async (name) => {
  try {
    const res = await User.create({name, validityM});
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const checkTime = async (user) => {
  if (!user && !user.dataValues) return false;
  const { validityM, createdAt } = user.dataValues;
  if (validityM === 0) {
    return true;
  }

  const createTime = (new Date(createdAt)).getTime();
  const validityMTime =  validityM * 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  return now - createTime < validityMTime;
}

const getUsers = async () => {
  try {
    const res = await User.findAll();
    return res;
  } catch (error) {
    return []; 
  }
}

const test = async (name) => {
  const user = await User.findOne({
    where: {
      name: name
    }
  });
  console.log((new Date(user.dataValues.createdAt)).getTime());
}

module.exports = {
  checkSkey,
  createUser,
  getUsers,
  test
}
