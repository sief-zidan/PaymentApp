import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, Alert, Modal, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Axios from "axios";
function Add_expenses(props) {


    const [expense_name, setexpense_name] = useState("");
    const [expense_price, setexpense_price] = useState("");


    const [Loading, setLoading] = useState(false);






    function sendData(data_to_send) {

        setLoading(true)
        Axios.post("https://camp-coding.org/ZFactory/add_expenses.php", data_to_send).then(res => {
            if (res.status == 200) {
                // alert(JSON.stringify(res.data))
                if ((res.data) == "success") {

                    setexpense_name("")
                    setexpense_price("")

                    Alert.alert("زيدانكو", "تم اضافة المصروف بنجاح")
                    setTimeout(() => {
                        props.navigation.goBack()
                    }, 1000);
                }
                else
                    alert("حدث خطأ اثناء الإضافة")
            } else {

                alert("حدث خطأ تأكد من الإتصال بالانترنت")

            }

            setLoading(false)




        });
    }







    return (<>
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
                    flexDirection: "row",
                    padding: 5,
                    justifyContent: "space-between",
                }}
            >

                <View
                    style={{
                        // flex: 1,
                        paddingLeft: 20,
                    }}
                >


                    <Text style={{
                        color: '#000',
                        fontSize: 25,

                    }}> إضافة مصروفات</Text>
                </View>


                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: 10,

                    }}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Icon
                        name={"arrow-left"}
                        size={25}
                        color='#000'

                    />
                </TouchableOpacity>

            </View>


        </View>

        <View style={{ padding: SIZES.padding, flex: 1 }}>
            <ScrollView>



                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                    <Text style={[FONTS.h3, { color: "#000" }]}> اسم المصروف
                        :</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setexpense_name(text)
                        }}

                        placeholder='ادخل اسم المصروف'
                        placeholderTextColor={"#ddd"}
                        style={{
                            width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily,
                            color: "#000"
                        }}
                    >

                    </TextInput>


                </View>

                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                    <Text style={[FONTS.h3, { color: "#000" }]}> سعر المصروف
                        :</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setexpense_price(text)
                        }}
                        keyboardType='numeric'
                        placeholder=' ادخل سعر المصروف'
                        placeholderTextColor={"#ddd"}
                        style={{
                            width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily,
                            color: "#000"
                        }}
                    >

                    </TextInput>


                </View>






                <TouchableOpacity
                    onPress={() => {
                        if (expense_name !== "" && expense_price !== "" && expense_price * 0 == 0) {
                            let data_to_send = {
                                expenses_name: expense_name,
                                expenses_price: expense_price

                            }
                            sendData(data_to_send)

                        } else {
                            alert("من فضلك ناكد من ادخال البيانات بشكل صحيح")
                        }

                    }}
                    style={{ paddingVertical: "2%", paddingHorizontal: "10%", alignSelf: "center", backgroundColor: COLORS.green, alignItems: "center", justifyContent: "center", marginTop: SIZES.height * .05 }}>
                    {!Loading ? (
                        <>
                            <Text style={[FONTS.h3, { color: "#000" }]}>إضافة</Text>
                        </>) :
                        <ActivityIndicator size={35} color={"#f00"} />
                    }
                </TouchableOpacity>



            </ScrollView>



        </View>









    </>
    );
}



export default Add_expenses

