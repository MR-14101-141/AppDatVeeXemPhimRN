import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from "react-native-size-matters";

export function SplashScreenVe({ navigation }) {

    useEffect(() => {
        AsyncStorage.getItem('@idKH').then((value) => {
            if (value === null) {
                Alert.alert('Lỗi', 'Bạn phải đăng nhập để xem danh sách vé', [{ text: 'OK', onPress: () => navigation.navigate('KH') }])
            }
            else {
                navigation.replace('DSve')
            }
        }
        );
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center',backgroundColor:'#2c2c2c' }}>
            <ActivityIndicator size="large" color="black" />
            <Text style={{alignSelf:'center',fontSize:scale(16)}}>Bạn phải đăng nhập để xem danh sách vé đặt</Text>
        </View>
    )
}
