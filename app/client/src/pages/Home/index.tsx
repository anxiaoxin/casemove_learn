import ItemCard from "@/components/itemCard";
import { useEffect, useState } from "react";
import { history, useModel } from "umi";
import { Divider, Switch, TabBar } from "antd-mobile";
import './index.less';
import Loading from "../../components/loading/loding";
import useChanged from "@/utils/hooks/useChanged";
import { combineData } from "@/models/user";
import { sortDataFunctionTwo } from "../../../api/filters/inventoryFunctions";
import SteamLogo from '../../../assets/images/logo_steam.svg';
import { PathName } from "@/constants";

const Home = () => {
  const { userInfo, loading: userLoading, getUserInfo } = useModel('user');
  const { caskets, casketsInventory, loading, loadCasketsContent } = useModel('storages');
  const [switchChecked, setSwitchChecked ] = useState(false);
  const [items, setItems ] = useState<any[]>([]);

  useChanged(() => {
    if (switchChecked) {
      loadCasketsContent(caskets);
    } else {

    }
    updateItems();
  }, [switchChecked])

  useChanged(() => {
    updateItems();
  }, [casketsInventory])

  useEffect(() => {
    if (!userInfo) {
      getUserInfo();
    } else {
      updateItems();
    }
  }, [userInfo])

  const updateItems = () => {
    console.log(casketsInventory);
    if (!switchChecked) {
      combineData(userInfo.csgoInventory).then(data => {
        console.log(data);
        setItems(sortDataFunctionTwo('QTY', data.combinedInventory, {},{}))
      })
    } else {
      const items = [...userInfo.csgoInventory];
      Object.values(casketsInventory).forEach((item: any) => items.push(...item));
      combineData(items).then(data => {
        console.log(data);
        setItems(sortDataFunctionTwo('QTY', data.combinedInventory, {},{}))
      })
    }
  }

  const pageToMove = () => {
    history.push(PathName.move);
  }

  return <>
    <div className="home-container">
      <div className="home-head">
        <div>
          <img width={180} src={SteamLogo} alt="" />
          <div style={{textAlign: 'right'}}>
            CSGO TOOLS
            <div>你好，{userInfo?.displayName}</div>
          </div> 
        </div>
      </div>
      <div className="home-info">
        <div className="home-info-left">
          库存
          <div>
            总计：<span>{userInfo?.accounts?.total || 0}</span>
          </div>
          <div>库存：<span>{userInfo?.accounts?.inventory || 0}</span></div>
          <div>存储箱库存：<span>{userInfo?.accounts?.storage || 0}</span></div>
        </div>
        <span className="divider"></span>
        <div>
          存储箱个数：{userInfo?.accounts?.storageInventory || 0}
          <div style={{marginTop: 8}}>
            <div className="move-button" onClick={pageToMove}>存/取</div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="inventory-name">
        库存总览：
        <div>
          <span style={{paddingRight: 8}}>提取存储箱</span> 
          <Switch
            checked={switchChecked}
            onChange={val => {
              setSwitchChecked(val)
            }}
          />
        </div>
      </div>
      <div className="item-body">
        {items.map((item: any) => {
          return <ItemCard info={item}></ItemCard>
        })}
      </div>
    </div>
    {/* <TabBar activeKey={activeKey} onChange={setActiveKey}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar> */}
    {(loading || userLoading) && <Loading></Loading>}
  </>
}

export default Home;
