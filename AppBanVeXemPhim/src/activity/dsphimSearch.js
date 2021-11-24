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
    RefreshControl
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { set } from "react-native-reanimated";
import { scale } from "react-native-size-matters";


export function DsphimSearch({ navigation }) {
    const [dsphim, setDsphim] = useState([]);
    const [searchtxt, setSearchTxt] = useState('');
    const [link, setLink] = useState('https://rapphimmeme.000webhostapp.com/home/dsphimSearch/');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setRefreshing(false)
        }, 500);
        return function cleanup() {
            clearTimeout(timeoutId);
        }
    }, [refreshing]);



    const onSubmitEditing = () => {
        setSearch(true)
        setPage(1)
        setDsphim([])
        setLink('https://rapphimmeme.000webhostapp.com/home/dsphimSearch/' + searchtxt)
    }

    const Lazyload = () => {
        setSearch(true)
        setPage(pg => pg + 1)
        setLink('https://rapphimmeme.000webhostapp.com/home/dsphimSearch/' + searchtxt)
    }

    const footerList = () => {
        return (
            <View>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    }

    useEffect(() => {
        //navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
        let ignore = false;
        const Fetching = async () => {
            const url = link + '?page=' + page
            //console.log(url)
            fetch(url)
                .then((reponse) => reponse.json())
                .then((responseJson) => {
                    if (!ignore) {
                        setSearch(false)
                        if (responseJson.dsphim.data == []) {
                        }
                        else {
                            if (refreshing) {
                                setDsphim(responseJson.dsphim.data)
                            }
                            else {
                                setDsphim(dsphim.concat(responseJson.dsphim.data))
                            }
                        }
                    }
                })
                .catch((erron) => {
                    console.error(erron);
                })
        }
        if (search) {
            Fetching();
        }
        return () => { ignore = true; }
    }, [link, page])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1)
        setLink('https://rapphimmeme.000webhostapp.com/home/dsphimSearch/' + searchtxt)
        setSearch(true)
    }, [searchtxt])

    return (
        <View onLayout={() => navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })}
            style={{ flex: 1, backgroundColor: '#2c2c2c' }}>
            <View style={{ top: scale(3), flexDirection: 'row', width: '100%', marginBottom: scale(8) }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back'
                        size={scale(40)} color='red' >
                    </Icon>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#d8d8d8', flexDirection: 'row', width: '86%', borderRadius: 25 }}>
                    <View style={{ padding: scale(4) }} >
                        <Icon name='search'
                            size={scale(32)} color='#2c2c2c' >
                        </Icon>
                    </View>
                    <TextInput style={{ color: 'black', height: scale(42), fontSize: scale(16), width: '100%' }} placeholderTextColor='grey' placeholder={'Tìm kiếm phim'}
                        autoFocus={true}
                        onSubmitEditing={onSubmitEditing}
                        onChangeText={(text) => { setSearchTxt(text) }}
                    />
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                //onScroll={() => { navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true }) }}
                data={dsphim}
                contentContainerStyle={{
                    padding: scale(10),
                }}

                //contentContainerStyle = {{justifyContent:'space-between'}}
                renderItem={({ item, index }) =>
                    <View style={{
                        padding: scale(5), width: '48%', marginBottom: scale(10),
                        backgroundColor: '#dcdcdcdc', borderRadius: 12,

                    }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('CTPhimpage', { otherParam: item.idPhim }) }}>
                            <PhimItem items={item} index={index} />
                        </TouchableOpacity>
                    </View>
                }
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}

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
                onEndReached={Lazyload}
                onEndReachedThreshold={.2}
                ListFooterComponent={footerList}
            />
        </View>
    )
}

function PhimItem({ items, index }) {
    return (
        <View>

            <Image style={{ width: '100%', height: scale(190), borderRadius: 12 }}
                source={{ uri: 'https://rapphimmeme.000webhostapp.com/hinhanh/Phim/' + items.imgPhim + '?time=' + (new Date()) }}
            />
            <View>
                <Text numberOfLines={1} style={{ fontSize: scale(20), color: 'black', marginTop: 8, alignSelf: 'center' }}>{items.tenPhim}</Text>
                <Text style={{ fontSize: scale(12), color: 'black', alignSelf: 'center' }}>Thời lượng: {items.thoiluongPhim}</Text>
                <Text style={{ fontSize: scale(12), color: 'black', marginBottom: 10, alignSelf: 'center' }}>Đánh giá: {items.rate}</Text>
            </View>

        </View>
    );
}
