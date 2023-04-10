// import SteamUser from "steam-user";
// import GlobalOffensive from "globaloffensive";
const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');
const { fetchItems } = require('./steam/items/getCommands');
const { tradeUps } = require('./steam/tradeup');
const { currencyCodes } = require('../const');

class SteamCtrl {
    sUser;
    csgo;
    fetchItemClass = new fetchItems();
    tradeUpClass = new tradeUps();

    constructor() {
        this.sUser = new SteamUser();
        this.csgo = new GlobalOffensive(this.sUser);
        this.bindEvent();
    }

    bindEvent() {
        this.sUser.once('loggedOn', () => {
            console.log('has logged on');
            this.sUser.once('accountInfo', (displayName) => {
                console.log('displayName', displayName);
                this.csgoStart(displayName);
                this.logonRes.res(displayName);
            })
        });
        this.sUser.once('loginKey', function(key) {
            console.log('loginKey', key);
        });

        // 走这个函数说明登录失败
        this.sUser.once('steamGuard', (domain, callback, lastCodeWrong) => {
            console.log('steamGuard', lastCodeWrong);
        })
    }

    async login(type , params) {
        switch(type) {
            case 'guard':
                return await this._loginGuard(params)
            default:
                break;
        }
    }

    async _loginGuard(params) {
        this.sUser.logOn(params);
        return await new Promise((res, rej) => {
          this.logonRes = {res, rej}
        })
    }

    startChangeEvents() {
      csgo.on('itemRemoved', (item) => {
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

      csgo.on('itemChanged', (item) => {
        console.log('item changed', item);
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
      console.log('Removed inventory listeners');
      this.csgo.removeAllListeners('itemRemoved');
      this.csgo.removeAllListeners('itemChanged');
      this.csgo.removeAllListeners('itemAcquired');
    }

    refreshInventory() {
      this.fetchItemClass.convertInventory(this.csgo.inventory).then((returnValue) => {
        console.log('returnvalue', returnValue);
        this.tradeUpClass.getTradeUp(returnValue).then((newReturnValue) => {
          console.log('item acquired', newReturnValue);
        });
      });
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
                      steamID: this.sUser.logOnResult.client_supplied_steamid,
                      displayName,
                      haveGCSession: this.csgo.haveGCSession,
                      csgoInventory: newReturnValue,
                      walletToSend: walletToSend,
                    };
                    console.log('returnPackage', returnPackage);
                    // startEvents(csgo, user);
                  });
              });
          }
        });
      }

      const startGameCoordinator = async () => {
        // user.setPersona(SteamUser.EPersonaState.Online);

        setTimeout(() => {
          // user.setPersona(SteamUser.EPersonaState.Online);
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
        console.log(222223333, value);
        if (value == 'error') {
          // Force login
          ipcMain.on('forceLogin', async () => {
            console.log('forceLogin');
            setTimeout(() => {
              // user.setPersona(SteamUser.EPersonaState.Online);
              gameCoordinate();
              user.gamesPlayed([730], true);
            }, 3000);

            ipcMain.removeAllListeners('forceLogin');
            ipcMain.removeAllListeners('signOut');
          });
          ipcMain.on('signOut', async () => {
            console.log('Sign out');
            user.logOff();
            ipcMain.removeAllListeners('forceLogin');
            ipcMain.removeAllListeners('signOut');
          });
        }
        if (value == 'time') {
          console.log(
            'GC didnt start in time, adding CSGO to the library and retrying.'
          );
          this.sUser.requestFreeLicense([730], function (err, packageIds, appIds) {
            if (err) {
              console.log(err);
              // ClassLoginResponse.setEmptyPackage();
              // ClassLoginResponse.setResponseStatus('playingElsewhere');
              // sendLoginReply(event);
            }
            console.log('Granted package: ', packageIds);
            console.log('Granted App: ', appIds);
            startGameCoordinator();

          });
        }
      });
    }
}

module.exports = SteamCtrl;
