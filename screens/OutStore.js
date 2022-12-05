import React, { useState, useEffect } from 'react'
import {
    View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput,
    Alert, Modal, StyleSheet, Pressable, ActivityIndicator
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Axios from "axios";
function DelayPayment(props) {


    const [data, setData] = useState([

    ]);
    const [idx_pay, setidx_pay] = useState(-1);
    const [changed_price, setchanged_price] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [SearchKey, setSearchKey] = useState("");





    function getData() {
        setLoading(true)

        Axios.get("https://camp-coding.org/ZFactory/select_data_in_store.php").then(res => {
            if (res.status == 200) {
                if (typeof (res.data) == "object")
                    // console.log(JSON.stringify(res.data))

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
        let monay = parseFloat(data[index].product_count)
        if (changed_price > monay) {
            Alert.alert("زيدانكو", "الكمية المخرجه غير متاحة في المخزن")
            setchanged_price(0)
        } else {
            data[idx_pay]['product_count'] = 1 * data[idx_pay]['product_count'] - changed_price * 1
            setData(data)

            setLoading(true)
            Axios.post("https://camp-coding.org/ZFactory/update_store.php", data_to_send).then(res => {
                if (res.status == 200) {
                    if ((res.data) == "success") {
                        getData()
                        setchanged_price(0)
                    }

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

                    }}>المتاح في المخزن
                    </Text>
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

        <View style={{ padding: SIZES.padding, flex: 1, opacity: modalVisible ? .2 : null }}>
            <ScrollView>


                {!Loading ? (
                    <>
                        <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                            <TextInput
                                onChangeText={(text) => {
                                    setSearchKey(text)
                                }}
                                placeholder='ابحث عن المنتج من هنا'
                                placeholderTextColor={"#9F9FA0"}

                                style={{
                                    width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                                    fontSize: SIZES.h3,
                                    fontFamily: FONTS.fontFamily,
                                    color: "#000"
                                }}
                            >

                            </TextInput>


                        </View>
                        {
                            data.map((item, index) => {
                                return (
                                    <>
                                        {item.product_name.includes(SearchKey) ? (
                                            <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10, borderBottomWidth: 1 }}>
                                                <View style={{
                                                    flexDirection: "row", justifyContent:
                                                        'space-around', width: "100%"
                                                }}>

                                                    <View style={{ width: "100%", justifyContent: "center" }} >
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            كود التخزين :  <Text style={{ color: COLORS.darkGray }}>{item['store_id']}</Text>
                                                        </Text>
                                                    </View>
                                                    {/* <View >
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            كود المنتج :  <Text style={{ color: COLORS.darkGray }}>{item['product_id']}</Text>
                                                        </Text>
                                                    </View> */}
                                                </View>


                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        اسم المنتج :  <Text style={{ color: COLORS.darkGray }}>{item['product_name']}</Text>
                                                    </Text>
                                                </View>

                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            الكمية المتاحه  :  <Text style={{ color: COLORS.red }}>{item['product_count']}</Text>
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
                                                                إخراج
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
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
                        placeholder="ادخل الكمية"
                        // value={product_count}
                        keyboardType='number-pad'
                        placeholderTextColor={"#ddd"}
                        value={changed_price}
                        style={{
                            width: 200, height: 50,
                            marginBottom: 20,
                            textAlign: "center",
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily,
                            borderWidth: 1,
                            color: "#000"


                        }}>

                    </TextInput>



                    <View
                        style={{
                            justifyContent: "space-around", flexDirection: "row",
                            width: "80%", alignItems: "center",
                            alignContent: "center"
                        }}
                    >
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {

                                let data_to_send = {
                                    product_count: changed_price,
                                    store_id: data[idx_pay]['store_id']
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
                        <Pressable
                            style={[styles.button, { backgroundColor: "red" }]}
                            onPress={() => {

                                setModalVisible(!modalVisible)


                            }}
                        >
                            <Text style={{
                                fontSize: SIZES.h3,
                                fontFamily: FONTS.fontFamily
                            }}>إلغاء</Text>
                        </Pressable>
                    </View>


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

