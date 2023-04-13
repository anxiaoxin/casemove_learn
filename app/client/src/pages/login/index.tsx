import React, { useEffect } from 'react';
import { RefresInventory, UserLogin } from "@/request";
import { Form, Button, Input } from "antd-mobile";
import { getProfilePicture } from '../../../api/createCSGOImage';
import {  ConvertPrices } from '../../../api/prices';
import { getAccounts } from '../../../api/index';
import combineInventory from '../../../api/filters/inventoryFunctions';
import ResData from './res.json';
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
    <Form
    layout='horizontal'
    onFinish={onFinish}
    footer={
      <Button block type='submit' color='primary' size='large'>
        登录
      </Button>
      }
    >
      <Form.Item
        name='accountName'
        label='姓名'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' value='listen_tiana' />
      </Form.Item>
      <Form.Item
        name='password'
        label='密码'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' type='password' value='li@980828298' />
      </Form.Item>
      <Form.Item
        name='twoFactorCode'
        label='令牌'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' />
      </Form.Item>
    </Form>
  </>;
}

export default Login;

