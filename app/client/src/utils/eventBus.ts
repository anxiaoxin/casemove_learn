/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import { FunnelPlotFilled } from '@ant-design/icons';

class EventBus {
  eventMap: Map<string, ((params: any) => any)[]>;

  constructor() {
    this.eventMap = new Map();
  }

  on(event: string, cb: (params: any) => any) {
    const list = this.eventMap.get(event);
    this.eventMap.set(event, list ? [...list, cb] : [cb]);
  }

  off(event: string) {
    this.eventMap.delete(event);
  }

  emit(event: string, params?: StringIndexMap | string | number) {
    const list = this.eventMap.get(event);
    list?.filter((item) => {
      if (item instanceof Function) {
        item(params);
      }
    });
  }
}
export default new EventBus();
