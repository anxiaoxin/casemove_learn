import { useModel } from "umi";
import { createCSGOImage } from "../../../api/createCSGOImage";
import EditImage from '../../../assets/images/edit.png';
import { useEffect, useState } from "react";
import useChanged from "@/utils/hooks/useChanged";
import Loading from "../../components/loading/loding";
import { Input, Tabs } from "antd-mobile";
import { excludeCasket } from "../../../api/filters/inventoryFunctions";
import MoveInImage from '../../../assets/images/存入.svg';
import MoveOutImage from '../../../assets/images/取出.svg';
import './index.less';
import eventBus from "@/utils/eventBus";
import { MoveIn, MoveOut, MultipleRequest } from "@/request";
import MoveDialog from "@/components/MoveDialog";
import useMoveDialog from "@/components/MoveDialog";

interface MoveHeaderProp {
    onSelected: (items: string[]) => void,
    onMove: (moveout: boolean) => void,
    moveOut: boolean,
}

interface SelectRowProp {
    data: any,
    onNumberChange: (id: string, num: number) => void,
    max: number,
    caskets: any
}

const MoveHeader = (props: MoveHeaderProp) => {
    const { onSelected, moveOut, onMove } = props;
    const { userInfo } = useModel('user');
    const { caskets, casketsInventory, loading, loadCasketsContent } = useModel('storages');
    const [selected, setSelected] = useState<string[]>([]);

    const updateSelected = (item: any) => {
        const tmp = [...selected];
        const index = tmp.indexOf(item.item_id);
        if (!moveOut ) {
            setSelected([item.item_id]);
            return;
        }
        if (index > -1) {
            tmp.splice(index, 1);
        } else {
           tmp.push(item.item_id);
        }
        setSelected(tmp);
    }

    useChanged(() => {
        onSelected(selected);
    }, [selected])

    return <>
        <div className="move-operate">
            当前库存：{userInfo?.accounts?.inventory}
            <div className="move-button">
              <span onClick={() => onMove(moveOut)}>
                {moveOut ? '取出' : '存入'}
                <img src={moveOut ? MoveOutImage : MoveInImage} alt="" />
              </span>
            </div>
        </div>
        <div className="move-container">
            <div className="move-storage-list">
                {caskets.map((item: any) => {
                    return <div className={selected.indexOf(item.item_id) > -1 ? "move-storage-item selected" : 'move-storage-item'}>
                        <div className="move-storage-image" onClick={()=> updateSelected(item)}>
                            <img src={createCSGOImage(item.item_url)} alt="" />
                        </div>
                        <div className="move-storage-info">
                            <div>名称:  <span>{item.item_customname} <img src={EditImage} alt="" /></span></div>
                            <div className="move-storage-number">已存储： <span>{item.item_storage_total}</span></div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </>
}

const SelectRow = (props: SelectRowProp) => {
    const { data, onNumberChange, max, caskets } = props;
    const [currentNum, setCurrentNum] = useState('0');
    const onInputChange = (value: string) => {
      let res:any = value;
        if (+value > data.combined_QTY) {
          res = data.combined_QTY;
        }
        if (+value < +currentNum) {
          setCurrentNum(value);
          return;
        }
        if (+value > max) {
          res = max;
        }
        setCurrentNum(res+'');
    }

    const selectAll = () => {
      if (max == 0) return;

      const num = data.combined_QTY < (+currentNum + max)  ? data.combined_QTY : (+currentNum + max);
      setCurrentNum(num);
    }

    const onFocus = () => {
        if (currentNum == '0') {
            setCurrentNum('');
        }
    }

    const onBlur = () => {
        if (currentNum == '') {
            setCurrentNum('0');
        }
    }

    useEffect(() => {
        onNumberChange(data.item_id, +currentNum);
    }, [currentNum])

    useEffect(() => {
      setCurrentNum('0');
    }, [caskets])

    return <>
    <div className="select-row">
        <div>
            <img src={createCSGOImage(data?.item_url)} alt="" />
            <div>{data.item_name}</div>
        </div>
        <div className="select-row-operate">
            <span>{data.combined_QTY}</span>
            <span className="select-row-input">
                <Input type="number" max={data.combined_QTY} onFocus={onFocus} onBlur={onBlur} value={currentNum} onChange={onInputChange} style={{'--font-size': '20'}}></Input>
            </span>
            <span className="select-row-all" onClick={selectAll}>全部</span>
        </div>
    </div>
    </>
}

const getCasketStorage = (id: string, caskets: any[]) => {
    for(let i = 0; i < caskets.length; i++) {
      if (caskets[i].item_id === id) {
        return caskets[i]?.item_storage_total;
      }
    }
    return 0;
}

const Move = () => {
    const [selectedCaskets, setSelectedCaskets] = useState<string[]>([]);
    const [currentTab, setCurrentTab] = useState<string>('movein');
    const [inventorys, setInventorys] = useState<any[]>([]);
    const { caskets, casketsInventory, loading, loadCasketsContent } = useModel('storages');
    const { userInfo } = useModel('user');
    const [currentSelected, setCurrentSelected] = useState<any[]>([]);
    const [remainingNum, setRemainingNum] = useState<number>(0)
    const { show } = useMoveDialog();

    const onSelectChange = (ids: string[]) => {
        setSelectedCaskets(ids);

        if (currentTab === 'moveout') {
            const needLoad:string[] = [];
            const items: any[] = [];
            selectedCaskets.filter(id => {
                if (!casketsInventory[id]) {
                    needLoad.push(id);
                } else {
                    items.push(...casketsInventory[id]);
                }
            })
            if (needLoad.length) {
                loadCasketsContent(needLoad);
            } else {
                setInventorys(items);
            }
        }

        if (currentTab === 'movein') {
          const id = ids[0];
         setRemainingNum(1000 - getCasketStorage(id, caskets));
        }
    }

    const onTabChange = (key: string) => {
        setCurrentTab(key);
    }

    const onNumberChange = (id: string, num: number) => {
        setCurrentSelected({...currentSelected, [id]: num});
    }

    useEffect(() => {
      let selectTotal = 0;
      for (let i in currentSelected) {
        selectTotal += currentSelected[i];
      }
      console.log('number', 1000 - getCasketStorage(selectedCaskets[0], caskets) - selectTotal, currentSelected);
      setRemainingNum(1000 - getCasketStorage(selectedCaskets[0], caskets) - selectTotal);
    }, [currentSelected])

    const onMove = (moveout: boolean) => {
      if (moveout) {

      }

      if (!moveout) {
        console.log(currentSelected, userInfo.combinedInventory);
        const ids = [];
        for (let id in currentSelected) {
          for (let i = 0; i < userInfo.combinedInventory.length; i++) {
            if (userInfo.combinedInventory[i].item_id === id) {
              try {
                ids.push(...userInfo.combinedInventory[i].combined_ids.slice(0, currentSelected[id]));
              } catch (error) {

              }
            }
          }
        }
        console.log('ids', ids);
        show({[selectedCaskets[0]]: ids}, moveout);
      }

    }

    return <>
        <Tabs onChange={onTabChange} activeKey={currentTab}>
          <Tabs.Tab title='存入' key='movein'>
            <MoveHeader onMove={onMove} onSelected={onSelectChange} moveOut={currentTab === 'moveout'} ></MoveHeader>
            <div>
                {excludeCasket(userInfo.combinedInventory).map((item: any)  => {
                    return <SelectRow caskets={selectedCaskets} max={remainingNum} data={item} onNumberChange={onNumberChange}></SelectRow>;
                })}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title='取出' key='moveout'>
            <MoveHeader onMove={onMove} onSelected={onSelectChange} moveOut={currentTab === 'moveout'}></MoveHeader>
            <div>
                {123}
            </div>
          </Tabs.Tab>
        </Tabs>

        {loading && <Loading></Loading>}
    </>
}
export default  Move;
