const SteamCtrl = require('./steamCtrl');

class SteamUsers {
  users = {};
  constructor() {

  }

  create(userName) {
    const user = this.users[userName];
    if(user && user.status == 1 && user.gcCanUse()) {
      return user;
    } else {
      this.users[userName] = new SteamCtrl(userName);
      return this.users[userName];
    }
  }

  canUse(userName) {
    const user = this.users[userName];
    if (user && (user.status == 1) && user.csgo && user.csgo.haveGCSession) {
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

  deleteUser(userName) {
    if (user[userName]) {
      delete user[userName];
    }
  }
}

module.exports = new SteamUsers();
