import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';


export default class StateDetils extends React.Component {



    constructor() {
        super()
        this.state = {
            worker: [



            ],
            total_payd: 0,
            loading: false,
            ordermatrial: '',
            orderPrice: '',
            worker_salary: ""
        }
    }

    componentDidMount() {

        this.get_deatils()

    }




    get_deatils = () => {
        this.getworkers()
        let data = this.props.navigation.getParam('alldata')
        let orderPrice = 0
        let ordermatrial = 0

        for (let i = 0; i < data.length; i++) {
            let price = parseFloat(data[i].product_price) * parseFloat(data[i].product_count)
            orderPrice += price
            ordermatrial += parseFloat(data[i].price_before_opreation)

        }

        this.setState({
            ordermatrial,
            orderPrice
        })






    }

    getworkers() {
        this.setState({ loading: true });

        data_to_send = {
            date: this.props.navigation.getParam('mon_num')
        }
        axios
            .post(
                `https://camp-coding.org/ZFactory/select_workers_package.php`,
                data_to_send
            )
            .then((res) => {
                if (res.status == 200) {

                    if (res.data != 'error') {
                        let data = res.data
                        let worker_salary = 0
                        for (let i = 0; i < data.length; i++) {
                            worker_salary += parseFloat(data[i].total_salery)
                        }
                        this.setState({
                            worker_salary
                        })
                    }

                } else {
                    Alert.alert('أدمن', 'عذرا يرجي المحاوله في وقتا لاحق');
                }
                this.setState({ loading: false });
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

                            }}>
                                تفاصيل الشهر
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
                                marginTop: 10
                            }}
                            onPress={() => {
                            }}>




                            <View style={styles.orderAddress}>


                                <View style={styles.addressContainer}>




                                    <View style={{
                                        flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                                        borderColor: '#ddd'
                                    }}>
                                        <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                            اجمالي سعر الخام
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'auto',
                                                fontFamily: FONTS.fontFamily,
                                                alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                            }}>
                                            {this.state.ordermatrial}
                                        </Text>


                                    </View>


                                    <View style={{
                                        flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                                        borderColor: '#ddd'
                                    }}>
                                        <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                            اجمالي طلبات الشهر
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'auto',
                                                fontFamily: FONTS.fontFamily,
                                                alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                            }}>
                                            {this.state.orderPrice}

                                        </Text>


                                    </View>



                                    <View style={{
                                        flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                                        borderColor: '#ddd'
                                    }}>
                                        <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                            صافي الربح بعد الخام
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'auto',
                                                fontFamily: FONTS.fontFamily,
                                                alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                            }}>
                                            {parseFloat(this.state.orderPrice) - parseFloat(this.state.ordermatrial)}
                                        </Text>


                                    </View>

                                    <View style={{
                                        flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                                        borderColor: '#ddd'
                                    }}>
                                        <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                            مرتبات العمال
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'auto',
                                                fontFamily: FONTS.fontFamily,
                                                alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                            }}>
                                            {this.state.worker_salary}
                                        </Text>


                                    </View>


                                    <View style={{
                                        justifyContent: 'space-between',
                                        marginVertical: 30
                                    }}>
                                        <Text style={{ textAlign: 'center', color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                            صافي ربح الشهر
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: FONTS.fontFamily,
                                                alignSelf: "center", fontSize: 15, color: "#845EC2"
                                            }}>

                                            {parseFloat(this.state.orderPrice) - parseFloat(this.state.ordermatrial) - parseFloat(this.state.worker_salary)}
                                        </Text>


                                    </View>




                                    {/* </View> */}
                                </View>
                            </View>
                        </View>
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

