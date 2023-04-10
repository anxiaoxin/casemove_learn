/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import useI18n from '@/utils/hooks/useI18n';
import { Input, Card } from 'antd';
import { useEffect, useState } from 'react';
import { PERMISSIONS } from '@/constants';
import MyCheckBox from './MyCheckBox';
import './index.less';
import eventBus from '@/utils/eventBus';
import useChanged from '@/utils/hooks/useChanged';

interface RoleInfoProps {
  codes: string[];
  roleId: number | undefined;
  onChange: (codes: string[], remark: string) => void;
  remark: string;
}

const TextArea = Input.TextArea;

const Permissions = (props: { codes: string[]; disabled: boolean }) => {
  const { codes, disabled } = props;
  const I18n = useI18n();

  return (
    <>
      <Card
        headStyle={{
          background: '#fafafa',
          fontSize: 14,
        }}
        style={{ marginBottom: 20 }}
        title={`- - ${I18n('permission')}`}
      >
        <MyCheckBox
          config={{ value: '', children: PERMISSIONS }}
          deep={0}
          codes={codes}
          className="checkbox-all"
          disabled={disabled}
        />
      </Card>
    </>
  );
};

const RoleInfo = (props: RoleInfoProps) => {
  const { codes, onChange, remark, roleId } = props;
  const [des, setDes] = useState<string>(remark);
  const [codesTmp, setCodesTmp] = useState<string[]>([]);
  const I18n = useI18n();
  useEffect(() => {
    eventBus.on(
      'permissionChange',
      (data: { code: string; value: boolean }) => {
        if (data.value && codesTmp.indexOf(data.code) === -1) {
          codesTmp.push(data.code);
          setCodesTmp([...codesTmp]);
        } else if (!data.value && codesTmp.indexOf(data.code) > -1) {
          codesTmp.splice(codesTmp.indexOf(data.code), 1);
          setCodesTmp([...codesTmp]);
        }
      },
    );

    return () => {
      eventBus.off('permissionChange');
      eventBus.off('selectChanged');
    };
  }, []);

  useChanged(() => {
    onChange(codesTmp, des);
  }, [codesTmp, des]);

  useEffect(() => {
    setDes(remark);
  }, [remark]);

  return (
    <>
      <div>
        <Card
          headStyle={{
            background: '#fafafa',
            fontSize: 14,
          }}
          style={{ marginBottom: 20 }}
          title={I18n('role_des')}
        >
          <TextArea
            value={des}
            onChange={(e) => setDes(e.target.value)}
            placeholder={I18n('role_des_placeholder')}
            // autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Card>
        <Permissions codes={codes} disabled={roleId === 1} />
      </div>
    </>
  );
};

export default RoleInfo;
