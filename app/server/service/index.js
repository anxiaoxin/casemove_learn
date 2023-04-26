const { User } = require("../sql/Models")

const checkSkey = async (name, skey) => {
  const user = await User.findOne({
    where: {
      name: name
    }
  });
  return user;
}

const createUser = async (name, skey) => {
  try {
    const res = await User.create({name, skey});
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  checkSkey,
  createUser
}
