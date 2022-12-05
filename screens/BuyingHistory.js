import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView, Dimensions, Modal, FlatList, StatusBar, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class BuyingHistory extends React.Component {



    constructor() {
        super()
        this.state = {
            invoice: [
            ],
            opj: {
            },
            chartModal: false,
            late_pay: 0,
            income_pay: 0
        }
    }

    componentDidMount() {

        this.get_deatils()

    }

    get_deatils = () => {
        this.setState({ loading: true });

        axios
            .post(
                `https://camp-coding.org/ZFactory/select_all_invoice.php`
            )
            .then((res) => {
                if (res.status == 200) {

                    if (res.data != 'error') {
                        if (res.data.length > 0) {
                            let late = this.state.late_pay
                            let income = this.state.income_pay

                            let size = res.data.length
                            for (let i = 0; i < size; i++) {
                                late += (parseFloat(res.data[i].total_price) - parseFloat(res.data[i].discount)) - parseFloat(res.data[i].payed)
                                income += parseFloat(res.data[i].payed)
                            }
                            this.setState({
                                invoice: res.data,
                                late_pay: late,
                                income_pay: income
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


            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("OrderDetils", {
                        allproducts: item.allproducts,
                        alldata: item
                    })
                    // alert(JSON.stringify(item.allproducts))
                }}

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
            >
                {((parseFloat(item.total_price) - parseFloat(item.discount)) - parseFloat(item.payed)) == 0 ? (
                    <Image
                        source={require('./sold.png')}
                        style={{
                            height: 50,
                            width: "100%",
                            marginBottom: 10,
                            marginTop: -20
                        }}
                        resizeMode={'contain'}
                    />
                ) : null}
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
                                كود الفاتورة
                            </Text>

                        </View>
                        <View>
                            <Text
                                style={{
                                    color: COLORS.bag10Bg,
                                    fontFamily: FONTS.fontFamily,
                                }}>
                                {item.invoice_id}
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
                                اسم التاجر
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.merchent_name}
                                {/* ************* */}
                            </Text>


                        </View>
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
                                {/* ************* */}
                            </Text>


                        </View>








                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                خصم
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>

                                {item.discount == "" ?
                                    "لايوجد" : item.discount}
                            </Text>


                        </View>
                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                اجمالي الدفع
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.total_price}
                            </Text>


                        </View>

                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                حالة الدفع
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.payment_type == 'payed' ? "تم الدفع" : item.payment_type == 'notPay' ? "دفع اجل" : "دفع جزء"}
                            </Text>


                        </View>

                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                المطلوب
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {(parseFloat(item.total_price) - parseFloat(item.discount))}

                            </Text>


                        </View>


                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                المدفوع
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.payed}
                            </Text>


                        </View>


                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: .5,
                            borderColor: '#ddd'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                المتبقي
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#f00"
                                }}>
                                {(parseFloat(item.total_price) - parseFloat(item.discount)) - parseFloat(item.payed)}
                            </Text>


                        </View>

                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between'
                        }}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: FONTS.fontFamily }}>
                                ملاحظات
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'auto',
                                    fontFamily: FONTS.fontFamily,
                                    alignSelf: "center", fontSize: 15, color: "#9F9FA0"
                                }}>
                                {item.note == "" || item.note == null ? "لا يوجد" : item.note}
                            </Text>


                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("OrderDetils", {
                                    allproducts: item.allproducts
                                })
                            }}
                            style={{

                            }}>
                            <Text style={{
                                color: "#5BCDBF", fontSize: 18, fontFamily: FONTS.fontFamily, textAlign: "center",
                                textDecorationLine: "underline"
                            }}>
                                اضغط لعرض تفاصيل الطلبية
                            </Text>



                        </TouchableOpacity>

                        {/* </View> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <>
                <View
                    style={{
                        flex: 1,

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

                                }}>سجل المبيعات </Text>
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
                            <ScrollView>

                                {this.state.invoice.length == 0 ? (
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
                                            لا يوجد سجلات حتي الان
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        <View
                                            style={{
                                                justifyContent: "space-around",
                                                flexDirection: "row",
                                                marginTop: 10
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "45%",
                                                    backgroundColor: "#68DAB5",
                                                    borderRadius: 15,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        alignItems: "center",
                                                        fontSize: 18,
                                                        color: "#fff",
                                                        fontFamily: FONTS.fontFamily
                                                    }}
                                                >
                                                    اجمالي الدفع الاجل
                                                </Text>
                                                <Text
                                                    style={{
                                                        alignItems: "center",
                                                        fontSize: 18,
                                                        color: "#fff",
                                                        fontFamily: FONTS.fontFamily
                                                    }}
                                                >
                                                    {this.state.late_pay}
                                                </Text>
                                            </View>
                                            <View
                                                style={{

                                                    width: "45%",
                                                    backgroundColor: "#68DAB5",
                                                    borderRadius: 15,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        alignItems: "center",
                                                        fontSize: 18,
                                                        color: "#fff",
                                                        fontFamily: 'Janna LT Bold'
                                                    }}
                                                >
                                                    اجمالي الدخل
                                                </Text>
                                                <Text
                                                    style={{
                                                        alignItems: "center",
                                                        fontSize: 18,
                                                        color: "#fff",
                                                        fontFamily: 'Janna LT Bold'
                                                    }}
                                                >
                                                    {this.state.income_pay}
                                                </Text>
                                            </View>
                                        </View>
                                        <FlatList
                                            data={this.state.invoice}
                                            numColumns={1}
                                            renderItem={({ item, index }) => this.renderinvoice(item, index)} />
                                    </>
                                )}

                            </ScrollView>

                        </>

                    )}






                </View>









                <Modal
                    visible={false}
                    onRequestClose={() => {
                        this.setState({ chartModal: false })
                    }}
                    transparent={true}
                    animationType={'slide'}
                >
                    <View
                        style={{

                            flex: 1,
                            backgroundColor: "#ddd"
                        }}
                    >

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

                                    }}>احصائيات </Text>
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
                                        this.setState({ chartModal: false })

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






                    </View>

                </Modal>









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

