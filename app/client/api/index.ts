export const getAccounts = (inventory: any) => {
  let total = 0
  let storage = 0;
    inventory.forEach((element: any) => {
      total += 1
      if (element.item_url == "econ/tools/casket") {
        total += element.item_storage_total
        storage += element.item_storage_total
      }
    });
    return { total, storage};
}
