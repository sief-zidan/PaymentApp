import React, { useState, useEffect } from 'react'
import {
    View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput,
    Alert, Modal, StyleSheet, Pressable, ActivityIndicator
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Axios from "axios";
function Allproduct(props) {


    const [data, setData] = useState([

    ]);
    const [idx_pay, setidx_pay] = useState(-1);
    const [changed_price, setchanged_price] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [SearchKey, setSearchKey] = useState("");
    // const [profuctdata, setprofuctdata] = useState({});
    const [product_name, setProduct_name] = useState("");
    const [product_price, setProduct_price] = useState(0);
    const [product_matrial_price, setProduct_matrial_price] = useState(0);
    const [product_import, setProduct_import] = useState("");

    const [product_id, setProduct_id] = useState(0);
    const [Loadingupdate, setLoadingupdate] = useState(false);


    function profuctdata(item) {
        let data = item
        setProduct_id(data.key)
        setProduct_name(data.value)
        setProduct_price(data.product_price)
        setProduct_matrial_price(data.product_matrial_price)
        setProduct_import(data.product_import)
        setModalVisible(true)
    }




    function getData() {
        setLoading(true)

        Axios.get("https://camp-coding.org/ZFactory/select_product.php").then(res => {
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

    function updateData() {
        setLoadingupdate(true)

        let data_to_send = {
            product_id: product_id,
            product_name: product_name,
            product_price: product_price,
            product_matrial_price: product_matrial_price,
            product_import: product_import,
        }
        Axios.post("https://camp-coding.org/ZFactory/update_product.php", data_to_send).then(res => {
            if (res.status == 200) {

                if ((res.data) == "success") {
                    Alert.alert("زيدانكو", "تم تعدبل المنتج بنجاح")
                    setModalVisible(false)
                    getData()
                }

                else
                    alert("حدث خطأ")
            } else {

                alert("حدث خطأ")

            }

            setLoadingupdate(false)




        });

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

                    }}>
                        المنتجات
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
                                        {item.value.includes(SearchKey) ? (
                                            <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10, borderBottomWidth: 1 }}>
                                                <View style={{
                                                    flexDirection: "row", justifyContent:
                                                        'space-around', width: "100%"
                                                }}>

                                                    <View style={{ width: "100%", justifyContent: "center" }} >
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            كود المنتج :  <Text style={{ color: COLORS.darkGray }}>{item['key']}</Text>
                                                        </Text>
                                                    </View>

                                                </View>


                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        اسم المنتج :  <Text style={{ color: COLORS.darkGray }}>{item['value']}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        سعر البيع :  <Text style={{ color: COLORS.darkGray }}>{item['product_price'] + " ج"}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            سعر الشراء  :  <Text style={{ color: COLORS.darkGray }}>{item['product_matrial_price'] + " ج"}</Text>
                                                        </Text>

                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                                        <Text style={[FONTS.h3, { color: "#000" }]}>
                                                            اسم المورد  :  <Text style={{ color: COLORS.darkGray }}>{item['product_import']}</Text>
                                                        </Text>

                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            profuctdata(item)
                                                            //setModalVisible(true)
                                                        }}
                                                        style={{
                                                            borderWidth: 1,
                                                            padding: 7,
                                                            width: 50,
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            borderRadius: 20,
                                                            borderColor: COLORS.green,
                                                            alignSelf: "center",
                                                            width: '40%',
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        <Text style={[FONTS.h3, { color: COLORS.green, marginTop: -5 }]}>
                                                            تعديل
                                                        </Text>
                                                    </TouchableOpacity>
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
            <View style={{
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                backgroundColor: "#ddd",
                paddingHorizontal: 10
            }}>
                <View style={{ marginBottom: 50, marginTop: 10, paddingHorizontal: 10 }}>

                    <View style={{
                        marginBottom: 15,
                    }}>
                        <View style={{
                            width: "100%",
                            height: 40,
                            marginBottom: 2
                        }}>
                            <Text style={{
                                fontFamily: FONTS.fontFamily,
                                fontSize: 20, color: "#9F9FA0"
                            }}>إسم المنتج</Text>
                        </View>


                        <TextInput
                            value={product_name}
                            onChangeText={(value) => {
                                setProduct_name(value)

                            }}
                            placeholder='إكتب إسم منتج غير محفوظ'
                            textAlign='right'
                            placeholderTextColor={"#9F9FA0"}


                            style={{
                                fontSize: 18,
                                borderWidth: .5,
                                borderColor: '#707070'
                                , color: "#000"


                            }}

                        />



                    </View>
                    <View style={{
                        marginBottom: 15,

                    }}>

                        <View style={{
                            width: "100%",
                            height: 40,
                            // backgroundColor: '#00f',
                            marginBottom: 2
                        }}>
                            <Text style={{
                                fontFamily: FONTS.fontFamily,
                                fontSize: 20, color: "#9F9FA0"
                            }}>سعر الشراء</Text>
                        </View>


                        <TextInput
                            value={product_matrial_price}
                            keyboardType="decimal-pad"
                            onChangeText={(value) => {
                                setProduct_matrial_price(value)
                                // console.log(value)

                            }}
                            placeholder='إكتب سعر الشراء'
                            textAlign='right'
                            placeholderTextColor={"#9F9FA0"}

                            style={{
                                fontSize: 18,
                                borderWidth: .5,
                                borderColor: '#707070'
                                , color: "#000"


                            }}

                        />
                    </View>

                    <View style={{
                        marginBottom: 15,

                    }}>

                        <View style={{
                            width: "100%",
                            height: 40,
                            // backgroundColor: '#00f',
                            marginBottom: 2
                        }}>
                            <Text style={{
                                fontFamily: FONTS.fontFamily,
                                fontSize: 20, color: "#9F9FA0"
                            }}>سعر البيع</Text>
                        </View>


                        <TextInput
                            value={product_price}
                            keyboardType="decimal-pad"
                            onChangeText={(value) => {
                                setProduct_price(value)
                                // console.log(value)


                            }}
                            placeholder='إكتب سعر البيع'
                            textAlign='right'
                            placeholderTextColor={"#9F9FA0"}

                            style={{
                                fontSize: 18,
                                borderWidth: .5,
                                borderColor: '#707070'
                                , color: "#000"


                            }}

                        />




                    </View>


                    <View style={{
                        marginBottom: 15,

                    }}>

                        <View style={{
                            width: "100%",
                            height: 40,
                            marginBottom: 2
                        }}>
                            <Text style={{
                                fontFamily: FONTS.fontFamily,
                                fontSize: 20, color: "#9F9FA0"
                            }}>إسم المورد</Text>
                        </View>


                        <TextInput
                            value={product_import}
                            onChangeText={(value) => {
                                setProduct_import(value)
                                // console.log(value)

                            }}
                            placeholder='إكتب إسم المورد'
                            textAlign='right'
                            placeholderTextColor={"#9F9FA0"}

                            style={{
                                fontSize: 18,
                                borderWidth: .5,
                                borderColor: '#707070'

                                , color: "#000"


                            }}

                        />






                    </View>


                </View>
                <View style={{
                    width: "100%",
                    // backgroundColor:'#dd0',
                    justifyContent: 'space-between',
                    flexDirection: "row",
                    marginBottom: 30
                }}>
                    {Loadingupdate ? (
                        <View
                            style={{
                                width: '55%',
                                height: 50,
                                backgroundColor: '#04aa6d',
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <ActivityIndicator size={35} color={"#fff"} />

                        </View>

                    ) : (<TouchableOpacity
                        onPress={() => {

                            updateData()

                        }}
                        style={{
                            width: '55%',
                            height: 50,
                            backgroundColor: '#04aa6d',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{
                            fontFamily: FONTS.fontFamily,
                            color: '#fff',
                            fontSize: 18
                        }}>تعديل</Text>
                    </TouchableOpacity>
                    )}


                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false)
                        }}
                        style={{

                            width: '35%',
                            height: 50,
                            backgroundColor: '#f00',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{
                            fontFamily: FONTS.fontFamily,
                            color: '#fff',
                            fontSize: 18
                        }}>إلغاء</Text>
                    </TouchableOpacity>

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
export default Allproduct

