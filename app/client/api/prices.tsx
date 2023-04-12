import { GetPrice } from '@/request';
import { ItemRow } from '../interfaces/items';
import { Prices, Settings } from '../interfaces/states';
// import { pricing_add_to_requested } from 'renderer/store/actions/pricingActions';

export class ConvertPrices {
  settingsData: Settings;
  prices: Prices;

  constructor(settingsData: Settings, prices: Prices) {
    this.settingsData = settingsData;
    this.prices = prices;
  }

  _getName(itemRow: ItemRow) {
    return itemRow.item_name + itemRow.item_wear_name || '';
  }

  getPrice(itemRow:ItemRow, nanToZero=false) {
    let itemPrice =
      (this.prices.prices as any)[this._getName(itemRow)]?.[
        this.settingsData.source.title
      ] * this.settingsData.currencyPrice[this.settingsData.currency];

    if (nanToZero && isNaN(itemPrice)) {
      return 0
    }

    return itemPrice
  }
}

export class ConvertPricesFormatted extends ConvertPrices {
  constructor(settingsData: Settings, prices: Prices) {
    super(settingsData, prices);
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat(this.settingsData.locale, {
      style: 'currency',
      currency: this.settingsData.currency,
    }).format(price);
  }

  getFormattedPrice(itemRow: ItemRow) {
    return this.formatPrice(this.getPrice(itemRow));
  }
  getFormattedPriceCombined(itemRow: ItemRow) {
    let comQty = itemRow?.combined_QTY as number;
    return new Intl.NumberFormat(this.settingsData.locale, {
      style: 'currency',
      currency: this.settingsData.currency,
    }).format(comQty * this.getPrice(itemRow));
  }
}

async function requestPrice(priceToGet: Array<ItemRow>) {
  // window.electron.ipcRenderer.getPrice(priceToGet);
}

async function dispatchRequested(
  dispatch: Function,
  rowsToGet: Array<ItemRow>
) {
  // dispatch(pricing_add_to_requested(rowsToGet));
}

export class RequestPrices extends ConvertPrices {
  dispatch: Function;
  constructor(dispatch: Function, settingsData: Settings, prices: Prices) {
    super(settingsData, prices);
    this.dispatch = dispatch;
  }

  _checkRequested(itemRow: ItemRow): boolean {
    return (
      this.prices.productsRequested.includes(this._getName(itemRow)) == false
    );
  }

  handleRequested(itemRow: ItemRow): void {
    if (isNaN(this.getPrice(itemRow)) == true && this._checkRequested(itemRow)) {
      let rowsToSend = [itemRow];
      requestPrice(rowsToSend);
      dispatchRequested(this.dispatch, rowsToSend);
    }
  }

  handleRequestArray(itemRows: Array<ItemRow>): void {
    let rowsToSend = [] as Array<ItemRow>
    itemRows.forEach((itemRow) => {
      if (isNaN(this.getPrice(itemRow)) == true && this._checkRequested(itemRow)) {
        rowsToSend.push(itemRow)
      }
    });
    if (rowsToSend.length > 0) {
      requestPrice(rowsToSend);
      dispatchRequested(this.dispatch, rowsToSend);

    }
  }
}

class Price {
  loading = true;
  prices = {};

  constructor() {
    console.log(222223333444);
    this.getPrices({});
  }

  getPrices(items: any) {
    GetPrice({items}).then(data => {
      this.prices = data.data;
      this.loading = false;
    })
  }
}

export default new Price();
