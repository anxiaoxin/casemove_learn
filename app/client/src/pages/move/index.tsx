import { useModel } from "umi";
import './index.less';
import { createCSGOImage } from "../../../api/createCSGOImage";
import EditImage from '../../../assets/images/edit.png';
import { useEffect, useState } from "react";
import useChanged from "@/utils/hooks/useChanged";
import Loading from "../../components/loading/loding";
import { Input, Tabs } from "antd-mobile";
import { excludeCasket } from "../../../api/filters/inventoryFunctions";

interface MoveHeaderProp {
    onSelected: (items: string[]) => void,
    moveOut?: boolean
}

interface SelectRowProp {
    data: any,
    onNumberChange: (id: string, num: number) => void
}

const MoveHeader = (props: MoveHeaderProp) => {
    const { onSelected, moveOut } = props;
    const { userInfo } = useModel('user');
    const { caskets, casketsInventory, loading, loadCasketsContent } = useModel('storages');
    const [selected, setSelected] = useState<string[]>([]);

    const updateSelected = (item: any) => {
        console.log(item);
        const tmp = [...selected];
        const index = tmp.indexOf(item.item_id);
        if (!moveOut ) {
            setSelected(item.item_id);
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
        <div>
            当前库存：{userInfo?.accounts?.inventory}
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
    const { data, onNumberChange } = props;
    const [currentNum, setCurrentNum] = useState('0');
    const onInputChange = (value: string) => {
        console.log(value);
        if (+value > data.combined_QTY) {
            setCurrentNum(data.combined_QTY)
        }
        setCurrentNum(value);
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
            <span className="select-row-all">全部</span>
        </div>
    </div>
    </>
}

const Move = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [currentTab, setCurrentTab] = useState<string>('movein');
    const [inventorys, setInventorys] = useState<any[]>([]);
    const { caskets, casketsInventory, loading, loadCasketsContent } = useModel('storages');
    const { userInfo } = useModel('user');
    const [currentSelected, setCurrentSelected] = useState<string[]>([]);
    const [remainingNum, setRemainingNum] = useState<number>(userInfo.accounts.total)

    const onSelectChange = (ids: string[]) => {
        setSelected(ids);

        if (currentTab === 'moveout') {
            const needLoad:string[] = []; 
            const items: any[] = [];
            selected.filter(id => {
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
    }
    
    const onTabChange = (key: string) => {
        setCurrentTab(key);
    }

    const onNumberChange = (id: string, num: number) => {
        console.log(id, num)
    }

    return <>
        <Tabs onChange={onTabChange} activeKey={currentTab}>
          <Tabs.Tab title='存入' key='movein'>
            <MoveHeader onSelected={onSelectChange}></MoveHeader>
            <div>
                {excludeCasket(userInfo.combinedInventory).map((item: any)  => {
                    console.log(item);
                    return <SelectRow data={item} onNumberChange={onNumberChange}></SelectRow>;
                })}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title='取出' key='moveout'>
            <MoveHeader onSelected={onSelectChange}></MoveHeader>
          </Tabs.Tab>
        </Tabs>

        {loading && <Loading></Loading>}
    </>
}
export default  Move;