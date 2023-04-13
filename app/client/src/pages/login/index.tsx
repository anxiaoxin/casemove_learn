import React, { useEffect } from 'react';
import { RefresInventory, UserLogin } from "@/request";
import { Form, Button, Input } from "antd-mobile";
import { getProfilePicture } from '../../../api/createCSGOImage';
import {  ConvertPrices } from '../../../api/prices';
import { getAccounts } from '../../../api/index';
import combineInventory from '../../../api/filters/inventoryFunctions';
import ResData from './res.json';
import SteamLogo from '../../../assets/images/logo_steam.svg';
import './index.less';
import Loading from '@/components/loading/loding';

// import prices from '../../../api/prices';

const filterData = async (data: any) => {
  console.log(data);
  // const picture = await getProfilePicture(data.steamID);
  let combinedInventory  = await combineInventory(data.csgoInventory, {});
  let accounts = getAccounts(data.csgoInventory);
  console.log(combinedInventory, accounts);

  // // Inventory prices
  // const PricingClass = new ConvertPrices(settingsData, currentState.pricingReducer)
  // let inventoryValue = 0
  // inventory.combinedInventory.forEach(element => {
  //   const itemPrice = PricingClass.getPrice(element)
  //   if (!isNaN(itemPrice)) {
  //     inventoryValue += itemPrice * element.combined_QTY
  //   }
  // });

  // let storageUnitsValue = 0
  // inventory.storageInventory.forEach(element => {
  //   const itemPrice = PricingClass.getPrice(element)
  //   if (!isNaN(itemPrice)) {
  //     storageUnitsValue += itemPrice * element.combined_QTY
  //   }
  // });
}

const Login = () => {
  // console.log(prices.loading);
  const onFinish = (values:any) => {
    console.log(values);
    UserLogin(values).then((data: any) => {
      filterData(data.data);
      // RefresInventory({}).then(data => {
      //   console.log(data);
      // })
    })
  }

  useEffect(() => {
    // filterData(ResData);
  }, [])
  // return <></>
  return <>
    <div className='container'>
      <div className='app-logo-container'>
         CSGO TOOLS
      </div>

      <div className='login-card'>
        <div className='login-logo-container'>
          <img width={180} src={SteamLogo} alt="" />
          Connect to Steam
        </div>
        <Form
        layout='vertical'
        onFinish={onFinish}
        mode='card'
        footer={
          <Button block type='submit'  
            style={{backgroundColor: 'rgb(79, 70, 225)', color: 'white', borderColor: 'rgb(79, 70, 225)'}} 
            size='large'>
            登录
          </Button>
          }
        >
          <Form.Item
            name='accountName'
            label='Steam用户名'
            rules={[{ required: true, message: '用户名不能为空' }]}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Steam密码'
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input placeholder='请输入密码' type='password' />
          </Form.Item>
          <Form.Item
            name='twoFactorCode'
            label='令牌'
            rules={[{ required: true, message: '请输入令牌' }]}
          >
            <Input placeholder='请输入令牌' />
          </Form.Item>
        </Form>
      </div>
    </div>
    <Loading></Loading>
  </>;
}

export default Login;

