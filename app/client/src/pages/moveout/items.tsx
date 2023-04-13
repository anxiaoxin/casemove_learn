import { GetCasketContents } from "@/request";
import combineInventory, { sortDataFunction } from "../../../api/filters/inventoryFunctions";
import { useEffect, useState } from "react";

  async function moveItems(items: any[]) {
    let key = (Math.random() + 1).toString(36).substring(7);
    let totalCount = 0;
    let queryNew = [] as any;
    for (const [, element] of Object.entries(items)) {
      let elemental = element as any;
      for (const [, itemID] of Object.entries(elemental[2])) {
        queryNew.push({
          payload: {
            name: elemental[3],
            number: items.length - totalCount,
            type: 'from',
            storageID: elemental[1],
            itemID: itemID,
            isLast: items.length - totalCount == 1,
            key: key,
          },
        });
        totalCount++;
      }
    }
    console.log('queryNew', queryNew);
  }

const itemFilter = async (data: any) => {
    let finalReturnData = await combineInventory(
      data,
      {},
      {
        storage_id: 'storageRow.item_id',
        storage_name: 'storageRow.item_customname',
      }
    );

    // finalReturnData = await sortDataFunction(
    //  'Storages',
    //   finalReturnData,
    //   this.state.pricingReducer.prices,
    //   this.state.settingsReducer?.source?.title
    // );

    data.forEach((element: any) => {
      element.storage_id = 'storageRow.item_id';
      element.storage_name = 'storageRow.item_customname';
    });

    return {
      combinedStorages: finalReturnData,
      rawStorages: data,
    };
}

const Items = () => {
  const [items, setItems]  = useState([]);

  useEffect(() => {
    GetCasketContents({}).then(data => {
      if (data.status === 0) {
        setItems(data.data);
        itemFilter(data.data).then(res => {
          console.log('filter', res);
        });
      }
    })
  }, [])

  return <>

  </>
}

export default Items;
