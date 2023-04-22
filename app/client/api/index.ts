export const getAccounts = (inventory: any) => {
  let total = 0
  let storage = 0;
  let storageInventory = 0;
    inventory.forEach((element: any) => {
      total += 1
      if (element.item_url == "econ/tools/casket") {
        total += element.item_storage_total;
        storage += element.item_storage_total;
        storageInventory += 1;
      }
    });
    return { total, storage, inventory: total - storage, storageInventory};
}

export const categoriesRGB = {
    'Agents': "rgba(255, 99, 132, 0.8)",
    'Collectibles & Passes': "rgba(153, 102, 255, 0.8)",
    'Containers': "rgba(54, 162, 235, 0.8)",
    'Patches': "rgba(99, 102, 241, 0.8)",
    'Music kits': "rgba(107, 114, 128, 0.8)",
    'Skins & Knives': "rgba(75, 192, 192, 0.8)",
    'Stickers': "rgba(255, 206, 86, 0.8)",
    'Tools': "rgba(255, 159, 64, 0.8)",
  };

export const categoriesBkRGB = {
    'Agents': "rgba(255, 99, 132, 0.2)",
    'Collectibles & Passes': "rgba(153, 102, 255, 0.2)",
    'Containers': "rgba(54, 162, 235, 0.2)",
    'Patches': "rgba(99, 102, 241, 0.2)",
    'Music kits': "rgba(107, 114, 128, 0.2)",
    'Skins & Knives': "rgba(75, 192, 192, 0.2)",
    'Stickers': "rgba(255, 206, 86, 0.2)",
    'Tools': "rgba(255, 159, 64, 0.2)",
  };
