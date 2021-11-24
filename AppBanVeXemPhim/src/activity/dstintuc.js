import React, { useState, useEffect, useCallback } from "react";
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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { scale } from "react-native-size-matters";


export function DStintuc({ navigation }) {
    const [dstintuc, setDstintuc] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setRefreshing(false), 500);
        return function cleanup() {
          clearTimeout(timeoutId);
        }
      }, [refreshing]);


    useEffect(() => {
        let ignore = false;
        const Fetching = async () => {
            await navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true })
            fetch('https://rapphimmeme.000webhostapp.com/home/dstintuc/')
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        //console.log('https://rapphimmeme.000webhostapp.com/home/dstintuc/')
                        setDstintuc(json)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        Fetching();
        return () => { ignore = true; }
    }, [refreshing])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, [])

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#2c2c2c' }}>
            <View style={{ width: '100%', height: '90%', backgroundColor: '#2c2c2c' }}>
                <View style={{ top: scale(3), flexDirection: 'row', width: '100%' }}>
                    <View style={{ padding: scale(5), width: '25%', height: scale(33), borderRadius: 10, marginBottom: scale(8), marginRight: scale(5) }}>
                        <Text style={{ fontSize: scale(20), color: 'red', alignSelf: 'center', }}>Tin tức</Text>
                    </View>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    onScroll={() => { navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true }) }}
                    data={dstintuc}
                    contentContainerStyle={{
                        paddingHorizontal: scale(8),
                    }}
                    //contentContainerStyle = {{justifyContent:'space-between'}}
                    renderItem={({ item, index }) =>
                        <View key={index} style={{ marginBottom: scale(5), padding: scale(5), width: '95%', height: scale(150), alignItems: 'center', alignSelf: 'center', borderRadius: 25, backgroundColor: '#d8d8d8' }}>
                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => { navigation.navigate('CTtintuc', { otherParam: item.idtintuc }) }} >
                                <Image style={{ height: '98%', width: '98%', borderRadius: 25, alignSelf: 'center', }} source={{ uri: 'https://rapphimmeme.000webhostapp.com/hinhanh/Tintuc/' + item.imgtintuc }}></Image>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            colors={["tomato", "red"]}
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
