import React, { useState, useEffect } from 'react'
import {
    View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput,
    Alert, Modal, StyleSheet, Pressable, ActivityIndicator
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Axios from "axios";
function DelayPayment(props) {


    const [data, setData] = useState([]);
    const [idx_pay, setidx_pay] = useState(-1);
    const [changed_price, setchanged_price] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [SearchKey, setSearchKey] = useState("");





    function getData() {
        setLoading(true)

        Axios.get("https://camp-coding.org/ZFactory/select_late_payment.php").then(res => {
            if (res.status == 200) {
                // console.log(JSON.stringify(res.data))
                if (typeof (res.data) == "object")
                    setData(res.data)
            } else {
                setData([])
                alert("حدث خطأ")

            }

            setLoading(false)




        });
    }
    function updateData(data_to_send) {
        let index = idx_pay
        let monay = parseFloat(data[index].price_after_discount) - parseFloat(data[index].payed)
        if (changed_price > monay) {
            Alert.alert("زيدانكو", "المبلغ المدخل اكبر من المبلغ المطلوب")
        } else {
            data[idx_pay]['payed'] = 1 * data[idx_pay]['payed'] + changed_price * 1
            setData(data)

            setLoading(true)
            Axios.post("https://camp-coding.org/ZFactory/update_late_payment.php", data_to_send).then(res => {
                if (res.status == 200) {
                    // alert(JSON.stringify(res.data))
                    if ((res.data) == "success" || res.data == "money_payed")
                        getData()
                    else
                        alert("حدث خطأ")
                } else {

                    alert("حدث خطأ")

                }

                setLoading(false)




            });
        }

    }

    useEffect(() => {
        getData()
    }, [])





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

                    }}>سجل المتأخرات</Text>
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


                {!Loading ? (
                    <>
                        <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>




                        </View>
                        {
                            data.map((item, index) => {
                                return (
                                    <>
                                        {item.merchent_name.includes(SearchKey) ? (
                                            <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10, borderBottomWidth: 1 }}>
                                                <View style={{
                                                    flexDirection: "row", justifyContent:
                                                        'space-around', width: "100%"
                                                }}>

                                                    <View style={{ width: "80%", justifyContent: "center" }} >
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            كود الفاتورة :  <Text style={{ color: COLORS.darkGray }}>{item['invoice_id']}</Text>
                                                        </Text>
                                                    </View>
                                                    <View >
                                                        <Text style={{ color: COLORS.darkGray }}>{item['date'].slice(0, 10)}</Text>
                                                    </View>
                                                </View>


                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        اسم العميل :  <Text style={{ color: COLORS.darkGray }}>{item['merchent_name']}</Text>
                                                    </Text>
                                                </View>

                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        المدفوع  :  <Text style={{ color: COLORS.darkGray }}>{item['payed'] * 1}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            المتبقي  :  <Text style={{ color: COLORS.red }}>{1 * item['price_after_discount'] - item['payed'] * 1}</Text>
                                                        </Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setidx_pay(index)
                                                                setModalVisible(true)
                                                            }}
                                                            style={{
                                                                borderWidth: 1,
                                                                padding: 5,
                                                                width: 50,
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                borderRadius: 20,
                                                                borderColor: COLORS.green
                                                            }}
                                                        >
                                                            <Text style={[FONTS.h3, { color: COLORS.green, marginTop: -5 }]}>
                                                                دفع
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        الإجمالي   :  <Text style={{ color: COLORS.darkGray }}>{item['price_after_discount']}</Text>
                                                    </Text>
                                                </View>

                                            </View>

                                        ) : (null)}

                                    </>)


                            })
                        }

                    </>) :
                    <View
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <ActivityIndicator size={40} color={"#5BCDBF"} style={{
                            marginTop: 100
                        }} />

                    </View>
                }



            </ScrollView>



        </View>


        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput onChangeText={(price) => {
                        setchanged_price(price)

                    }}
                        placeholder="ادخل المبلغ"
                        // value={product_count}
                        keyboardType='number-pad'
                        placeholderTextColor={"#ddd"}

                        style={{
                            width: 200, height: 50,
                            marginBottom: 20,
                            textAlign: "center",
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily,
                            borderWidth: 1,
                            color: "#000"


                        }}></TextInput>





                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {

                            let data_to_send = {
                                new_price: changed_price,
                                invoice_id: data[idx_pay]['invoice_id']
                            }
                            updateData(data_to_send)
                            setModalVisible(!modalVisible)


                        }}
                    >
                        <Text style={{
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily
                        }}>تأكيد</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>







    </>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2, paddingHorizontal: 25
    },

    buttonClose: {
        backgroundColor: "#2196F3",

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default DelayPayment

