// import SteamUser from "steam-user";
// import GlobalOffensive from "globaloffensive";
const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');

class SteamCtrl {
    sUser;
    csgo; 
    constructor() {
        this.sUser = new SteamUser();
        this.csgo = new GlobalOffensive(this.sUser);
        this.bindEvent();
    }

    bindEvent() {
        this.sUser.once('loggedOn', () => {
            console.log('logged on');
            this.sUser.once('accountInfo', (displayName) => {
                console.log('displayName', displayName);
            })
        });
        this.sUser.once('loginKey', function(key) {
            console.log('loginKey', key);
        });
        this.sUser.once('steamGuard', (domain, callback, lastCodeWrong) => {
            console.log('steamGuard');
        })    
    }

    login(type , params) {
        console.log(type, params);
        switch(type) {
            case 'guard': 
                this._loginGuard(params) 
                break;
            default:
                break;
        }
    }

    _loginGuard(params) {
        this.sUser.logOn(params);
    }
}

module.exports = SteamCtrl;