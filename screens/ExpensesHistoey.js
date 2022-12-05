import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';


export default class ExpensesHistoey extends React.Component {



    constructor() {
        super()
        this.state = {
            invoice: [



            ],
            loading: false
        }
    }

    componentDidMount() {

        this.get_deatils()

    }

    get_deatils = () => {
        this.setState({ loading: true });

        axios
            .post(
                `https://camp-coding.org/ZFactory/select_expenses.php`
            )
            .then((res) => {
                if (res.status == 200) {

                    if (res.data != 'error') {
                        if (res.data.length > 0) {

                            this.setState({
                                invoice: res.data,
                            });
                            // console.log(res.data)
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


    renderinvoice(item, index) {
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
                                كود المصروف
                            </Text>

                        </View>
                        <View>
                            <Text
                                style={{
                                    color: COLORS.bag10Bg,
                                    fontFamily: FONTS.fontFamily,
                                }}>
                                {item.expenses_id}
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
                                اسم المصروف
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.expenses_name}
                            </Text>


                        </View>



                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                المبلغ
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.expenses_price}
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

                            }}>التفاصيل</Text>
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
                    <FlatList
                        data={this.state.invoice}
                        numColumns={1}
                        renderItem={({ item, index }) => this.renderinvoice(item, index)} />
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

