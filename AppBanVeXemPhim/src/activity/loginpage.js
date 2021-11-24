import React, { useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { scale } from "react-native-size-matters";
import { color } from "react-native-reanimated";
import PushNotification from 'react-native-push-notification'

export function Loginpage({ navigation }) {

  const [emailKH, setEmailKH] = useState('');
  const [passwordKH, setPasswordKH] = useState('');
  const [deviceKH, setDeviceKH] = useState('');

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        setDeviceKH(token['token'])
      }
    })
  }, [])


  const handleSubmitPress = async () => {
    if (emailKH == '') {
      Alert.alert('Lỗi', 'Email KH chưa nhập')
    }
    else if (passwordKH == '') {
      Alert.alert('Lỗi', 'Mật khẩu KH chưa nhập')
    }
    else {
      var formData = new FormData();
      formData.append("emailKH", emailKH);
      formData.append("passwordKH", passwordKH);
      formData.append("deviceKH", deviceKH);
      fetch('https://rapphimmeme.000webhostapp.com/actionlogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
        body: formData,
      }).then(response => response.json())
        .then(json => {
          //console.log(formData)
          if (json.status == 'success') {
            AsyncStorage.setItem('@tenKH', JSON.stringify(json.tenKH)),
              AsyncStorage.setItem('@idKH', JSON.stringify(json.idKH))
            //navigation.replace('KHprofile')
            navigation.dispatch(
              CommonActions.reset({
                routes: [
                  { name: 'KH' },
                  { name: 'Dsve' }
                ]
              })
            )
          } else if (json.status == "fail") {
            Alert.alert('Lỗi', 'Sai tên hoặc sai mật khẩu')
          }
          else {
            console.log(json.message)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Input style={styles.input} placeholderTextColor='grey' placeholder={'Email@example.com'} keyboardType={'email-address'}
        onChangeText={(text) => setEmailKH(text)} />
      <Input style={styles.input} placeholderTextColor='grey' placeholder={'Password'} secureTextEntry
        onChangeText={(text) => setPasswordKH(text)} />
      <Filledbtn onPress={handleSubmitPress} style={styles.loginbtn} title={'Đăng nhập'} />
      <Txtbtn style={styles.txtbtn} onPress={() => navigation.navigate('Đăng ký')} title={'Bạn chưa có tài khoản ?'} />
    </View>
  );
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
    fontSize: scale(12),
    color: 'black'
  },
  title: {
    marginBottom: scale(20),
  },
  loginbtn: {
    marginVertical: scale(6),
    fontSize: scale(20),
  },
  txtbtn: {
    fontSize: scale(12)
  }
});
