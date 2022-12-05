import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import moment from 'moment';


export default class Allsalarys extends React.Component {



    constructor() {
        super()
        this.state = {
            invoice: [

            ],
            loading: false,
            months: [

            ]
        }
    }

    componentDidMount() {

        this.get_deatils()


    }

    reload_fun() {
        this.get_deatils()
    }


    //  let mon_name = moment(mon_num, 'MM').format('MMMM')
    get_deatils = () => {
        this.setState({ loading: true });

        axios
            .post(
                `https://camp-coding.org/ZFactory/select_salarys.php`
            )
            .then((res) => {
                if (res.status == 200) {

                    if (res.data != 'error') {
                        if (res.data.length > 0) {

                            this.getMon(res.data)
                            this.setState({
                                invoice: res.data,
                            });

                        }
                    } else {
                        Alert.alert('أدمن', 'عذرا يرجي المحاوله في وقتا لاحق');
                    }
                } else {
                    Alert.alert('أدمن', 'عذرا يرجي المحاوله في وقتا لاحق');
                }
                this.setState({ loading: false });
            });


    }
    getMon(dataRes) {

        let data = dataRes
        let months = []

        for (let i = 0; i < data.length; i++) {
            let mon_num = data[i].date.slice(0, 7)
            let opj = {
                months_num: mon_num
            }
            if (months.length == 0) {
                months.push(opj)
                continue
            }

            var found = false
            for (let z = 0; z < months.length; z++) {
                if (months[z].months_num === mon_num) {
                    found = true
                    break;
                }
            }

            if (found) {
                continue;
            }
            months.push(opj)

        }
        // console.log(months)
        this.setState({ months })

    }
    getname(date) {
        let data = date.slice(5)
        let str = ''
        if (data == '01') {
            str = "يناير"
        } else if (data == '02') {
            str = "فبراير"

        } else if (data == '03') {
            str = "مارس"

        } else if (data == '04') {
            str = "ابريل"

        } else if (data == '05') {
            str = "مايو"

        } else if (data == '06') {
            str = "يونيو"

        } else if (data == '07') {
            str = "يوليو"

        } else if (data == '08') {
            str = "اغسطس"

        } else if (data == '09') {
            str = "سبتمبر"

        } else if (data == '10') {
            str = "اكتوبر"

        } else if (data == '11') {
            str = "نوفمير"

        } else if (data == '12') {
            str = "ديسمبر"

        }
        return str;
    }
    renderinvoice(item, index) {
        return (
            <TouchableOpacity



                style={{

                    width: '95%',
                    borderRadius: SIZES.radius,
                    alignSelf: 'center',
                    padding: 10,



                    backgroundColor: COLORS.white,
                    marginVertical: SIZES.base,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }}
                onPress={() => {

                    this.props.navigation.navigate("Salarydetils", {
                        alldata: this.state.invoice,
                        month: item.months_num.slice(5)
                    })

                }}>
                <View style={{}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            padding: 5,
                            borderColor: "#ddd",
                            borderRadius: 10

                        }}>
                        <View
                            style={{
                                backgroundColor: COLORS.secondary,
                                padding: 4,
                                borderRadius: 4,

                            }}>
                            <Text
                                style={{
                                    color: "#000",
                                    fontFamily: FONTS.fontFamily,
                                }}>
                                {"شهر " + item.months_num}
                            </Text>

                        </View>
                        <View>
                            <Text
                                style={{
                                    color: COLORS.bag10Bg,
                                    fontFamily: FONTS.fontFamily,
                                }}>
                                {this.getname(item.months_num)}
                            </Text>
                        </View>

                    </View>


                </View>




            </TouchableOpacity>
        )
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

                            }}>الشهور </Text>
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
                            <Icons
                                name={"arrow-left"}
                                size={25}
                                color='#000'

                            />
                        </TouchableOpacity>

                    </View>


                </View>













                {this.state.loading ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <ActivityIndicator
                            size={40}
                        />
                    </View>
                ) : (
                    <>

                        <FlatList
                            data={this.state.months}
                            numColumns={1}
                            renderItem={({ item, index }) => this.renderinvoice(item, index)} />

                        <TouchableOpacity
                            onPress={() => {

                                this.props.navigation.navigate("AddSalary", {

                                    passed_reload_fun: this.reload_fun.bind(this)
                                })
                            }}
                            style={{
                                width: "90%", borderRadius: 10, justifyContent: "center"
                                , alignSelf: "center", marginTop: 20,
                                marginBottom: 10,
                                shadowColor: "#000",

                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 3,
                                backgroundColor: "#5BCDBF",
                                padding: 5


                            }}
                        >
                            <Text style={{
                                fontSize: 22, textAlign: "center", color: "#000",
                                fontFamily: FONTS.fontFamily
                            }}>
                                $ إضافة مرتب
                            </Text>

                        </TouchableOpacity>
                    </>
                )}




























            </>
        )
    }
}



const styles = StyleSheet.create({
    connectionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderContainer: {
        // height: height * 0.32,
        width: '100%',
        // backgroundColor: '#f00',
        marginTop: '1%',
        shadowColor: '#000',
        paddingVertical: '1%',
        paddingHorizontal: '1%',
        // marginVertical:"%",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 10,
    },
    orderIdConatiner: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: '2%',
        // backgroundColor:"#f00"
    },
    timeStatus: {
        flex: 2,
        alignItems: 'flex-end',

        paddingRight: '4%',
        //  backgroundColor:"#f0f"
    },
    orderAddress: {
        // flex: 3,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: '#f0f',
        marginTop: '2%',
    },
    pinIcon: {
        // flex: 1,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressContainer: {
        flex: 1,
    },
});

