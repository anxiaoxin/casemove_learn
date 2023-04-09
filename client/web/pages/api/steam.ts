import SteamUser from "steam-user";
import GlobalOffensive from "globaloffensive";

export enum LOGINTYPE {
    guard
}

class SteamCtrl {
    sUser: SteamUser;
    csgo: GlobalOffensive; 
    constructor() {
        this.sUser = new SteamUser();
        this.csgo = new GlobalOffensive(this.sUser);
        this.bindEvent();
    }

    bindEvent() {
        this.sUser.once('loggedOn', () => {
            console.log('logged on');
            this.sUser.once('accountInfo', (displayName: string) => {
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

    login(type: LOGINTYPE, params: any) {
        switch(type) {
            case LOGINTYPE.guard: 
                this._loginGuard(params) 
                break;
            default:
                break;
        }
    }

    _loginGuard(params: any) {
        this.sUser.logOn(params);
    }
}

export default SteamCtrl;