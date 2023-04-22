import { GetCasketContents } from "@/request";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import Haha from './haha.json';

const getCaskets = (inventory: any)=> {
    return inventory.filter(function (row: any) {
      if (!row.item_url.includes('casket')) {
        return false; // skip
      }
      // if (row.item_storage_total == 0) {
      //   return false; // skip
      // }
      return true;
    })
}

const useStorage = () => {
  const { userInfo } = useModel('user');
  const [caskets, setCaskets] = useState<any[]>([]);
  const [casketsInventory, setCasketInventory] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo.steamID) return;
    const newCaskets = getCaskets(userInfo.csgoInventory);
    setCaskets(newCaskets);
    console.log('update caskets', newCaskets);
  }, [userInfo])

  const loadCasketsContent = async (caskets: any[]) => {
    // setCasketInventory(Haha);
    // return;
    setLoading(true);
    let contents: any = {...casketsInventory}; 
    try {
      for (let i = 0; i < caskets.length; i ++) {
        const casketId = caskets[i].item_id;
        const res = await GetCasketContents({id: casketId});
        if (res.status === 0) {
          contents[casketId] = res.data.map((item: any) => {item.casket_id = casketId; item.casket_name = caskets[i].item_customname; return item});
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setCasketInventory(contents);
    return contents;
  }

  return {caskets, casketsInventory, loading, loadCasketsContent};
}


export default useStorage;
