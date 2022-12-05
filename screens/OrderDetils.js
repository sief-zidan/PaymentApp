import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView, Dimensions, Modal, FlatList, StatusBar, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class OrderDetils extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            allprouct: this.props.navigation.getParam("allproducts"),
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        let userdata = this.props.navigation.getParam("allproducts")
        // alert(JSON.stringify(userdata))
        this.setState({ allproducts: userdata })

        setTimeout(() => {
            this.setState({ loading: false })

        }, 1000);


    }


    render() {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        opacity: this.state.modalDetails ? .2 : null,

                    }}
                >
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

                                }}>تفاصيل الطلبية </Text>
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


                            {this.state.allprouct.length == 0 ? (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Text
                                        style={{

                                            fontFamily: FONTS.fontFamily,
                                            alignSelf: "center", fontSize: 20, color: "#000"
                                        }}
                                    >
                                        لا يوجد مطلوبة
                                    </Text>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <ScrollView>
                                        {this.state.allprouct.map(item => (
                                            <View style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 1 }}>


                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        اسم المنتج :  <Text style={{ color: COLORS.darkGray }}>{item.product_name}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        سعر المنتج  :  <Text style={{ color: COLORS.darkGray }}>{item.product_price}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        الكمية  :  <Text style={{ color: COLORS.darkGray }}>{item.product_count}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: "100%", justifyContent: "center" }} >
                                                    <Text style={[FONTS.h3, { color: "#000" }]}>
                                                        الإجمالي   :  <Text style={{ color: COLORS.darkGray }}>{parseFloat(item.product_price) * parseFloat(item.product_count)}</Text>
                                                    </Text>
                                                </View>

                                            </View>
                                        ))}



                                    </ScrollView>
                                    <TouchableOpacity
                                        style={{
                                            width: '40%',
                                            alignSelf: 'center',
                                            padding: 10,
                                            backgroundColor: "#00B3B3",
                                            borderRadius: 10,
                                            elevation: 3,
                                            marginVertical: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            // marginTop: 30,
                                            marginBottom: 10
                                        }}
                                        onPress={() => {
                                            this.props.navigation.goBack()


                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: '#fff',
                                                fontSize: 18,
                                            }}>
                                            حسناّ
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            )}



                        </>
                    )}

                </View>














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
    container: {
        flex: 1,
    },
    item: {
        height: 100,
        marginBottom: 5,
        backgroundColor: 'grey',
        marginHorizontal: 10,
    },
    header: {
        height: 300,
        backgroundColor: COLORS.primary,
        // position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: -5
    },


});

