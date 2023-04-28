import { MoveIn, MoveOut, MultipleRequest, RenameStorageUnit } from "@/request";
import { Dialog, Input, Modal } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import './index.less';
import { useModel } from "umi";

interface MoveDialogProps {
  onNameChange: (value: string) => void,
  defaultName: string
}

const RenameContent = (props: MoveDialogProps) => {
  const { onNameChange, defaultName } = props;
  const [value, setValue] = useState(defaultName);

  const onChange = (value: string) => {
    setValue(value);
    onNameChange(value);
  }

  return <>
    <div className="rename-input">
      <Input onChange={onChange} style={{'--font-size': '24px'}} value={value}></Input>
    </div>
  </>
}

const useRenameDialog = () => {
  const [loading, setLoading] = useState(false);
  const { renameCaskets } = useModel('storages');
  const name = useRef('');
  const id = useRef('');
  const defaultName = useRef('');

  const rename = () => {
    console.log(id.current, name.current);
    if (id.current && name.current) {
      setLoading(true);
      RenameStorageUnit({ casketId: id.current, name: name.current}).then(data => {
        renameCaskets(id.current, name.current);
      }).finally(() => {
        setLoading(false);
        if(defaultName.current === null) {
          Modal.alert({
            content: '箱子已激活，请等待3分钟在进行存储操作。'
          })
        }
      })
    }
  }

  const show = (itemId: string, dname: string) => {
    id.current = itemId;
    defaultName.current = dname;
    Dialog.confirm({
      content: <RenameContent onNameChange={(value) => name.current = value} defaultName={dname}></RenameContent>,
      onConfirm: () => {
        rename();
      }
    })
  }

  const hide = () => {
    Dialog.clear();
  }

  return {show, hide, loading};
}

export default useRenameDialog;

