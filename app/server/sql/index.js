const { User, sequelize }  = require('./Models');
const { Sequelize, Model, DataTypes } = require('sequelize');

class SqlController {
  db = sequelize;
  constructor() {

  }

  async init() {
    try {
      await sequelize.sync();
    } catch (error) {

    }
  }

  async connect() {
    try {
      await this.db.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  async check() {
    await this.init();
    await this.connect();
  }
}

module.exports = {
  sqCtrl: new SqlController()
};
