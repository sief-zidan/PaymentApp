import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';


export default class MainPage extends React.Component {

    render() {
        return (
            <>

                <StatusBar
                    backgroundColor={'#5BCDBF'}
                />
                <View style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: '#5BCDBF',
                    alignItems: "center",
                    justifyContent: "center"

                }}>


                    <View
                        style={{
                            alignItems: "center",
                            width: "100%",
                            padding: 5,
                        }}
                    >

                        <View
                            style={{
                            }}
                        >


                            <Text style={{
                                color: '#000',
                                fontSize: 25,
                                textAlign: "center"

                            }}>الرئيسية</Text>
                        </View>



                    </View>


                </View>

                <ScrollView>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("MerchantsList")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            قائمة التجار
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("AddBill")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إضافة فاتورة بيع
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("Add_expenses")
                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إضافة مصروفات
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("OutStore")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            تصدير من المخزن
                        </Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("Store")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            الانتاج (مخزن)
                        </Text>

                    </TouchableOpacity>




























                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("Allsalarys")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            المرتبات
                        </Text>

                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("BuyingHistory")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            سجل المبيعات
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("ExpensesHistoey")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            سجل المصروفات
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("DelayPayment")
                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            سجل المتأخرات
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("Stats")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            أرباح
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("AddMerchent")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",
                            marginBottom: 20

                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إضافة تاجر
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate("AddProduct")
                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إضافة منتج
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Allproduct")

                        }}
                        style={{
                            height: 90, width: "90%", borderRadius: 20, justifyContent: "center"
                            , alignSelf: "center", marginTop: 20,
                            shadowColor: "#000",

                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            backgroundColor: "#fff",
                            marginBottom: 20

                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            عرض المنتجات
                        </Text>

                    </TouchableOpacity>

                </ScrollView>
            </>
        )
    }
}