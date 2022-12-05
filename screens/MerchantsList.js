import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';


export default class MerchantsList extends React.Component {



    constructor() {
        super()
        this.state = {
            names: [

            ],
            loading: false
        }
    }

    componentDidMount() {
        this.get_merchant()
    }
    get_merchant = () => {
        this.setState({ loading: true })
        axios
            .post(
                `https://camp-coding.org/ZFactory/select_merchent.php`
            )
            .then((res) => {
                if (res.status == 200) {

                    if (res.data != 'error') {
                        if (res.data.length > 0) {

                            this.setState({
                                names: res.data,
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

    rendeMerchant(item, index) {
        return (

            <TouchableOpacity
                onPress={() => {

                    // alert(this.state.maker_id)

                    this.props.navigation.navigate("MerchentDetils", {
                        item: item
                    })


                }}
                style={{
                    width: "95%"
                    , alignSelf: "center", marginTop: 20, justifyContent: "center",
                    borderBottomWidth: .5,
                    borderBottomColor: "#595757de"

                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >

                    <View

                        style={{
                            flexDirection: 'row',
                            padding: 8,
                            alignItems: "center"
                        }}
                    >


                        <Text style={{ fontSize: 25, marginLeft: 10, color: "#000" }}>
                            {item.value}
                        </Text>
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

                            }}>التجار</Text>
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
                            data={this.state.names}
                            numColumns={1}
                            renderItem={({ item, index }) => this.rendeMerchant(item, index)} />
                    </>
                )}



            </>
        )
    }
}