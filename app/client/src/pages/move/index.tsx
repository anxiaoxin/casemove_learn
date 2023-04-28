import { useModel } from "umi";
import { createCSGOImage } from "../../../api/createCSGOImage";
import EditImage from '../../../assets/images/edit.png';
import { useEffect, useState } from "react";
import useChanged from "@/utils/hooks/useChanged";
import Loading from "../../components/loading/loding";
import { Input, Modal, Tabs } from "antd-mobile";
import combineInventory, { excludeCasket, sortDataFunctionTwo } from "../../../api/filters/inventoryFunctions";
import MoveInImage from '../../../assets/images/存入.svg';
import MoveOutImage from '../../../assets/images/取出.svg';
import './index.less';
import useMoveDialog from "@/components/MoveDialog";
import useRenameDialog from "@/components/RenameDialog";

interface MoveHeaderProp {
    onSelected: (items: string[]) => void,
    onMove: (moveout: boolean) => void,
    moveOut: boolean,
}

interface SelectRowProp {
    data: any,
    onNumberChange: (id: string, num: number) => void,
    max: number,
    caskets: any,
    moveOut?: boolean
}

const MoveHeader = (props: MoveHeaderProp) => {
    const { onSelected, moveOut, onMove } = props;
    const { userInfo } = useModel('user');
    const { caskets } = useModel('storages');
    const [selected, setSelected] = useState<string[]>([]);
    const { show, loading } = useRenameDialog();
    console.log('casckets', caskets);

    const rename = (id: string, name: string) => {
      show(id, name);
    }

    const updateSelected = (item: any) => {
      if (item.item_customname === null) {
        Modal.alert({
          title: 'error',
          content: '请命名以激活该存储箱',
        });
        return;
      }
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
            <span>已隐藏{moveOut? "空箱": '满箱'}</span>
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
                    if (moveOut && item.item_storage_total === 0) {
                      return '';
                    }
                    if(!moveOut && item.item_storage_total === 1000) {
                      return '';
                    }
                    return <div className={selected.indexOf(item.item_id) > -1 ? "move-storage-item selected" : 'move-storage-item'}>
                        <div className="move-storage-image" onClick={()=> updateSelected(item)}>
                            <img src={createCSGOImage(item.item_url)} alt="" />
                        </div>
                        <div className="move-storage-info">
                            <div>名称:  <span>{item.item_customname} <img onClick={() => rename(item.item_id, item.item_customname)} src={EditImage} alt="" /></span></div>
                            <div className="move-storage-number">已存储： <span>{item.item_storage_total}</span></div>
                        </div>
                    </div>
                })}
            </div>
        </div>
        {loading && <Loading></Loading>}
    </>
}

const SelectRow = (props: SelectRowProp) => {
    const { data, onNumberChange, max, caskets, moveOut } = props;
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

    useEffect(() => {
      setCurrentNum('0');
    }, [data.combined_QTY])

    return <>
    <div className="select-row">
        <div className="select-image-container">
          <img src={createCSGOImage(data?.item_url)} alt="" />
        </div>
        <div className="select-row-operate">
            <div>{data.item_name}</div>
            <div >
              <span style={{color: 'rgb(5, 179, 5)', marginRight: 10}}>总数：{data.combined_QTY}</span>
              {moveOut && <span>所属箱：<span style={{color: '#1296db'}}>{data.casket_name}</span></span>}
            </div>
            <div>
              <span className="select-row-input">
                  <Input type="number" max={data.combined_QTY} onFocus={onFocus} onBlur={onBlur} value={currentNum} onChange={onInputChange} style={{'--font-size': '20'}}></Input>
              </span>
              <span className="select-row-all" onClick={selectAll}>全部</span>
            </div>
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
    const { userInfo, refresh } = useModel('user');
    const [currentSelected, setCurrentSelected] = useState<any[]>([]);
    const [remainingNum, setRemainingNum] = useState<number>(0)
    const { show, end, setEnd } = useMoveDialog();
    console.log('casketsInventory', casketsInventory);
    const onSelectChange = async (ids: string[]) => {
        setSelectedCaskets(ids);

        if (currentTab === 'moveout') {
            const needLoad:string[] = [];
            const items: any[] = [];
            console.log('total', userInfo.accounts.inventory);
            setRemainingNum(1000 - userInfo.accounts.inventory);
            ids.filter(id => {
                if (!casketsInventory[id]) {
                    needLoad.push(id);
                }
            })
            let casketsData = casketsInventory;

            if (needLoad.length) {
              casketsData = await loadCasketsContent(needLoad.map(item => {
                for(let i = 0; i < caskets.length;i++) {
                  if (caskets[i].item_id === item) {
                    return caskets[i];
                  }
                }
                return {item_id: item}
              }));
            }

            ids.filter(id => {
                if (casketsData[id]) {
                  items.push(...casketsData[id]);
                }
            })
            const combinedData = await combineInventory(items, {ignoreUnlock: true, ignoreCustomname: true, casket: true});
            setInventorys(sortDataFunctionTwo('QTY', combinedData, {}, {}));
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

    useChanged(() => {
      if (!selectedCaskets[0]) return;
      let selectTotal = 0;

      for (let i in currentSelected) {
        selectTotal += currentSelected[i];
      }

      console.log('moveout');
      if (currentTab === 'moveout') {
        setRemainingNum(1000 - userInfo.accounts.inventory - selectTotal);
      } else {
        setRemainingNum(1000 - getCasketStorage(selectedCaskets[0], caskets) - selectTotal);
      }
    }, [currentSelected])

    useChanged(() => {
      setCurrentSelected([]);
      setSelectedCaskets([]);
      setInventorys([]);
    }, [currentTab])

    const refreshInventory = async () => {
      const ids = selectedCaskets;
      if (currentTab === 'moveout') {
          const needLoad:string[] = [];
          const items: any[] = [];
          console.log('total', userInfo.accounts.inventory);
          setRemainingNum(1000 - userInfo.accounts.inventory);
          ids.filter(id => {
              if (!casketsInventory[id]) {
                  needLoad.push(id);
              }
          })
          let casketsData = casketsInventory;

          if (needLoad.length) {
            casketsData = await loadCasketsContent(needLoad.map(item => {
              for(let i = 0; i < caskets.length;i++) {
                if (caskets[i].item_id === item) {
                  return caskets[i];
                }
              }
              return {item_id: item}
            }));
          }

          ids.filter(id => {
              if (casketsData[id]) {
                items.push(...casketsData[id]);
              }
          })
          const combinedData = await combineInventory(items, {ignoreUnlock: true, ignoreCustomname: true, casket: true});
          setInventorys(sortDataFunctionTwo('QTY', combinedData, {}, {}));
        }
    }

    useChanged(() => {
      refreshInventory();
    }
    , [casketsInventory])

    const onMove = (moveout: boolean) => {
      if (moveout) {
        const ids:any = {};
        for (let id in currentSelected) {
          for (let i = 0; i < inventorys.length; i++) {
            if (inventorys[i].item_id === id) {
              try {
                ids[inventorys[i].casket_id] = [...inventorys[i].combined_ids.slice(0, currentSelected[id])];
              } catch (error) {

              }
            }
          }
        }
        console.log('ids', ids);
        show(ids, moveout);
      }

      if (!moveout) {
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

    useChanged(() => {
      if (end) {
        setTimeout(() => {
          refresh();
          loadCasketsContent(selectedCaskets.map(item => {
            for(let i = 0; i < caskets.length;i++) {
              if (caskets[i].item_id === item) {
                return caskets[i];
              }
            }
            return {item_id: item}
          }))
        }, 800)
        setEnd(false);
      }
    }, [end])

    console.log(1111, remainingNum);

    return <>
        <Tabs onChange={onTabChange} activeKey={currentTab}>
          <Tabs.Tab title='存入' key='movein'>
            <MoveHeader onMove={onMove} onSelected={onSelectChange} moveOut={currentTab === 'moveout'} ></MoveHeader>
            <div>
                {excludeCasket(userInfo.combinedInventory).map((item: any)  => {
                  if (!item.item_moveable) return '';
                  return <SelectRow caskets={selectedCaskets} max={remainingNum} data={item} onNumberChange={onNumberChange}></SelectRow>;
                })}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title='取出' key='moveout'>
            <MoveHeader onMove={onMove} onSelected={onSelectChange} moveOut={currentTab === 'moveout'}></MoveHeader>
            <div>
                {inventorys.map((item: any) => {
                  if (!item.item_moveable) return '';
                  return <SelectRow caskets={selectedCaskets} max={remainingNum} moveOut={currentTab === 'moveout'} data={item} onNumberChange={onNumberChange}></SelectRow>;
                })}
            </div>
          </Tabs.Tab>
        </Tabs>

        {loading && <Loading></Loading>}
    </>
}
export default  Move;
