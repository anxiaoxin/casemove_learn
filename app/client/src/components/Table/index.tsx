/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { Get, Post } from '@/request';
import { StringIndexMap } from '@/type';
import useChanged from '@/utils/hooks/useChanged';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, {
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import NoData from '@/assets/images/img_nodata@2x.png';
import NoContent from '@/assets/images/img_nodata@2x.png';
import ArrayDown from '@/assets/images/arrow_down@2x.png';
import './index.less';
import useI18n from '@/utils/hooks/useI18n';

interface LTableProps {
  url: string;
  columns: ColumnsType<any>;
  expandedRowRender?: (
    record: any,
    index: number,
    indent: number,
    expanded: boolean,
  ) => ReactNode;
  onLoaded?: (data: any) => void;
  params?: StringIndexMap;
  style?: React.CSSProperties;
  load?: boolean;
  id?: string;
  pagination?: boolean;
  filter?: (data: any) => any[];
  requestType?: string;
}

interface ParamsProps {
  asc: string[];
  desc: string[];
  pageNumber: number;
  pageSize: number;
}

enum OrderType {
  Ascend = 'ascend',
  Dscend = 'descend',
}

const renderEmpty = (_params: any) => {
  const I18n = useI18n();
  return (
    <>
      <div>
        <img
          className=""
          style={{
            maxWidth: 360,
            width: '100%',
          }}
          src={_params ? NoContent : NoData}
          alt=""
        />
      </div>
      {I18n(_params ? 'empty_content' : 'empty_data')}
    </>
  );
};

// 分页相关hook
const usePagination = () => {
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState({ order: '', key: '' });

  return {
    pageSize,
    setPageSize,
    total,
    setTotal,
    currentPage,
    setCurrentPage,
    order,
    setOrder,
  };
};

const useRequest = (
  load: boolean,
  filter?: (data: any) => any[],
  onLoaded?: (data: any) => void,
  requestType = 'Get',
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const request = async (url: string, params: StringIndexMap) => {
    if (!load) return;
    setLoading(true);
    try {
      let res;
      if (requestType === 'Get') {
        res = await Get(url, params);
      } else {
        res = await Post(url, params);
      }
      const result = Array.isArray(res.result)
        ? res.result
        : res.result?.resultList;
      const data =
        result?.map((item: any, index: number) => {
          item.key = index;
          return item;
        }) || [];

      setDataSource(filter ? filter(data) : data);
      onLoaded ? onLoaded(data) : data;
      setLoading(false);

      return res.result.totalCount;
    } catch (error) {
      setLoading(false);
    }
  };
  return { loading, dataSource, request };
};

const useParams = () => {
  const [params, setParams] = useState<ParamsProps>({
    asc: [],
    desc: [],
    pageNumber: 1,
    pageSize: 20,
  });

  return { params, setParams };
};

const LTable = React.forwardRef(
  (props: LTableProps, ref: Ref<unknown> | undefined) => {
    const {
      url,
      columns,
      expandedRowRender,
      params: _params,
      style,
      load = true,
      id = '',
      filter,
      onLoaded,
      pagination,
      requestType = 'Get',
    } = props;
    const { params, setParams } = useParams();
    const {
      pageSize,
      setPageSize,
      total,
      setTotal,
      setCurrentPage,
      setOrder,
      currentPage,
      order,
    } = usePagination();
    const { loading, dataSource, request } = useRequest(
      load,
      filter,
      onLoaded,
      requestType,
    );

    const refresh = () => {
      setTimeout(() => {
        request(url, params);
      }, 500);
    };

    useImperativeHandle(ref, () => ({
      refresh,
    }));

    useEffect(() => {
      request(url, { ...params, ...(_params || {}) }).then((total) => {
        setTotal(total);
      });
    }, [params, _params]);

    useChanged(() => {
      setParams({
        asc: order.order === OrderType.Ascend ? [order.key] : [],
        desc: order.order === OrderType.Dscend ? [order.key] : [],
        pageNumber: currentPage,
        pageSize: pageSize,
      });
    }, [pageSize, currentPage, order]);

    return (
      <>
        <ConfigProvider renderEmpty={() => renderEmpty(_params)}>
          <Table
            style={style}
            id={id}
            scroll={{ y: 'calc(100vh - 310px)' }}
            pagination={
              pagination === false
                ? false
                : {
                    size: 'small',
                    showSizeChanger: true,
                    pageSize: pageSize,
                    pageSizeOptions: ['20', '50', '100'],
                    total: total,
                    locale: {
                      items_per_page: '/ 页',
                    },
                  }
            }
            rowClassName={(record) => {
              let className = 'light-row';
              if (record.vmList) {
                record.vmList.forEach((item: { bck: boolean }) => {
                  if (item.bck === false) {
                    className = 'light-row';
                  } else if (item.bck === true) {
                    className = 'dark-row';
                  }
                });
              }
              return className;
              // if (index % 2 === 1) className = 'dark-row';
              // return className;
            }}
            dataSource={dataSource}
            columns={columns}
            onChange={(pagination, filters, sorter: any, extra) => {
              console.log(pagination);
              setPageSize(pagination.pageSize || 20);
              setCurrentPage(pagination.current || 1);
              setOrder({ order: sorter.order, key: sorter.field });
            }}
            // loading={loading}
            expandable={
              expandedRowRender
                ? {
                    expandedRowRender: expandedRowRender,
                    expandIcon: ({ expanded, onExpand, record }) => (
                      <img
                        src={ArrayDown}
                        alt=""
                        style={{ width: 16, cursor: 'pointer' }}
                        onClick={(e) => onExpand(record, e)}
                      />
                    ),
                  }
                : undefined
            }
          />
        </ConfigProvider>
      </>
    );
  },
);

export default LTable;
