/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import useI18n from '@/utils/hooks/useI18n';
import { Radio, DatePicker, RadioChangeEvent } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useEffect, useState } from 'react';

export enum TypeGroup {
  Year = 'year',
  Month = 'month',
}

interface PickerProps {
  onChange: (dateString: string) => void;
}

const LTimePicker = (props: PickerProps) => {
  const { onChange: _onChange } = props;
  const I18n = useI18n();
  const [type, setType] = useState(TypeGroup.Month);
  const [value, setValue] = useState<Moment>(moment());

  useEffect(() => {
    _onChange(value?.format(type === TypeGroup.Year ? 'YYYY' : 'YYYY-MM'));
  }, [type]);

  const onChange = (value: any, dateString: string) => {
    setValue(value);
    _onChange(dateString);
  };

  return (
    <>
      <Radio.Group
        onChange={(e: RadioChangeEvent) => {
          setType(e.target.value);
        }}
        defaultValue={TypeGroup.Month}
        buttonStyle="solid"
      >
        <Radio.Button value={TypeGroup.Month}>{I18n('month')}</Radio.Button>
        <Radio.Button value={TypeGroup.Year}>{I18n('year')}</Radio.Button>
      </Radio.Group>
      <DatePicker
        locale={locale}
        value={value}
        style={{ margin: '0 16px' }}
        picker={type}
        onChange={onChange}
      />
    </>
  );
};

export default LTimePicker;
