import { useEffect } from 'react';
import inventory from '../login/res.json';
import Items from './items';
import { createCSGOImage } from '../../../api/createCSGOImage';
  // Sort run

const getCaskets = (inventory: any)=> {
    const res = inventory.csgoInventory.filter(function (row: any) {
      if (!row.item_url.includes('casket')) {
        return false; // skip
      }
      if (row.item_storage_total == 0) {
        return false; // skip
      }
      // 名称搜索
      // if (
      //   fromSelector.searchInputStorage != '' &&
      //   !row?.item_customname
      //     ?.toLowerCase()
      //     ?.includes(fromSelector.searchInputStorage)
      // ) {
      //   return false; // skip
      // }
      // 是否满了
      // if (row.item_storage_total == 1000 && fromReducer.hideFull) {
      //   return false; // skip
      // }
      return true;
    })
    .sort(function (a: any, b: any) {
      let a_customName = a.item_customname;
      let b_customName = b.item_customname;
      if (a_customName == undefined) {
        a_customName = '0000';
      }
      if (b_customName == undefined) {
        b_customName = '0000';
      }
      return sortRun(a_customName, b_customName);
    })
    console.log(2222, res);
    res.forEach((item: any) => {
      console.log(createCSGOImage(item.item_url));
    })
                          //   {totalDict[project.item_id] != undefined
                          // ? ' | ' +
                          //   new Intl.NumberFormat(settingsData.locale, {
                          //     style: 'currency',
                          //     currency: settingsData.currency,
                          //     minimumFractionDigits: 0,
                          //   }).format(totalDict[project.item_id].toFixed(0))
                          // : project.storage_id}
}

const sortRun = (valueOne: any, ValueTwo: any, useNaN = false) => {
    if (valueOne < ValueTwo) {
      return -1;
    }
    if (valueOne > ValueTwo) {
      return 1;
    }

    if (useNaN && isNaN(valueOne)) {
      return -1;
    }
    return 0;
  }

const MoveOut = () => {

  useEffect(() => {
    getCaskets(inventory);
  }, [])

  return <>
    <Items></Items>
  </>
}

export default MoveOut;
