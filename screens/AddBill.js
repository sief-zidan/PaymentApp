import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, Alert, Modal, StyleSheet, Pressable, Button } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';

import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectList from 'react-native-dropdown-select-list'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import moment from 'moment';
import Axios from "axios";
import { loadPartialConfig } from '@babel/core';
import { ActivityIndicator } from 'react-native-paper';

const radioButtonsData = [{

    label: 'دفع كامل',
    value: 0
}, {

    label: 'دفع آجل',
    value: 1
}, {

    label: 'دفع جزئي',
    value: 2
}
]

function AddBill(props) {
    // const [open_items, setOpen_items] = useState(false);
    // const [value, setValue] = useState(null);
    const [items, setItems] = useState([

    ]);
    const [SelectedItem, setSelectedItem] = useState([
        null
    ]);
    // const [open_trader, setOpen_trader] = useState(false);
    // const [value_trader, setValue_trader] = useState(null);
    const [traders, setTraders] = useState([

    ]);
    const [SelectedTrader, setSelectedTrader] = useState([
        {}
    ]);
    const [product_count, setProduct_count] = useState(0);
    const [arrOfItems, setArrOfItems] = useState([]);

    const [discount, setDiscount] = useState(0);
    const [notes, setNotes] = useState("");
    const [part_pay, setPart_pay] = useState(0);
    const [Payment_status, setPayment_status] = useState({});
    const [pay_submitted, setpay_submitted] = useState(false);


    const [modalVisible, setModalVisible] = useState(false);
    const [Loadingconfirm, setLoadingconfirm] = useState(false);
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [selectedRadio_idx, setselectedRadio_idx] = useState(0)
    const [data, setDate] = useState(moment(new Date()).format('DD-MM-YYYY'));

    function getData(link, type) {
        // setLoading(true)

        Axios.get(link).then(res => {
            if (res.status == 200) {
                // alert(JSON.stringify(res.data))
                if (typeof (res.data) == "object") {

                    if (type == 'item') {
                        // alert(JSON.stringify(res.data))
                        setItems(res.data)
                    } else {
                        setTraders(res.data)
                    }
                }
                // setData(res.data)
            } else {
                // setData([])
                alert("حدث خطأ")

            }

            // setLoading(false)




        });
    }

    function sendData(data_to_send) {

        setLoadingconfirm(true)
        Axios.post("https://camp-coding.org/ZFactory/insert_invoice.php", data_to_send).then(res => {
            if (res.status == 200) {
                // console.log(JSON.stringify(res.data))
                if ((res.data) == "success" || res.data == "money_payed") {
                    setArrOfItems([])
                    setDiscount(0)
                    setNotes("")
                    setPart_pay(0)
                    setPayment_status({})
                    setSelectedItem([])
                    setSelectedTrader([])
                    setpay_submitted(false)
                    setselectedRadio_idx(0)
                    Alert.alert("زيدانكو", "تم اضافة الفاتورة بنجاح")
                    setTimeout(() => {
                        props.navigation.goBack()
                    }, 1000);

                }
                //     getData()


                else
                    alert("حدث خطأ")
            } else {

                alert("حدث خطأ")

            }

            setLoadingconfirm(false)





        });
    }


    useEffect(() => {
        getData("https://camp-coding.org/ZFactory/select_product.php", 'item')
        getData("https://camp-coding.org/ZFactory/select_merchent.php", 'merchent')
    }, [])

    function deletItem(item, index) {
        let alldata = [...arrOfItems]
        alldata.splice(index, 1)
        setArrOfItems(alldata)
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

                    }}>إضافة فاتورة بيع</Text>
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

        <View style={{ padding: SIZES.padding, flex: 1, paddingBottom: 0 }}>

            <ScrollView >

                <SelectList

                    setSelected={setSelectedTrader}
                    onSelect={() => {
                        let obj = traders.find(o => o.key === SelectedTrader);
                        setSelectedTrader(obj)
                    }}

                    data={traders}
                    placeholder='اختار تاجر'
                    searchPlaceholder="اكتب اسم التاجر"

                    dropdownTextStyles={[FONTS.h3, { color: '#000', }]}
                    inputStyles={[FONTS.h3, { color: "#000" }]}
                    boxStyles={{ alignItems: "center" }}

                />

                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10 }}>


                    <View style={{ width: "100%", justifyContent: "center" }} >
                        <Text style={[FONTS.h3, { color: "#000" }]}>
                            اسم العميل :  <Text style={{ color: COLORS.darkGray }}>{SelectedTrader['value']}</Text>
                        </Text>
                    </View>
                    <View style={{ width: "100%", justifyContent: "center" }} >
                        <Text style={[FONTS.h3, { color: "#000" }]}>
                            عنوان العميل  :  <Text style={{ color: COLORS.darkGray }}>{SelectedTrader['merchent_address']}</Text>
                        </Text>
                    </View>
                    <View style={{ width: "100%", justifyContent: "center" }} >
                        <Text style={[FONTS.h3, { color: "#000" }]}>
                            رقم المحمول :  <Text style={{ color: COLORS.darkGray }}>{SelectedTrader['merchent_phone']}</Text>
                        </Text>
                    </View>

                </View>



                <SelectList
                    setSelected={setSelectedItem}
                    onSelect={() => {
                        setModalVisible(!modalVisible)
                        let obj = items.find(o => o.key === SelectedItem);
                        setSelectedItem(obj)
                        setpay_submitted(false)
                    }}
                    data={items}
                    placeholder='اختار المنتج'
                    searchPlaceholder="اكتب اسم المنتج"

                    dropdownTextStyles={[FONTS.h3, { color: '#000', }]}
                    inputStyles={[FONTS.h3, { color: "#000" }]}
                    boxStyles={{ alignItems: "center" }}

                />

                {arrOfItems.map((item, index) => {
                    return (
                        <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10, borderBottomWidth: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    deletItem(item, index)
                                }}
                            >
                                <Icon
                                    name='trash'
                                    size={20}
                                    color={"#f00"}
                                />
                            </TouchableOpacity>


                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    اسم المنتج :  <Text style={{ color: COLORS.darkGray }}>{item['value']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    سعر المنتج  :  <Text style={{ color: COLORS.darkGray }}>{item['product_price']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    الكمية  :  <Text style={{ color: COLORS.darkGray }}>{item['product_count']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    الإجمالي   :  <Text style={{ color: COLORS.darkGray }}>{item['Total']}</Text>
                                </Text>
                            </View>

                        </View>

                    )


                })


                }

                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                    <Text style={[FONTS.h3, { color: "#000" }]}> خصم علي الفاتورة
                        :</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setDiscount(text)
                            setpay_submitted(false)
                        }}
                        keyboardType='numeric'
                        placeholder='0'
                        placeholderTextColor={"#ddd"}
                        style={{
                            width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily, color: "#000"
                        }}
                    >

                    </TextInput>


                </View>
                <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                    <Text style={[FONTS.h3, { color: "#000" }]}> ملاحظات فاتورة البيع
                        :</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setNotes(text)
                            setpay_submitted(false)
                        }}
                        placeholder='سيتم عرضها علي الفاتورة'
                        placeholderTextColor={"#ddd"}
                        style={{
                            width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                            fontSize: SIZES.h3,
                            fontFamily: FONTS.fontFamily,
                            color: "#000"
                        }}
                        multiline={true}
                        numberOfLines={4}
                    >

                    </TextInput>


                </View>

                <View style={{ paddingVertical: 10 }}>
                    <RadioForm

                        formHorizontal={true}
                        animation={true}
                        initial={0}
                    >
                        {/* To create radio buttons, loop through your array of options */}
                        {
                            radioButtons.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} >
                                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={selectedRadio_idx === i}
                                        onPress={() => {
                                            setselectedRadio_idx(i)
                                            setpay_submitted(false)
                                        }}
                                        borderWidth={1}
                                        buttonInnerColor={COLORS.green}
                                        buttonOuterColor={selectedRadio_idx === i ? '#2196f3' : '#000'}
                                        buttonSize={30}
                                        buttonOuterSize={30}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginRight: 10 }}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={() => {
                                            setselectedRadio_idx(i)
                                            setpay_submitted(false)
                                        }}
                                        labelStyle={{ fontSize: 15, color: COLORS.darkGray, fontFamily: FONTS.fontFamily }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                    {/* {
                        selectedRadio_idx === 1 ?
                            <>


                                <Text style={[FONTS.h3, { color: "#000" }]}> ادخل تاريخ الدفع
                                    :</Text>

                                <TextInput
                                    onChangeText={(text) => {
                                        setDate(text)
                                        setpay_submitted(false)
                                    }}
                                    value={data}
                                    placeholder={data + ""}
                                    style={{
                                        width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                                        fontSize: SIZES.h3,
                                        fontFamily: FONTS.fontFamily,
                                    }}
                                ></TextInput>





                            </>

                            : null
                    } */}

                    {
                        selectedRadio_idx === 2 ?
                            <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light }}>

                                <Text style={[FONTS.h3, { color: "#000" }]}> ادخل المبلغ المدفوع
                                    :</Text>
                                <TextInput
                                    onChangeText={(text) => {
                                        setPart_pay(text)
                                        setpay_submitted(false)
                                    }}
                                    placeholder='0'
                                    style={{
                                        width: "100%", backgroundColor: COLORS.white, borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 10, textAlign: "center",
                                        fontSize: SIZES.h3,
                                        fontFamily: FONTS.fontFamily,
                                    }}
                                >

                                </TextInput>


                            </View>
                            : null
                    }

                </View>
                {!pay_submitted ?
                    <TouchableOpacity

                        onPress={() => {
                            let arr = arrOfItems
                            let dis = discount
                            let selectedRadio = selectedRadio_idx
                            let payPart = part_pay
                            let date = data
                            let total = 0
                            let payed = 0
                            let remain = 0
                            if (arrOfItems && SelectedTrader) {
                                for (let i = 0; i < arr.length; i++) {
                                    total += arr[i]['Total']
                                }
                                let total_with_dis = total - dis

                                if (selectedRadio_idx == 0) {
                                    payed = total_with_dis
                                    remain = 0
                                } else if (selectedRadio_idx == 2) {
                                    payed = payPart
                                    remain = total_with_dis - payPart
                                } else {
                                    payed = 0
                                    remain = total_with_dis

                                }
                                let pay_status = {
                                    total_price: total,
                                    total: total_with_dis,
                                    discount: dis,
                                    payed: payed,
                                    remain: remain,
                                    status: radioButtonsData[selectedRadio_idx]['label'],
                                    date: date
                                }


                                setPayment_status(pay_status)
                                setpay_submitted(true)

                            } else {
                                alert("من فضلك تاكد من صحة البيانات")
                            }
                        }}
                        style={{
                            paddingVertical: "1%", paddingHorizontal: "5%",
                            alignSelf: "center", backgroundColor: COLORS.green,
                            alignItems: "center", justifyContent: "center",
                            marginBottom: 20, borderRadius: 20
                        }}>
                        <Text style={[FONTS.h3, { color: "#000", padding: 5 }]}>تأكيد</Text>
                    </TouchableOpacity>
                    : <>
                        <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10, borderBottomWidth: 1 }}>



                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    الإجمالي   :  <Text style={{ color: COLORS.darkGray }}>{Payment_status['total']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    خصم علي الفاتورة :  <Text style={{ color: COLORS.darkGray }}>{Payment_status['discount']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    حالة الدفع  :  <Text style={{ color: COLORS.darkGray }}>{Payment_status['status']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    المدفوع  :  <Text style={{ color: COLORS.darkGray }}>{Payment_status['payed']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    المتبقي  :  <Text style={{ color: COLORS.darkGray }}>{Payment_status['remain']}</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%", justifyContent: "center" }} >
                                <Text style={[FONTS.h3, { color: "#000" }]}>
                                    التاريخ  :  <Text style={{ color: COLORS.darkGray }}>{Payment_status['date']}</Text>
                                </Text>
                            </View>

                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                if (arrOfItems && Payment_status && SelectedTrader['key']) {
                                    let obj = {
                                        items: arrOfItems,
                                        Payment_status,
                                        merchent_id: SelectedTrader['key'],
                                        note: notes
                                    }
                                    let data_to_send = { obj }
                                    sendData(data_to_send)
                                } else {
                                    alert("من فضلك تاكد من صحة البيانات")
                                }

                            }}

                            style={{
                                alignSelf: "center",
                                backgroundColor: COLORS.green, alignItems: "center",
                                justifyContent: "center", marginTop: 10, marginBottom: 20,
                                borderRadius: 10,
                                width: '60%',
                                padding: 10
                            }}>
                            {Loadingconfirm ? (
                                <ActivityIndicator
                                    style={[FONTS.h3, { color: "#000" }]}
                                // color={'#fff'}
                                />
                            ) : (

                                <Text style={[FONTS.h3, { color: "#000" }]}>اتمام العملية</Text>

                            )}
                        </TouchableOpacity>
                    </>

                }


            </ScrollView>



        </View>



        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput onChangeText={(count) => {
                        setProduct_count(count)
                    }}
                        placeholder="ادخل الكمية"
                        placeholderTextColor={"#ddd"}
                        keyboardType='number-pad'

                        value={product_count}
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





                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                            // setTotal_without_discount(SelectedItem['price'] ? SelectedItem['price'] * product_count : 0)
                            // alert(product_count)
                            SelectedItem['product_count'] = product_count
                            SelectedItem['Total'] = SelectedItem['product_price'] ? SelectedItem['product_price'] * product_count : 0

                            setArrOfItems([...arrOfItems, SelectedItem])

                            setSelectedItem({})
                            setProduct_count(0)
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

export default AddBill

