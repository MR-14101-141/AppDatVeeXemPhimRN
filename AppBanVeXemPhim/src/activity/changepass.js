import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { scale } from "react-native-size-matters";

export function Changepass({ navigation }) {
    const [passold, setPassOld] = useState('');
    const [passnew, setPassNew] = useState('');
    const [passconfirm, setPassConfirm] = useState('');

    const onPress = async () => {
        const id = await AsyncStorage.getItem('@idKH')
        var formData = new FormData();
        formData.append("idKH", id);
        formData.append("passold", passold);
        if (passnew === passconfirm) {
            formData.append("passnew", passnew);
            fetch('https://rapphimmeme.000webhostapp.com/update-password', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            }).then(response => response.json())
                .then(json => {
                    if (json === "changepass") {
                        navigation.navigate('KHprofile')
                    }
                    else {
                        console.log(json.message)
                    }
                })
                .catch((error) => {
                    console.log(formData)
                    console.log(error);
                });
        }
        else {

        }
    }

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#2c2c2c', }}>

            <TouchableOpacity style={{ width: 'auto', height: 'auto' }} onPress={() => navigation.goBack()}>
                <Icon name='arrow-back'
                    size={scale(40)} color='red' >
                </Icon>
            </TouchableOpacity>
            <View style={styles.container}>
                <Head style={styles.title}>ĐỔI MẬT KHẨU</Head>
                <Input style={styles.input} placeholder={'Mật khẩu cũ'}
                    onChangeText={(text) => setPassOld(text)} />
                <Input style={styles.input} placeholder={'Mật khẩu mới'}
                    onChangeText={(text) => setPassNew(text)} />
                <Input style={styles.input} placeholder={'Xác nhận mật khẩu mới'}
                    onChangeText={(text) => setPassConfirm(text)} />
                <Filledbtn style={styles.loginbtn} title={'Đổi mật khẩu'} onPress={onPress} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c2c2c',
        flex: 1,
        paddingTop: scale(100),
        alignItems: 'center',
        paddingHorizontal: scale(13),
    },
    input: {
        marginVertical: scale(4),
        fontSize: scale(12)
    },
    title: {
        marginBottom: scale(20),
    },
    loginbtn: {
        marginVertical: scale(6),
        fontSize: scale(20),
    },
});
