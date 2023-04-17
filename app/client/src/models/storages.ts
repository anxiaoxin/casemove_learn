import { GetCasketContents } from "@/request";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import Haha from './haha.json';

const getCaskets = (inventory: any)=> {
    return inventory.filter(function (row: any) {
      if (!row.item_url.includes('casket')) {
        return false; // skip
      }
      if (row.item_storage_total == 0) {
        return false; // skip
      }
      return true;
    })
}

const useStorage = () => {
  const { userInfo } = useModel('user');
  const [caskets, setCaskets] = useState([]);
  const [casketsInventory, setCasketInventory] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo.steamID) return;
    setCaskets(getCaskets(userInfo.csgoInventory));
  }, [userInfo])

  const loadCasketsContent = async (caskets: any[]) => {
    setCasketInventory(Haha);
    return;
    setLoading(true);
    let contents: any = {}
    try {
      for (let i = 0; i < caskets.length; i ++) {
        const res = await GetCasketContents({id: caskets[i].item_id});
        if (res.status === 0) {
          contents[caskets[i].item_id] = res.data;
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setCasketInventory(contents);
  }

  return {caskets, casketsInventory, loading, loadCasketsContent};
}


export default useStorage;
