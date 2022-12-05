import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, Alert, Modal, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectList from 'react-native-dropdown-select-list'

import Axios from "axios";
function AddSalary(props) {


    const [dayWork, setdayWork] = useState("");
    const [expense_price, setexpense_price] = useState("");


    const [Loading, setLoading] = useState(false);


    const [SelectedTrader, setSelectedTrader] = useState([
        {}
    ]);

    const [traders, setTraders] = useState([

    ]);

    useEffect(() => {
        getData()
    }, [])
    function getData(link, type) {
        // setLoading(true)

        Axios.get('https://camp-coding.org/ZFactory/select_workers.php').then(res => {
            if (res.status == 200) {

                if (typeof (res.data) == "object") {


                    setTraders(res.data)

                }

            } else {
                // setData([])
                alert("حدث خطأ")

            }

            // setLoading(false)




        });
    }
    useEffect(() => {
        return () => {
            let fun = props.navigation.getParam("passed_reload_fun")

            fun()
        }

    }, [])




    function sendData(data_to_send) {

        setLoading(true)
        Axios.post("https://camp-coding.org/ZFactory/add_salary.php", data_to_send).then(res => {
            if (res.status == 200) {
                // alert(JSON.stringify(res.data))
                if ((res.data) == "success") {

                    setdayWork("")
                    setexpense_price("")

                    Alert.alert("زيدانكو", "تم اضافة المرتب بنجاح")
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

                    }}> إضافة مرتب</Text>
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

                <SelectList

                    setSelected={setSelectedTrader}
                    onSelect={() => {
                        let obj = traders.find(o => o.key === SelectedTrader);
                        setSelectedTrader(obj)
                    }}

                    data={traders}
                    placeholder='اختار العامل'
                    searchPlaceholder="اكتب اسم العامل"

                    dropdownTextStyles={[FONTS.h3, { color: '#000', }]}
                    inputStyles={[FONTS.h3, { color: "#000" }]}
                    boxStyles={{ alignItems: "center" }}

                />

                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10 }}>


                    <View style={{ width: "100%", justifyContent: "center" }} >
                        <Text style={[FONTS.h3, { color: "#000" }]}>
                            الاسم :  <Text style={{ color: COLORS.darkGray }}>{SelectedTrader['value']}</Text>
                        </Text>
                    </View>


                </View>

                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                    <Text style={[FONTS.h3, { color: "#000" }]}> عدد الايام
                        :</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setdayWork(text)
                        }}
                        keyboardType='numeric'

                        placeholder='ادخل عدد الايام'
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

                    <Text style={[FONTS.h3, { color: "#000" }]}> مرتب اليوم الواحد
                        :</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setexpense_price(text)
                        }}
                        keyboardType='numeric'
                        placeholder='مرتب اليوم الواحد'
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

                        if (dayWork !== "" && expense_price !== "" && expense_price * 0 == 0) {
                            let allsalary = parseFloat(dayWork) * parseFloat(expense_price)
                            let data_to_send = {
                                day_of_work: dayWork,
                                price_per_day: expense_price,
                                worker_id: SelectedTrader['key'],
                                total_salery: allsalary

                            }
                            sendData(data_to_send)
                            // alert(JSON.stringify(data_to_send))

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



export default AddSalary

