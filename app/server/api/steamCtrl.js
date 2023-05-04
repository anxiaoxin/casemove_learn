// import SteamUser from "steam-user";
// import GlobalOffensive from "globaloffensive";
const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');
const { fetchItems } = require('./steam/items/getCommands');
const { tradeUps } = require('./steam/tradeup');
const { currencyCodes } = require('../const');
const { currency: CurrencyClass } = require('../api/steam/currency');

class SteamCtrl {
    name;
    sUser;
    csgo;
    fetchItemClass = new fetchItems();
    tradeUpClass = new tradeUps();
    status = 1;
    steamID = 0;
    displayName = '';

    static getCurrency = (currency) => {
      const currencyClass  = new CurrencyClass();
      currencyClass.getRate(currency).then((res) => {

      })
    }

    constructor(name) {
      this.name = name;
      this.sUser = new SteamUser();
      this.csgo = new GlobalOffensive(this.sUser);
      this.bindEvent();
    }

    gcCanUse() {
      if (this.csgo) {
        return this.csgo.haveGCSession;
      }
      return false;
    }

    bindEvent() {
        this.sUser.once('loggedOn', () => {
            console.log('has logged on');
            this.sUser.once('accountInfo', (displayName) => {
                console.log('displayName', displayName);
                this.displayName = displayName;
                this.csgoStart(displayName);
            })
        });
        this.sUser.once('loginKey', function(key) {
            console.log('loginKey', key);
        });

        // 走这个函数说明登录失败
        this.sUser.once('steamGuard', (domain, callback, lastCodeWrong) => {
            console.log('steamGuard', lastCodeWrong);
        })

        this.sUser.once('error', (error) => {
          if (error == 'Error: LoggedInElsewhere') {
            this.status = 'logged in else where';
          } else {
            this.status = 'error'
          }
        });
    }

    async login(type , params) {
        switch(type) {
            case 'guard':
                return this._loginGuard(params)
            default:
                break;
        }
    }

    async _loginGuard(params) {
        this.sUser.logOn(params);
        return new Promise((res, rej) => {
          this.logonRes = {res, rej}
        })
    }

    startEvents() {
      this.csgo.on('disconnectedFromGC', (reason) => {
        this.status = 'disconnectedFromGC';
        this.removeEvents();
      });

      // User listeners
      // Steam Connection
      this.sUser.on('error', (eresult, msg) => {
        this.status = 'error';
        this.removeEvents();
      });

      this.sUser.on('disconnected', (eresult, msg) => {
        this.status = 'disconnected';
        this.removeEvents();
      });
    }

    removeEvents() {
      this.removeInventoryListeners();
      this.csgo.removeAllListeners('connectedToGC');
      this.csgo.removeAllListeners('disconnectedFromGC');

      // Remove for user
      this.sUser.removeAllListeners('error');
      this.sUser.removeAllListeners('disconnected');
      this.sUser.removeAllListeners('loggedOn');
    }

    startChangeEvents() {
      this.csgo.on('itemRemoved', (item) => {
        console.log('item removed', item);
        if (
          !Object.keys(item).includes('casket_id') &&
          !Object.keys(item).includes('casket_contained_item_count')
        ) {
          console.log('Item ' + item.id + ' was removed');
          return;
          fetchItemClass.convertInventory(csgo.inventory).then((returnValue) => {
            tradeUpClass.getTradeUp(returnValue).then((newReturnValue) => {
              mainWindow?.webContents.send('userEvents', [
                1,
                'itemRemoved',
                [item, newReturnValue],
              ]);
            });
          });
        }
      });

      this.csgo.on('itemChanged', (item) => {
        return;
        fetchItemClass.convertInventory(csgo.inventory).then((returnValue) => {
          tradeUpClass.getTradeUp(returnValue).then((newReturnValue) => {
            mainWindow?.webContents.send('userEvents', [
              1,
              'itemChanged',
              [item, newReturnValue],
            ]);
          });
        });
      });

      csgo.on('itemAcquired', (item) => {
        if (
          !Object.keys(item).includes('casket_id') &&
          !Object.keys(item).includes('casket_contained_item_count')
        ) {
          console.log('Item ' + item.id + ' was acquired');
          // removeInventoryListeners();
          // setTimeout(function () {
          //   console.log('ran');
          //   startChangeEvents();
          //   fetchItemClass
          //     .convertInventory(csgo.inventory)
          //     .then((returnValue) => {
          //       tradeUpClass.getTradeUp(returnValue).then((newReturnValue) => {
          //         mainWindow?.webContents.send('userEvents', [
          //           1,
          //           'itemAcquired',
          //           [{}, newReturnValue],
          //         ]);
          //       });
          //     });
          // }, 1000);

          // fetchItemClass.convertInventory(csgo.inventory).then((returnValue) => {
          //   tradeUpClass.getTradeUp(returnValue).then((newReturnValue: any) => {
          //     mainWindow?.webContents.send('userEvents', [
          //       1,
          //       'itemAcquired',
          //       [item, newReturnValue],
          //     ]);
          //   });
          // });
        }
      });
    }

    removeInventoryListeners() {
      this.csgo.removeAllListeners('itemRemoved');
      this.csgo.removeAllListeners('itemChanged');
      this.csgo.removeAllListeners('itemAcquired');
    }

    refreshInventory() {
      return new Promise((res) => {
        this.fetchItemClass.convertInventory(this.csgo.inventory).then((returnValue) => {
          this.tradeUpClass.getTradeUp(returnValue).then((newReturnValue) => {
            res(newReturnValue);
          });
        });
      })
    }
    // 连接上csgo后登录流程才算完成
    csgoStart(displayName) {
      const gameCoordinate = async (resolve) => {
        this.csgo.once('connectedToGC', () => {
          if (resolve) {
            resolve('GC');
          }
          console.log('Connected to GC!');
          if (this.csgo.haveGCSession) {
            console.log('Have Session!');

             this.steamID = this.sUser.logOnResult.client_supplied_steamid;
            // this.fetchItemClass
            //   .convertInventory(this.csgo.inventory)
            //   .then((returnValue) => {
            //     this.tradeUpClass
            //       .getTradeUp(returnValue)
            //       .then((newReturnValue) => {
            //         let walletToSend = this.sUser.wallet;
            //         if (walletToSend) {
            //           walletToSend.currency =
            //             currencyCodes[walletToSend.currency];
            //         }

            //         const returnPackage = {
            //           steamID: this.sUser.logOnResult.client_supplied_steamid,
            //           displayName,
            //           haveGCSession: this.csgo.haveGCSession,
            //           csgoInventory: newReturnValue,
            //           walletToSend: walletToSend,
            //         };

            //         this.logonRes.res(returnPackage)
            //         this.startEvents(csgo, user);
            //       });
            //   }).catch(e => {
            //     this.logonRes.rej();
            //   });

              this.logonRes.res();
            }
        });
      }

      const startGameCoordinator = async () => {

        setTimeout(() => {
          this.sUser.gamesPlayed([730], true);
        }, 3000);
      }
      // // Create a timeout race to catch an infinite loading error in case the Steam account hasnt added the CSGO license
      // Run the normal version

      let GCResponse = new Promise((resolve) => {
        this.sUser.once('playingState', function (blocked, _playingApp) {
          if (!blocked) {
            startGameCoordinator();
            gameCoordinate(resolve);
          } else {
            // ClassLoginResponse.setEmptyPackage();
            // ClassLoginResponse.setResponseStatus('playingElsewhere');
            // sendLoginReply(event);
            resolve('error');
          }
        });
      });

      // Run the timeout
      let timeout = new Promise((resolve, _reject) => {
        setTimeout(resolve, 10000, 'time');
      });

      // Run the timeout
      let error = new Promise((resolve, _reject) => {
        this.sUser.once('error', (error) => {
          if (error == 'Error: LoggedInElsewhere') {
            resolve('error');
          }
        });
      });

      // Race the two
      Promise.race([timeout, GCResponse, error]).then((value) => {
        if (value == 'error') {
          // Force login
          // ipcMain.on('forceLogin', async () => {
          //   console.log('forceLogin');
          //   setTimeout(() => {
          //     // user.setPersona(SteamUser.EPersonaState.Online);
          //     gameCoordinate();
          //     user.gamesPlayed([730], true);
          //   }, 3000);

          //   ipcMain.removeAllListeners('forceLogin');
          //   ipcMain.removeAllListeners('signOut');
          // });
          // ipcMain.on('signOut', async () => {
          //   console.log('Sign out');
          //   user.logOff();
          //   ipcMain.removeAllListeners('forceLogin');
          //   ipcMain.removeAllListeners('signOut');
          // });
          this.logonRes.rej();
        }
        if (value == 'time') {
          console.log(
            'GC didnt start in time, adding CSGO to the library and retrying.'
          );
          this.logonRes.rej();
          // this.sUser.requestFreeLicense([730], function (err, packageIds, appIds) {
          //   if (err) {
          //     console.log(err);
          //     // ClassLoginResponse.setEmptyPackage();
          //     // ClassLoginResponse.setResponseStatus('playingElsewhere');
          //     // sendLoginReply(event);
          //   }
          //   console.log('Granted package: ', packageIds);
          //   console.log('Granted App: ', appIds);
          //   startGameCoordinator();

          // });
        }
      });
    }

    getBaseInfo() {
      return new Promise((res, rej) => {
        try {

          if (!this.csgo.haveGCSession) {
            rej('no session');
            return;
          }

          this.fetchItemClass
            .convertInventory(this.csgo.inventory)
            .then((returnValue) => {
              this.tradeUpClass
                .getTradeUp(returnValue)
                .then((newReturnValue) => {
                  let walletToSend = this.sUser.wallet;
                  if (walletToSend) {
                    walletToSend.currency =
                      currencyCodes[walletToSend.currency];
                  }

                  const returnPackage = {
                    steamID: this.steamID,
                    displayName: this.displayName,
                    haveGCSession: this.csgo.haveGCSession,
                    csgoInventory: newReturnValue,
                    walletToSend: walletToSend,
                  };
                  res(returnPackage);
                });
              });
        } catch (error) {
          rej(error);
        }
      })
    }

    async getCasketContents(casketID) {
      return new Promise((res, rej) => {
        if (!this.csgo.haveGCSession) {
          rej('no session');
          return;
        }

        this.csgo.getCasketContents(casketID, async (err, items) => {
          this.fetchItemClass.convertStorageData(items).then((returnValue) => {
            this.tradeUpClass.getTradeUp(returnValue).then((newReturnValue) => {
              console.log('Casket contains: ', newReturnValue.length);
              res(newReturnValue);
            });
          });
        })
      })
    }

    // Remove items from storage unit
    moveOut(casketId, itemId, fastMode = false) {
      console.log('haveGCsession', this.csgo.haveGCSession);

      return new Promise((res, rej) => {
        // 操作的时候将监听事件移除

        if (!this.csgo.haveGCSession) {
          rej('no session');
          return;
        }

        this.removeInventoryListeners();
        this.csgo.removeFromCasket(casketId, itemId);
        // 如果是fastmode 则不监听该结果
        if (fastMode == false) {
          this.csgo.once(
            'itemCustomizationNotification',
            (itemIds, notificationType) => {
              console.log(itemIds, notificationType);
              if (
                notificationType ==
                GlobalOffensive.ItemCustomizationNotification.CasketRemoved
              ) {
                res(true)
              } else {
                console.log(111, notificationType);
              }
            }
          );
        }
        setTimeout(() => {
          rej();
        }, 3000)
      })
    }

    moveIn(casketId, itemId, fastMode = false) {
      console.log('haveGCsession', this.csgo.haveGCSession);
      return new Promise((res, rej) => {

        if (!this.csgo.haveGCSession) {
          rej('no session');
          return;
        }

        this.csgo.addToCasket(casketId, itemId);
        this.removeInventoryListeners();
        if (fastMode == false) {
          this.csgo.once(
            'itemCustomizationNotification',
            (itemIds, notificationType) => {
              if (
                notificationType ==
                GlobalOffensive.ItemCustomizationNotification.CasketAdded
              ) {
                res(true);
              } else {
                console.log(111, notificationType);
              }

            }
          );
        }

        setTimeout(() => {
          rej();
        }, 3000);
      });
    }

    renameStorageUnit(itemID, newName) {
      return new Promise((res, rej) => {

        if (!this.csgo.haveGCSession) {
          rej('no session');
          return;
        }

        this.csgo.nameItem(0, itemID, newName);
        this.csgo.once('itemCustomizationNotification', (itemIds, notificationType) => {
          if (
            notificationType ==
            GlobalOffensive.ItemCustomizationNotification.NameItem
          ) {
            res(true);
          }
        })
        setTimeout(() => {
          rej(false);
        }, 3000)
      });
    }
}


module.exports = SteamCtrl;
