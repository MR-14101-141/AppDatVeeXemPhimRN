import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    FlatList,
    PanResponder,
    ImageBackground,
    RefreshControl,
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export function DSve({ navigation }) {
    const [dsve, setDsve] = useState([]);
    const [statedsve, setStateDsve] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {setRefreshing(false)}, 500);
        return function cleanup() {
          clearTimeout(timeoutId);
        }
      }, [refreshing]);


    useEffect(() => {
        let ignore = false;
        const fetchdsve = async () => {
            const id = await AsyncStorage.getItem('@idKH')
            if (statedsve == 1) {
                //navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
                fetch('https://rapphimmeme.000webhostapp.com/home/dsvedat/' + id)
                    .then((response) => response.json())
                    .then((json) => {    
                        if (!ignore) {
                            //console.log(json)
                            setDsve(json)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else if (statedsve == 2) {
                fetch('https://rapphimmeme.000webhostapp.com/home/dsvein/' + id)
                    .then((response) => response.json())
                    .then((json) => {
                        if (!ignore) {
                            //console.log(json)
                            setDsve(json)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else {
                fetch('https://rapphimmeme.000webhostapp.com/home/dsvehuy/' + id)
                    .then((response) => response.json())
                    .then((json) => {
                        //console.log(otherParam)
                        if (!ignore) {
                            setDsve(json)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
        fetchdsve();
        return () => { ignore = true; }
    }, [statedsve,refreshing])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, [])

    const STATErender = (state) => {
        let head;
        if (state == 1) {
            head = <View style={{ top: scale(5), flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'red', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center' }}>Vé đặt</Text>
                </View>
                <TouchableOpacity onPress={() => setStateDsve(2)} style={{ backgroundColor: '#dcdcdcdc', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center', }}>Vé in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStateDsve(3)} style={{ backgroundColor: '#dcdcdcdc', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center', }}>Vé huỷ</Text>
                </TouchableOpacity>
            </View>
        }
        else if (state == 2) {
            head = <View style={{ top: 5, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => setStateDsve(1)} style={{ backgroundColor: '#dcdcdcdc', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center' }}>Vé đặt</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: 'red', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center', }}>Vé in</Text>
                </View>
                <TouchableOpacity onPress={() => setStateDsve(3)} style={{ backgroundColor: '#dcdcdcdc', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center', }}>Vé huỷ</Text>
                </TouchableOpacity>
            </View>
        }
        else {
            head = <View style={{ top: 5, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => setStateDsve(1)} style={{ backgroundColor: '#dcdcdcdc', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center' }}>Vé đặt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStateDsve(2)} style={{ backgroundColor: '#dcdcdcdc', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center', }}>Vé in</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: 'red', paddingVertical: scale(5), width: scale(90), height: scale(42), borderRadius: 10, marginBottom: scale(17), marginRight: scale(10) }}>
                    <Text style={{ fontSize: scale(20), color: '#2c2c2c', alignSelf: 'center', }}>Vé huỷ</Text>
                </View>
            </View>
        }
        return head;
    }

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#2c2c2c' }}>
            <View style={{ width: '100%', height: '90%', backgroundColor: '#2c2c2c' }}>
                {STATErender(statedsve)}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    onScroll={() => { navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true }) }}
                    data={dsve}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                    }}
                    //contentContainerStyle = {{justifyContent:'space-between'}}
                    renderItem={({ item, index }) =>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: scale(25), width: '100%', color: 'red' }}>{item.ngaydat} - - - - - -</Text>
                            {item.dsve.map((ve, index) =>
                                <ImageBackground key={index} style={{ width: scale(310), height: scale(152), marginVertical: scale(5) }} source={{ uri: 'https://rapphimmeme.000webhostapp.com/hinhanh/veTemplate/vetemplate.jpg' }}>
                                    <Text style={{ left: scale(14), top: scale(60), color: 'black', fontSize: scale(13), fontFamily: 'sans-serif' }} >#{ve.idVe}</Text>
                                    <Text style={{ left: scale(14), top: scale(76), color: 'black', fontSize: scale(13), fontFamily: 'sans-serif' }} >{ve.tenPhim}</Text>
                                    <Text style={{ left: scale(248), top: scale(35), color: 'red', fontSize: scale(28), fontFamily: 'sans-serif' }} >{ve.vitrighe}</Text>
                                    <Text style={{ left: scale(28), top: scale(56), color: 'black', fontSize: scale(13), fontFamily: 'sans-serif' }} >{ve.vitriphong}</Text>
                                    <Text style={{ left: scale(78), top: scale(38), color: 'black', fontSize: scale(13), fontFamily: 'sans-serif' }} >{Moment(ve.ngaychieu).format("DD/MM/YYYY")}  {ve.giochieu.toString().substring(0, 5)}</Text>
                                </ImageBackground>
                            )}
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl colors={["tomato", "red"]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    // Performance settings
                    removeClippedSubviews={true} // Unmount components when outside of window 
                    initialNumToRender={2} // Reduce initial render amount
                    maxToRenderPerBatch={1} // Reduce number in each render batch
                    updateCellsBatchingPeriod={100} // Increase time between renders
                    windowSize={7} // Reduce the window size
                //onEndReached={Lazyload}
                //onEndReachedThreshold={.2}
                //ListFooterComponent={footerList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%',
    },
    title: {
        marginBottom: 20,
    },
    touch: {
        marginVertical: '2%',
        backgroundColor: 'tomato',
        width: '100%',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#dcdcdcdc',
    },
    head: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'red',
    }
});
