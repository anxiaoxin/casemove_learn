/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import SliceShape from './SliceShape';
import { COST_TABLE_HEADER } from '@/constants';
import useI18n from '@/utils/hooks/useI18n';
import { Progress } from 'antd';
import { genCost } from '@/utils';
import Permission from '@/components/Permission';
import './index.less';

const color1 = ['#40A9FF', '#5D8DFA', '#90B0F8', '#C9D9FF'];
const color2 = ['#52B024', '#84D75B', '#B5EA9B', '#D3F8C1'];

const CostLine = (props: { data: any }) => {
  const { data } = props;
  const total = data.values[0] + data.values[1];
  return (
    <>
      <div className="cost-line">
        <span>{data.title}</span>
        <div style={{ flex: 1 }}>
          <Permission per="2-2-2">
            <Progress
              style={{ bottom: -5 }}
              percent={(data.values[0] * 100) / total}
              showInfo={false}
              strokeColor="#5D8DFA"
              strokeWidth={4}
            />
          </Permission>
          <Permission per="2-2-1">
            <Progress
              style={{ top: -5 }}
              percent={(data.values[1] * 100) / total}
              showInfo={false}
              strokeColor="#84D75B"
              strokeWidth={4}
            />
          </Permission>
        </div>
      </div>
    </>
  );
};

const CostExpand = (props: any) => {
  const I18n = useI18n();

  const record = props.data;

  const lines = [
    {
      title: I18n(COST_TABLE_HEADER.cloudPc),
      values: [record.vmCoAmount, record.vmExAmount],
    },
    {
      title: I18n(COST_TABLE_HEADER.outboundFlow),
      values: [record.netCoAmount, record.netExAmount],
    },
    {
      title: I18n(COST_TABLE_HEADER.coStorage),
      values: [record.esCoAmount, record.esExAmount],
    },
    {
      title: I18n(COST_TABLE_HEADER.backupCapacity),
      values: [record.snCoAmount, record.snExAmount],
    },
  ];

  const chartData = lines.reduce(
    (
      pre: Array<Array<{ type: string; value: number }>>,
      item: { title: string; values: string[] },
      index: number,
    ) => {
      pre[0].push({
        type: lines[index].title,
        value: lines[index].values[0],
      });
      pre[1].push({
        type: lines[index].title,
        value: lines[index].values[1],
      });
      return pre;
    },
    [[], []],
  );

  return (
    <>
      <div className="cost-expand-container">
        <div className="cost-expand-left">
          收益 <span>{genCost(record.exAmount - record.coAmount)}</span>
          <div>
            <Permission per="2-2-2">
              <SliceShape
                data={chartData[0]}
                config={{
                  color: color1,
                  text: I18n('cost_reference'),
                  value: genCost(record.coAmount),
                }}
              />
            </Permission>
            <Permission per="2-2-1">
              <SliceShape
                data={chartData[1]}
                config={{
                  color: color2,
                  text: I18n('co_payment'),
                  value: genCost(record.exAmount),
                }}
              />
            </Permission>
          </div>
        </div>
        <div className="cost-expand-mid"></div>
        <div className="cost-expand-right">
          <div style={{ flex: 1 }}>
            {lines.map((line, index) => (
              <CostLine data={line} />
            ))}
          </div>
          <div>
            {lines.map((line) => (
              <div className="line-value">
                {genCost(line.values[1] - line.values[0])}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CostExpand;
