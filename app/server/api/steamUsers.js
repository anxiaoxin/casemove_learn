const SteamCtrl = require('./steamCtrl');

class SteamUsers {
  users = {};
  constructor() {

  }

  create(userName) {
    const user = this.users[userName];
    if(user && user.status == 1) {
      return user;
    } else {
      this.users[userName] = new SteamCtrl(userName);
      return this.users[userName];
    }
  }

  canUse(userName) {
    const user = this.users[userName];
    if (user && (user.status == 1)) {
      return true;
    } else {
      return false;
    }
  }

  get(userName) {
    const user = this.users[userName];
    if(!user) {
      return 'no user';
    }
    if (user && user.status !== 1) {
      this.users.delete(userName);
      return userStatus;
    }

    return user;
  }
}

module.exports = new SteamUsers();
