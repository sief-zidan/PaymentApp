import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';


export default class Salarydetils extends React.Component {



    constructor() {
        super()
        this.state = {
            worker: [



            ],
            total_payd: 0,
            loading: false
        }
    }

    componentDidMount() {

        this.get_deatils()

    }




    get_deatils = () => {
        this.setState({ loading: true });

        let data = this.props.navigation.getParam('alldata')
        let month = this.props.navigation.getParam('month')

        let arr = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].date.slice(5, 7) == month) {
                arr.push(data[i])

            }
        }
        this.setState({ worker: arr })

        let total_payd = 0
        for (let x = 0; x < arr.length; x++) {
            total_payd += parseFloat(arr[x].total_salery)
        }
        this.setState({ total_payd })

        setTimeout(() => {
            this.setState({ loading: false });

        }, 500);



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

    renderworker(item, index) {
        return (
            <View

                style={{

                    width: '95%',
                    borderRadius: SIZES.radius,
                    alignSelf: 'center',
                    paddingLeft: SIZES.padding,
                    paddingRight: SIZES.padding,
                    paddingTop: 20,
                    paddingBottom: 10,



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
                                    color: COLORS.bag10Bg,
                                    fontFamily: FONTS.fontFamily,
                                }}>
                                كود المرتب
                            </Text>

                        </View>
                        <View>
                            <Text
                                style={{
                                    color: COLORS.bag10Bg,
                                    fontFamily: FONTS.fontFamily,
                                }}>
                                {item.salary_id}
                            </Text>
                        </View>

                    </View>


                </View>



                <View style={styles.orderAddress}>


                    <View style={styles.addressContainer}>

                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                التاريخ
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.date.slice(0, 10)}
                            </Text>


                        </View>


                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                اسم العامل
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.workers_name}
                            </Text>


                        </View>


                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                عدد الايام
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.day_of_work}
                            </Text>


                        </View>



                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                سعر اليوم
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.price_per_day}
                            </Text>


                        </View>



                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                الاجمالي
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.total_salery}
                            </Text>


                        </View>




                        {/* </View> */}
                    </View>
                </View>
            </View>
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

                            }}>
                                تفاصيل مرتبات شهر {this.getname(this.props.navigation.getParam('month'))}
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
                        <View



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
                                            اجمالي مرتبات شهر {this.getname(this.props.navigation.getParam('month'))}

                                        </Text>

                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                color: COLORS.bag10Bg,
                                                fontFamily: FONTS.fontFamily,
                                            }}>
                                            {this.state.total_payd}
                                        </Text>
                                    </View>

                                </View>


                            </View>




                        </View>
                        <FlatList
                            data={this.state.worker}
                            numColumns={1}
                            renderItem={({ item, index }) => this.renderworker(item, index)} />

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

