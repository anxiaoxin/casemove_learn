import { MoveIn, MoveOut, MultipleRequest } from "@/request";
import { Dialog } from "antd-mobile";
import { useEffect, useState } from "react";
import './index.less';

interface MoveDialogProps {
  idMap: any[],
  moveout: boolean
}

const MoveDialog = (props: MoveDialogProps) => {
  const { idMap, moveout } = props;
  const [ count, setCount ] = useState<number>(-1);
  const [ failedCount, setFailCount ] = useState<number>(0);
  const [flipClass, setFlipClass] = useState<string>('');
  console.log(idMap);

  useEffect(() => {
    const params:any = [];
    for (let id in idMap) {
      idMap[id].forEach((item: any) => params.push({cascketId: id, itemId: item}));
    }

    console.log('params', params);
    setCount(params.length);

    // MultipleRequest(moveout ? MoveOut : MoveIn, params, (res: any, finish: boolean ) => {
    //   console.log(res, finish);
    //   if (!res) setFailCount(failedCount + 1);
    //   setCount(count - 1);
    // })
  }, [])

  useEffect(() => {
    setFlipClass('flip');
    setTimeout(() => {
      setFlipClass('');
    }, 500);
  }, [count])

  return <>
    <div>
      <div className={`move-number bg-pan-right ${flipClass}`}>
        {count}
      </div>
      <div>

      </div>
    </div>
  </>
}

const useMoveDialog = () => {
  const show = (idMap: any, moveout: boolean) => {
    Dialog.show({
      content: <MoveDialog idMap={idMap} moveout={moveout}></MoveDialog>,
      closeOnAction: true,
    })
    setTimeout(hide, 120000);
  }

  const hide = () => {
    Dialog.clear();
  }

  return {show, hide};
}

export default useMoveDialog;
