import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icons from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { color } from 'react-native-reanimated';
// fontFamily: FONTS.fontFamily,
function AddDealer({ navigation, Route }) {
    const [merchent_name, setMerchent_name] = useState("");
    const [merchent_phone, setMerchent_phone] = useState("");
    const [merchent_address, setMerchent_address] = useState("");
    const [empty_merchent_name, set_empty_merchent_name] = useState("");
    const [empty_merchent_phone, set_empty_merchent_phone] = useState("");
    const [empty_merchent_address, set_empty_merchent_address] = useState("");
    const [Loading, setLoading] = useState(false);





    const Validation = () => {
        if (merchent_name == "" || merchent_phone == "" || merchent_address == "") {
            if (merchent_name == "") {
                set_empty_merchent_name("يجب إدخال إسم التاجر")

            } else { set_empty_merchent_name("") }


            if (merchent_phone == "") {
                set_empty_merchent_phone("يجب إدخال رقم التاجر")

            } else { set_empty_merchent_phone("") }




            if (merchent_address == "") {
                set_empty_merchent_address("يجب إدخال عنوان التاجر")

            } else { set_empty_merchent_address("") }
        }
        else {
            Add_Merchent()

        }


    }







    const Add_Merchent = () => {
        setLoading(true)

        let data_to_send = {
            merchent_name,
            merchent_phone,
            merchent_address

        }

        axios.post("https://camp-coding.org/ZFactory/add_merchent.php", data_to_send)
            .then((res) => {

                if (res.status == 200) {

                    if (res.data == "success") {
                        // console.log("success ")

                        setMerchent_name("")
                        setMerchent_phone("")
                        setMerchent_address("")
                        setLoading(false)
                        Alert.alert("زيدانكو", "تم اضافة التاجر بنجاح")
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

                        }}>إضافة تاجر</Text>
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

                    <View >

                        <Text style={{
                            fontFamily: FONTS.fontFamily,
                            fontSize: 15,
                            color: "#9F9FA0"
                        }}>
                            ( يمكن تسجل التجار في النظام فقط من هنا )</Text>
                    </View>




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
                                }}>إسم التاجر</Text>
                            </View>


                            <TextInput
                                value={merchent_name}
                                onChangeText={(value) => {
                                    setMerchent_name(value)
                                    //   console.log(value)
                                    set_empty_merchent_name("")

                                }}
                                placeholder='إكتب إسم تاجر غير محفوظ'
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
                                    {empty_merchent_name}
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
                                }}>المحطه (عنوان التاجر)</Text>
                            </View>


                            <TextInput
                                value={merchent_address}
                                onChangeText={(value) => {
                                    setMerchent_address(value)
                                    // console.log(value)
                                    set_empty_merchent_address("")

                                }}
                                placeholder='إكتب عنوان المحطه'
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
                                    {empty_merchent_address}
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
                                }}>رقم التليفون</Text>
                            </View>


                            <TextInput
                                value={merchent_phone}
                                onChangeText={(value) => {
                                    setMerchent_phone(value)
                                    // console.log(value)
                                    set_empty_merchent_phone("")

                                }}
                                placeholderTextColor={"#9F9FA0"}

                                placeholder='إكتب رقم التليفون'
                                keyboardType='number-pad'
                                textAlign='right'
                                maxLength={11}
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
                                    {empty_merchent_phone}
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

                        ) : <>
                            <TouchableOpacity
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
                                }}>إضافة التاجر</Text>
                            </TouchableOpacity>

                        </>}


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
export default AddDealer;