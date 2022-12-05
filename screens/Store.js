
import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, Alert, Modal, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectList from 'react-native-dropdown-select-list'

import axios from 'axios';

export default class MainPage extends React.Component {




    constructor() {
        super()
        this.state = {
            traders: [],
            name: {},
            count: 0,
            loading: false,
            loadingbutt: false,
            id: -1

        }
    }


    componentDidMount() {
        this.getData()

    }
    getData() {
        this.setState({ loading: true })

        axios.get('https://camp-coding.org/ZFactory/select_product.php').then(res => {
            if (res.status == 200) {
                // console.log(res.data)
                if (typeof (res.data) == "object") {



                    this.setState({ traders: res.data })
                }

            } else {
                // setData([])
                alert("حدث خطأ")

            }


            this.setState({ loading: false })



        });
    }



    upload() {
        this.setState({ loadingbutt: true })
        data_to_send = {
            product_id: this.state.id,
            product_count: this.state.count
        }
        axios.post("https://camp-coding.org/ZFactory/insert_in_store.php", data_to_send).then(res => {
            if (res.status == 200) {
                // alert(JSON.stringify(res.data))
                if ((res.data) == "success") {

                    this.setState({
                        traders: [],
                        name: {},
                        count: 0,
                        loading: false,
                        loadingbutt: false,
                        id: -1
                    })

                    Alert.alert("زيدانكو", "تم اضافة الكمية بنجاح")
                    setTimeout(() => {
                        this.props.navigation.goBack()
                    }, 1000);
                }
                else
                    alert("حدث خطأ اثناء الإضافة")
            } else {

                alert("حدث خطأ تأكد من الإتصال بالانترنت")

            }

            this.setState({ loadingbutt: false })




        });
    }



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

                            }}>تسجيل الانتاج</Text>
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
                                this.props.navigation.goBack()
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
                    {this.state.loading ? (
                        <View

                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1
                            }}>
                            <ActivityIndicator
                                size={50}
                                color={COLORS.green}
                            />
                        </View>

                    ) : (
                        <ScrollView>
                            <SelectList


                                setSelected={(val) => {
                                    this.setState({ name: val })
                                    this.setState({ id: val })


                                }
                                    // alert(val)
                                }
                                onSelect={() => {
                                    let obj = this.state.traders.find(o => o.key === this.state.name);
                                    this.setState({ name: obj })
                                }}

                                data={this.state.traders}
                                placeholder='اختار المنتج'
                                searchPlaceholder="اكتب اسم المنتج"

                                dropdownTextStyles={[FONTS.h3, { color: '#000', }]}
                                inputStyles={[FONTS.h3, { color: "#000" }]}
                                boxStyles={{ alignItems: "center" }}

                            />
                            <View style={{ width: "100%", paddingVertical: 10, backgroundColor: COLORS.light, paddingHorizontal: 10 }}>


                                <View style={{ width: "100%", justifyContent: "center" }} >
                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                        اسم المنتج :  <Text style={{ color: COLORS.darkGray }}>{this.state.name.value}</Text>
                                    </Text>
                                </View>


                            </View>
                            <Text style={[FONTS.h3, { color: "#000" }]}> اكتب الكمية
                                :</Text>
                            <TextInput
                                onChangeText={(text) => {
                                    this.setState({ count: text })
                                }}
                                keyboardType='numeric'
                                placeholder='الكمية'
                                placeholderTextColor={"#ddd"}
                                style={{
                                    width: "100%", backgroundColor: COLORS.white,
                                    borderWidth: 0.7, borderRadius: 10,
                                    paddingHorizontal: 10, textAlign: "center",
                                    fontSize: SIZES.h3,
                                    fontFamily: FONTS.fontFamily,
                                    color: "#000"
                                }}
                            >

                            </TextInput>

                            <TouchableOpacity
                                onPress={() => {
                                    this.upload()


                                }}
                                style={{
                                    paddingVertical: "2%", paddingHorizontal: "10%", alignSelf:
                                        "center", backgroundColor: COLORS.green, alignItems: "center", justifyContent: "center",
                                    marginTop: SIZES.height * .05, width: "50%", borderRadius: 20
                                }}>
                                {this.state.loadingbutt ? (
                                    <ActivityIndicator
                                        style={[FONTS.h3, { padding: 5 }]}
                                        color={'#fff'}
                                        size={30}
                                    />
                                )
                                    : (
                                        <Text style={[FONTS.h3, { color: "#000", padding: 5 }]}>إضافة</Text>

                                    )}



                            </TouchableOpacity>

                        </ScrollView>
                    )}


                </View>















            </>

        )
    }
}
