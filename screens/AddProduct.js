import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icons from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
// fontFamily: FONTS.fontFamily,
function AddProduct({ navigation, Route }) {

    const [product_name, setProduct_name] = useState("");
    const [empty_product_name, set_empty_product_name] = useState("");
    const [product_price, setProduct_price] = useState(0);
    const [product_matrial_price, setProduct_matrial_price] = useState(0);

    const [empty_product_price, set_empty_product_price] = useState("");

    const [product_import, setProduct_import] = useState("");
    const [empty_product_import, set_empty_product_import] = useState("");
    const [Loading, setLoading] = useState(false);





    const Add_Product = () => {
        setLoading(true)
        let data_to_send = {
            product_name,
            product_price,
            product_import,
            product_matrial_price

        }

        axios.post("https://camp-coding.org/ZFactory/add_product.php", data_to_send)
            .then((res) => {


                if (res.status == 200) {

                    if (res.data == "success") {
                        // console.log("success ")
                        // console.log(data_to_send)
                        setProduct_name("")
                        setProduct_import("")
                        setProduct_price(0)
                        // alert(data_to_send)
                        setLoading(false)
                        Alert.alert("زيدانكو", "تم اضافة المنتج بنجاح")
                        setTimeout(() => {
                            navigation.goBack()
                        }, 1000);

                    } else {
                        alert("error , Try Again Later")
                    }

                } else {
                    alert("حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا")
                }

            })
    }



    const Validation = () => {
        if (product_import == "" || product_name == "" || product_price == "") {
            if (product_name == "") {
                set_empty_product_name("يجب إدخال إسم المنتج")

            } else { set_empty_product_name("") }


            if (product_price == "") {
                set_empty_product_price("يجب إدخال سعر المنتج")

            } else { set_empty_product_price("") }




            if (product_import == "") {
                set_empty_product_import("يجب إدخال إسم المنتج")

            } else { set_empty_product_import("") }
        }
        else {
            Add_Product()
        }


    }


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

                        }}>إضافة منتج</Text>
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
                            navigation.goBack()
                        }}
                    >
                        <Icons
                            name={"arrow-left"}
                            size={25}
                            color='#000'

                        />
                    </TouchableOpacity>

                </View>


            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    width: "95%",
                    alignSelf: 'center'
                }}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                }}>

                    {/* <View >
                        <Text style={{
                            fontFamily: FONTS.fontFamily,
                            fontSize: 15
                        }}>ملاحظه : لإضافه كميه من المنتج للمخزون يرجي اجراءها من خلال اضافة فاتوره شراء لكي يتم تسجيلها بفاتوره .
                        </Text>
                        <Text style={{
                            fontFamily: FONTS.fontFamily,
                            fontSize: 15
                        }}>
                            ( يمكن تسجل المنتج في النظام فقط من هنا )</Text>
                    </View> */}




                    <View style={{ marginBottom: 50 }}>

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
                                    set_empty_product_name("")
                                    // console.log(value)

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
                            <View >
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#f00'
                                }}>
                                    {empty_product_name}
                                </Text>
                            </View>


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
                                    set_empty_product_price("")

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
                                    set_empty_product_price("")

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


                            <View >
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#f00'
                                }}>
                                    {empty_product_price}
                                </Text>
                            </View>

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
                                    set_empty_product_import("")

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



                            <View >
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#f00'
                                }}>
                                    {empty_product_import}
                                </Text>
                            </View>


                        </View>


                    </View>


                    <View style={{
                        width: "100%",
                        // backgroundColor:'#dd0',
                        justifyContent: 'space-between',
                        flexDirection: "row",
                        marginBottom: 30
                    }}>
                        {Loading ? (
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
                                Validation()

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
                            }}>إضافة المنتج</Text>
                        </TouchableOpacity>)}


                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
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

            </ScrollView>
        </>
    )
}
export default AddProduct;