import React, { useState, useEffect,useCallback } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    FlatList,
    View,
    Alert,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { scale } from "react-native-size-matters";

export function DsGhe({ navigation, route }) {
    const { otherParam } = route.params;
    const [Phong, setPhong] = useState([]);
    const [DsVe, setDsVe] = useState([]);
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
            fetch('https://rapphimmeme.000webhostapp.com/home/dsGhe/' + otherParam)
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        console.log('https://rapphimmeme.000webhostapp.com/home/dsGhe/' + otherParam)
                        setPhong(json);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        Fetching();
        return () => { ignore = true; }
    }, [refreshing])

    const onPress = async (index) => {
        const newPhong = Phong.map((item) => { return item; });
        if (newPhong[index].statusVe != 'Còn trống') {
            newPhong[index].selected = false
            Alert.alert('Lỗi', 'Vị trí đã được người khác đặt')
        }
        else {
            if (newPhong[index].selected == true) {
                newPhong[index].selected = false
                const indexve = DsVe.indexOf(newPhong[index])
                DsVe.splice(indexve, 1);
                setDsVe(DsVe)
            }
            else {
                newPhong[index].selected = true
                setDsVe(DsVe.concat(newPhong[index]))
            }
        }
        setPhong(newPhong);
    };
    const onPress2 = async () => {
        if (DsVe.length > 0) {
            navigation.navigate('datve', { otherParam: DsVe })
        } else {
            Alert.alert('Lỗi', 'Bạn chưa chọn vị trí ngồi nào')
        }
    }
    const BGcolor = (index) => {
        const newPhong = Phong.map((item) => { return item; });
        if (newPhong[index].statusVe != 'Còn trống') {
            return 'red'
        }
        else {
            if (newPhong[index].selected == true) {
                //console.log(DsVe)
                return 'white'
            }
            else {
                //console.log(DsVe)
                return 'transparent'
            }
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, [])

    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#2c2c2c' }}>
            <View style={{ top: 5, flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity style={{ width: 'auto', height: 'auto' }} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back'
                        size={scale(40)} color='red' >
                    </Icon>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 'auto', height: 60, position: 'absolute', right: 20 }}
                    onPress={() => onPress2()}>
                    <Icon name='arrow-forward'
                        size={scale(40)} color='red' >
                    </Icon>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: scale(5), alignSelf: 'center', width: '90%', height: '8%', backgroundColor: 'black' }}>
                <Text style={{ color: 'white', alignSelf: 'center', padding: 10, fontSize: scale(18) }}>Vị trí màn hình</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={Phong}
                    renderItem={({ item, index }) =>
                        <View style={{
                            margin: '4%',
                            borderRadius: 15, backgroundColor: BGcolor(index)
                        }}>
                            <TouchableOpacity onPress={() => onPress(index)}>
                                <ImageBackground style={{ height: scale(28), width: scale(28), margin: scale(3) }} source={{ uri: 'https://rapphimmeme.000webhostapp.com/hinhanh/Ghe/Ghe.jpg' }}>
                                    <Text style={{ fontSize:scale(12), alignSelf: 'center', color: item.selected ? 'black' : '#d8d8d8' }}>{item.vitrighe}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    }
                    numColumns={5}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            colors={["tomato", "red"]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '8%'
    },
});
