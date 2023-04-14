import ItemCard from "@/components/itemCard";
import { useEffect, useState } from "react";
import { useModel } from "umi";
import { Switch } from "antd-mobile";
import './index.less';

const Home = () => {
  const { userInfo, login } = useModel('user');
  const [switchChecked, setSwitchChecked ] = useState(false);

  useEffect(() => {
    login({});
  }, [])

  useEffect(() => {
    if (switchChecked) {

    } else {

    }
  }, [switchChecked])

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  return <>
    <div className="home-container">
      <div></div>
      <div>
        <div>总计：{userInfo.accounts?.total || 0}</div>
        <div>库存：{userInfo.accounts?.inventory || 0}</div>
        <div>存储箱：{userInfo.accounts?.storage || 0}</div>
        <div>存储箱个数：{userInfo.accounts?.storageInventory || 0}</div>
      </div>
      <div>
        库存总览：
          <Switch
            checked={switchChecked}
            onChange={val => {
              setSwitchChecked(val)
            }}
          />
      </div>
      <div>
        {userInfo.combinedInventory?.map((item: any) => {
          return <ItemCard info={item}></ItemCard>
        })}
      </div>
    </div>
  </>
}

export default Home;
