const { User } = require("../sql/Models")

const checkSkey = async (name) => {
  const user = await User.findOne({
    where: {
      name: name
    }
  });
  if (!user) return null;
  return user.dataValues;
}

const createUser = async (name, validityM) => {
  try {
    const res = await User.create({name, validityM});
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const deleteUser = async (id) => {
  try {
    const res = await User.destroy({where: {id}});
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const updateUser = async (name, validityM) => {
  try{
    const user = await User.findOne({
      where: {
        name
      }
    })
    if (!user) return false;

    const res = await User.update({name, validityM}, {
      where: {
        name
      }
    })
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
  updateUser,
  getUsers,
  deleteUser,
  test
}
