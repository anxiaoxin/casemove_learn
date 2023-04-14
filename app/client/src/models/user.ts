import { useState } from "react"
import { UserLogin } from "../../src/request";
import combineInventory from "../../api/filters/inventoryFunctions";
import { getAccounts } from "../../api";
import UserInfo from '../pages/login/res.json';
// import prices from '../../../api/prices';

const filterData = async (data: any) => {
  console.log(data);
  // const picture = await getProfilePicture(data.steamID);
  let combinedInventory  = await combineInventory (data.csgoInventory, {ignoreUnlock: true, ignoreCustomname: true});
  let accounts = getAccounts(data.csgoInventory);
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
  const [userInfo, setUserInfo] = useState({});

  const login = async (params: any) => {
    const filtedData = await filterData(UserInfo);
    setUserInfo({...UserInfo, ...filtedData});
    setHasLogin(true);
    return ;
    setLogging(true);
    UserLogin(params).then(async (data) => {
      if (data.status === 0) {
        const filtedData = await filterData(data.data);
        setUserInfo({...data.data, ...filtedData});
        setHasLogin(true);
        setLogging(false);
      }
    }).catch(() => {
      setLogging(false);
    })
  }
  return {haslogin, userInfo, login};
}

export default useUser;
