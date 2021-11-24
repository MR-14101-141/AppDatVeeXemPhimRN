import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Alert,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import { DATEPICKER } from '../components/datepicker';
import { Picker } from '@react-native-picker/picker';
import { Avatarpicker } from "../components/avatarpicker";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { set } from "react-native-reanimated";
import { scale } from "react-native-size-matters";

export function Datve({ navigation, route }) {
    const { otherParam } = route.params;
    const [tenKH, setTenKH] = useState('');
    const [vitriphong, setVTPhong] = useState('');
    const [dsVe, setDSVe] = useState([]);
    const [salecode, setSaleCode] = useState('');
    const [vitrighe, setVTGhe] = useState([]);
    const [phim, setPhim] = useState('');
    const [ngaychieu, setNC] = useState('');
    const [giochieu, setGC] = useState('');
    const [tienve, setTienVe] = useState(0);
    const [tienKM, setTienKM] = useState(0);
    const [coKM, setCoKM] = useState(false);
    const [tongtien, setTongTien] = useState(0);

    const onPress = async () => {
        const id = await AsyncStorage.getItem('@idKH')
        const ten = await AsyncStorage.getItem('@tenKH')
        var formData = new FormData();
        formData.append("idKH", id);
        formData.append("tenPhim", phim);
        formData.append("ngaychieu", ngaychieu);
        formData.append("giochieu", giochieu);
        formData.append("idKM", salecode);
        formData.append("tienve", tienve);
        formData.append("tienKM", tienKM);
        formData.append("tongtien", tongtien);
        formData.append("dsve", JSON.stringify(otherParam));
        fetch('https://rapphimmeme.000webhostapp.com/home/Datve', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            },
            body: formData,
        }).then(response => response.json())
            .then(json => {
                console.log(formData)
                if (json == "đặt vé") {
                    navigation.navigate('Home')
                }
                else {
                    console.log(json)
                }
            })
            .catch((error) => {
                console.log(formData)
                console.log(error);
            })
    }

    const onSubmitEditing = async () => {
        if (salecode != '') {
            fetch('https://rapphimmeme.000webhostapp.com/home/KM/' + salecode)
                .then((reponse) => reponse.json())
                .then((responseJson) => {
                    if (responseJson == 'Mã KM không tồn tại') {
                        setCoKM(false)
                        setTongTien(tienve * otherParam.length)
                    }
                    else {
                        setCoKM(true)
                        setTienKM(tienve * responseJson[0].trigiaKM)
                        setTongTien((tienve * otherParam.length) - (tienve * otherParam.length * responseJson[0].trigiaKM))
                    }
                })
                .catch((erron) => {
                    console.error(erron);
                })
        }
        else {
            setCoKM(false)
            setTongTien(tienve * otherParam.length)
        }

    }

    useEffect(async () => {
        const ten = await AsyncStorage.getItem('@tenKH')
        const id = await AsyncStorage.getItem('@idKH')
        const dsghe = await otherParam.map((item, index) => {
            setVTGhe(prevState => {
                return prevState.concat(otherParam[index].vitrighe)
            });
        })
        setTenKH(JSON.parse(ten))
        setVTPhong(otherParam[0].vitriphong)
        setGC(otherParam[0].giochieu)
        setNC(otherParam[0].ngaychieu)
        setPhim(otherParam[0].tenPhim)
        setTienVe(otherParam[0].tongtien)
        setTongTien(otherParam[0].tongtien * otherParam.length)
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: scale(40), height: scale(40) }} onPress={() => navigation.goBack()}>
                <Icon name='arrow-back'
                    size={scale(40)} color='red' >
                </Icon>
            </TouchableOpacity>
            <ScrollView>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Tên khách hàng: {tenKH}</Text>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Tên phim: {phim}</Text>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Suất chiếu: {ngaychieu} {giochieu.toString().substring(0, 5)}</Text>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Vị trí phòng: {vitriphong}</Text>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Vị trí ghế: {vitrighe.toString()}</Text>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1), flexDirection: 'row', }}>
                <Text style={{ alignSelf: 'center', fontSize: scale(24), color: 'white', width: 'auto' }}>Mã giảm giá:</Text>
                <TextInput style={{ flex: 1, fontSize: scale(24), color: 'white', backgroundColor: 'red', width: '74%' }}
                    onChangeText={(text) => setSaleCode(text)} onSubmitEditing={() => onSubmitEditing()}></TextInput>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Tiền vé: {tienve.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
            </View>
            {coKM &&
                <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                    <Text style={{ fontSize: scale(24), color: 'white' }}>Giảm giá: - {tienKM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                </View>}

            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Số lượng: {otherParam.length}</Text>
            </View>
            <View style={{ borderBottomColor: 'red', borderBottomWidth: scale(1) }}>
                <Text style={{ fontSize: scale(24), color: 'white' }}>Tổng tiền: {tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
            </View>
            </ScrollView>
            <View style={{ height: '10%', width: '100%', position: 'absolute', bottom: '5%', alignItems: 'center', }}>
                <TouchableOpacity style={styles.btn} onPress={() => onPress()} style={styles.btn}>
                    <Text style={styles.textbtn}>{'Đặt vé'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c2c2c',
        width: '100%',
        height: '100%'
    },
    textbtn: {
        padding: scale(1),
        fontWeight: 'bold',
        fontSize: scale(40),
        color: 'white',
      },
    btn: {
        height: '100%',
        marginVertical: '3%',
        backgroundColor: 'tomato',
        width: '90%',
        alignItems: 'center',
        borderRadius: 8,
    },
});
