import { MoveIn, MoveOut, MultipleRequest } from "@/request";
import { Dialog } from "antd-mobile";
import { useEffect, useState } from "react";
import './index.less';

interface MoveDialogProps {
  idMap: any[],
  moveout: boolean,
  onEnd: () => void
}

const MoveDialog = (props: MoveDialogProps) => {
  const { idMap, moveout, onEnd } = props;
  const [ count, setCount ] = useState<number>(-1);
  const [res, setRes] = useState({succedNum: 0, failedNum: 0});
  const [flipClass, setFlipClass] = useState<string>('');
  console.log(idMap);

  useEffect(() => {
    const params:any = [];
    for (let id in idMap) {
      idMap[id].forEach((item: any) => params.push({casketId: id, itemId: item}));
    }

    console.log('params', params);
    setCount(params.length);

    MultipleRequest(moveout ? MoveOut : MoveIn, params, (res: any, finish: boolean ) => {
      setRes(res);
      console.log('finish', finish);
      if (finish) {
        onEnd();
      }
    })
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
        {count - res.succedNum}
      </div>
      <div>

      </div>
    </div>
  </>
}

const useMoveDialog = () => {
  const [end, setEnd] = useState(false);
  const show = (idMap: any, moveout: boolean) => {
    Dialog.show({
      content: <MoveDialog idMap={idMap} moveout={moveout} onEnd={() => {hide(); setEnd(true)}}></MoveDialog>,
      closeOnAction: true,
    })
  }

  const hide = () => {
    Dialog.clear();
  }

  return {show, hide, end, setEnd};
}

export default useMoveDialog;
