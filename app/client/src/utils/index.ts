/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { PERMISSION_PATH_MAP } from '@/constants';
import { PathName } from '@/routes';
import { StringIndexMap } from '@/type';
import { registerShape, Chart, Geometry } from '@antv/g2';
import { Modal } from 'antd';
import permission from './permission';

export const comma = (num: string) => {
  const source = num.split('.'); //按小数点分成2部分
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,'); //只将整数部分进行都好分割
  return source.join('.'); //再将小数部分合并进来
};

export const genCost = (value: number) => {
  return `￥${comma((value || 0).toFixed(2))}`;
};

export const getSearchParam = (key: string) => {
  const url = location.search;
  const searchParams = new URLSearchParams(url);
  return searchParams.get(key);
};

export const initSliceShape = (
  data: any,
  dom: HTMLDivElement,
  config?: StringIndexMap,
) => {
  // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
  const sliceNumber = 0.005;

  registerShape('interval', 'slice-shape', {
    draw(cfg, container) {
      const points: any = cfg.points;
      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y - sliceNumber]);
      path.push(['L', points[2].x, points[2].y - sliceNumber]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = (this as any).parsePath(path);
      return container.addShape('path', {
        attrs: {
          fill: cfg.color,
          path,
        },
      });
    },
  });

  const chart = new Chart({
    container: dom,
    autoFit: true,
    width: config?.size?.width || 180,
    height: config?.size?.height || 180,
  });

  chart.data(data);
  chart.coordinate('theta', {
    radius: 0.75,
    innerRadius: 0.6,
  });

  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  });

  chart.legend(false);

  chart
    .annotation()
    .text({
      position: ['50%', '56%'],
      content: config?.value || '',
      style: {
        fontSize: 14,
        fill: 'black',
        textAlign: 'center',
      },
      offsetY: -20,
    })
    .text({
      position: ['50%', '70%'],
      content: config?.text || '',
      style: {
        fontSize: 12,
        fill: 'black',
        textAlign: 'center',
      },
      offsetY: -20,
    });

  chart
    .interval()
    .adjust('stack')
    .position('value')
    .color(
      'type',
      config?.color || ['#40A9FF', '#5D8DFA', '#90B0F8', '#C9D9FF'],
    )
    .size(14)
    .shape('slice-shape');

  chart.render();
};
export const filterByPer = (list: any[]) => {
  return list.filter((item) => {
    item.children = item.children?.filter((childItem: any) =>
      permission.hasPer(childItem.per),
    );
    return permission.hasPer(item.per);
  });
};

export const getPermissonPath = (currentPath: string) => {
  for (let i in PathName) {
    if (
      PathName[i] === currentPath &&
      permission.hasPer(PERMISSION_PATH_MAP[i])
    ) {
      return currentPath;
    }
  }

  for (let i in PERMISSION_PATH_MAP) {
    if (permission.hasPer(PERMISSION_PATH_MAP[i])) {
      return PathName[i];
    }
  }
};

export const DeleteModal = (config: any) => {
  Modal.confirm({
    title: '删除确定',
    okType: 'danger',
    okText: '确认',
    cancelText: '取消',
    // icon: null,
    ...config,
  });
};
