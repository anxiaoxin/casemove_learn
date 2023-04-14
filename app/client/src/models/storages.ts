import { GetCasketContents } from "@/request";
import { useEffect, useState } from "react";
import { useModel } from "umi"

const getCaskets = (inventory: any)=> {
    return inventory.csgoInventory.filter(function (row: any) {
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
  const [casketsInventory, setCasketInventory] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo.steamID) return;
    setCaskets(getCaskets(userInfo.inventory));
  }, [userInfo])

  const loadCasketsContent = async (caskets: any[]) => {
    setLoading(true);
    let contents: any = {}
    try {
      for (let i = 0; i < caskets.length; i ++) {
        const res = await GetCasketContents({id: caskets[i]})
        if (res.status === 0) {
          contents[caskets[i]] = res.data;
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
