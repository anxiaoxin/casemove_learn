const { User } = require("../sql/Models")

const checkSkey = async (name, skey) => {
  const user = await User.findOne({
    where: {
      username: name
    }
  });
  console.log(11111, user);
}

module.exports = {
  checkSkey
}
