/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { GetUserList, PostAssignUser } from '@/request';
import { StringIndexMap } from '@/type';
import useI18n from '@/utils/hooks/useI18n';
import { Modal, Select, Button, Radio } from 'antd';
import { useEffect, useState } from 'react';

const Option = Select.Option;
interface CoInfoProps {
  data?: StringIndexMap;
  visible?: boolean;
  onChange: (visible: boolean, saved?: boolean) => void;
}

const BindUserModal = (props: CoInfoProps) => {
  const { visible, onChange, data } = props;
  const I18n = useI18n();
  const [_visible, setVisible] = useState(visible);
  const [_data, setdata] = useState<any[]>([]);
  const [user, setuser] = useState<Number>();
  const [request, setrequest] = useState<object>();
  const select = (e: any) => {
    console.log(112, data);
    const userinfo: {
      vmGroupIdList: any[];
      userIdList: any[];
      vmOperation: any;
    } = {
      vmGroupIdList: [],
      userIdList: [],
      vmOperation: '',
    };
    userinfo.vmGroupIdList.push(data?.vmGroupId);
    userinfo.userIdList.push(e.target.value);
    if (data?.user.id == null) {
      userinfo.vmOperation = 'ASSIGN_USER';
    } else {
      userinfo.vmOperation = 'REASSIGN_USER';
    }
    setuser(e.target.value);
    setrequest(userinfo);
  };
  const queren = () => {
    PostAssignUser(request).then((rep: any) => {
      if (rep) {
        onChange(false);
      }
    });
  };
  useEffect(() => {
    GetUserList({})
      .then((rep: any) => {
        if (rep) {
          setdata(rep.result);
          setuser(data?.user.id);
        }
      })
      .finally(() => {
        setVisible(visible);
      });
  }, [visible]);
  return (
    <>
      <Modal
        title={I18n('select_user_permission')}
        centered
        visible={_visible}
        onCancel={() => {
          onChange(false);
        }}
        width={424}
        footer={
          <div
            onClick={() => {
              queren();
            }}
            style={{ textAlign: 'center' }}
          >
            <Button type="primary">{I18n('ok')}</Button>
          </div>
        }
      >
        <Radio.Group onChange={select} value={user}>
          {_data.map((item) => (
            <Radio value={item.id}>
              {item.name}({item.vmCount}组)
            </Radio>
          ))}
          ;
        </Radio.Group>
      </Modal>
    </>
  );
};

export default BindUserModal;
