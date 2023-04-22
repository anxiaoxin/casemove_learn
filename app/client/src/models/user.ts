import { useState } from "react"
import { RefresInventory, UserLogin } from "../../src/request";
import combineInventory from "../../api/filters/inventoryFunctions";
import { getAccounts } from "../../api";
import UserInfo from '../pages/login/res.json';
// import prices from '../../../api/prices';

export const combineData = async (inventory: any) => {
  // const picture = await getProfilePicture(data.steamID);
  let combinedInventory  = await combineInventory (inventory, {ignoreUnlock: true, ignoreCustomname: true});
  let accounts = getAccounts(inventory);
  return {
    combinedInventory, accounts
  }

  // // Inventory prices
  // const PricingClass = new ConvertPrices(settingsData, currentState.pricingReducer)
  // let inventoryValue = 0
  // inventory.combinedInventory.forEach(element => {
  //   const itemPrice = PricingClass.getPrice(element)
  //   if (!isNaN(itemPrice)) {
  //     inventoryValue += itemPrice * element.combined_QTY
  //   }
  // });

  // let storageUnitsValue = 0
  // inventory.storageInventory.forEach(element => {
  //   const itemPrice = PricingClass.getPrice(element)
  //   if (!isNaN(itemPrice)) {
  //     storageUnitsValue += itemPrice * element.combined_QTY
  //   }
  // });
}

const useUser = () => {
  const [haslogin, setHasLogin] = useState(false);
  const [logging, setLogging] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const login = async (params: any) => {
    setLogging(true);
    UserLogin(params).then(async (data) => {
      if (data.status === 0) {
        const filtedData = await combineData(data.data.csgoInventory);
        setUserInfo({...data.data, ...filtedData });
        setHasLogin(true);
        setLogging(false);
      }
    }).catch(() => {
      setLogging(false);
    })
  }

  const refresh = async () => {
    setLogging(true);
    RefresInventory({}).then(async (data) => {
      if (data.status === 0) {
        const filtedData = await combineData(data.data);
        setUserInfo({...userInfo, csgoInventory: data.data, ...filtedData});
      }
    }).catch(() => {

    }).finally(() => setLogging(false));
  }

  return {haslogin, userInfo, login, logging, refresh};
}

export default useUser;
