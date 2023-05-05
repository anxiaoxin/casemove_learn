import { MoveIn, MoveOut, MultipleRequest, RenameStorageUnit } from "@/request";
import { Dialog, Input, Modal } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import './index.less';
import { values } from "lodash";

interface MoveDialogProps {
  onNChange: (value: string) => void,
  onMChange: (value: string) => void,
}

const RenameContent = (props: MoveDialogProps) => {
  const { onNChange, onMChange } = props;
  const [name, setName] = useState('');
  const [m, setM] = useState('');

  const onNameChange = (value: string) => {
    setName(value);
    onNChange(value);
  }

  const onMMChange = (value: string) => {
    setM(value);
    onMChange(value);
  }


  return <>
    <div className="add-user-input">
      <Input onChange={onNameChange} placeholder="steam用户名" style={{'--font-size': '20px'}} value={name}></Input>
    </div>
    <div className="add-user-input">
      <Input type="number" onChange={onMMChange} placeholder="有效期，月为单位" style={{'--font-size': '20px'}} value={m}></Input>
    </div>
  </>
}

const useAddUserDialog = () => {
  const [loading, setLoading] = useState(false);
  const name = useRef('');
  const m = useRef('');
  const id = useRef('');
  const defaultName = useRef('');

  const show = (userInfo?: any) => {
    Dialog.confirm({
      content: <RenameContent onNChange={(value) => name.current = value} onMChange={(value) => m.current = value} ></RenameContent>,
      onConfirm: () => {
        console.log(name, m);
      }
    })
  }

  const hide = () => {
    Dialog.clear();
  }

  return {show, hide, loading};
}

export default useAddUserDialog;
