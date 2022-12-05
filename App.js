import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  // AsyncStorage,
  ActivityIndicator,
} from 'react-native';


import { createStackNavigator } from 'react-navigation-stack';


import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import MainPage from "./screens/MainPage"
import MerchantsList from "./screens/MerchantsList"
import MerchentDetils from "./screens/MerchentDetils"
import BuyingHistory from "./screens/BuyingHistory"
import ExpensesHistoey from "./screens/ExpensesHistoey"
import OrderDetils from "./screens/OrderDetils"
import AddMerchent from "./screens/AddMerchent"
import AddProduct from "./screens/AddProduct"
import AddBill from "./screens/AddBill"
import Add_expenses from "./screens/Add_expenses"
import DelayPayment from "./screens/DelayPayment"
import AddSalary from "./screens/addSalary"
import Allsalarys from "./screens/Allsalarys"
import Salarydetils from "./screens/Salarydetils"
import OutStore from "./screens/OutStore"
import Store from "./screens/Store"
import Stats from "./screens/Stats"

import StateDetils from "./screens/StateDetils"
import Allproduct from "./screens/Allproduct"












class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const Pages = createStackNavigator(
  {
    MainPage: {
      screen: MainPage,
    },
    MerchantsList: {
      screen: MerchantsList,
    },
    MerchentDetils: {
      screen: MerchentDetils,
    },
    BuyingHistory: {
      screen: BuyingHistory,
    },
    ExpensesHistoey: {
      screen: ExpensesHistoey,
    }, OrderDetils: {
      screen: OrderDetils,
    },
    AddMerchent: {
      screen: AddMerchent,
    },
    AddProduct: {
      screen: AddProduct,
    },
    AddBill: {
      screen: AddBill,
    },
    DelayPayment: {
      screen: DelayPayment,
    },
    Add_expenses: {
      screen: Add_expenses,
    },
    AddSalary: {
      screen: AddSalary,
    },
    Allsalarys: {
      screen: Allsalarys,
    },
    Salarydetils: {
      screen: Salarydetils,
    },
    OutStore: {
      screen: OutStore,
    },
    Store: {
      screen: Store,
    },
    Stats: {
      screen: Stats,
    },

    StateDetils: {
      screen: StateDetils,
    }, Allproduct: {
      screen: Allproduct,
    },
  },
  { headerMode: 'none' },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: Pages,

    },
    {
      initialRouteName: 'App',
    },
  ),
);
