import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button, View, Alert, Platform, TouchableOpacity
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import { Youtubeiframe } from "../components/youtubeiframe";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from "react-native-size-matters";

export function CTPhimpage({ navigation, route }) {
  const { otherParam } = route.params;
  const [trailer, setTrailer] = useState('');
  const [tenPhim, setTenPhim] = useState('');
  const [imgPhim, setImgPhim] = useState('');
  const [mieutaPhim, setMieutaPhim] = useState('');
  const [daodienPhim, setDaodienPhim] = useState('');
  const [danhgia, setDanhgia] = useState('');
  const [thoiluong, setThoiluong] = useState('');

  const [loaiPhim, setLoaiPhim] = useState([]);
  const [dienvienPhim, setDienviennPhim] = useState([]);

  useEffect(() => {
    let ignore = false;
    const Fetching = async () => {
      navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
      fetch('https://rapphimmeme.000webhostapp.com/home/singlePhim/' + otherParam)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            //console.log(json);
            setTrailer(json.trailerPhim.split("v=")[1].substring(0, 11))
            setTenPhim(json.tenPhim)
            setDaodienPhim(json.daodienPhim)
            setMieutaPhim(json.mieutaPhim)
            setDienviennPhim(json.DV)
            setLoaiPhim(json.LPhim)
            setDanhgia(json.rate)
            setThoiluong(json.thoiluongPhim)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    Fetching();
    return () => { ignore = true; }
  }, [])

  const onDatve = async () => {
    const id = await AsyncStorage.getItem('@idKH')
    if (id === null) {
      Alert.alert('Lỗi', 'Bạn phải đăng nhập để đặt vé', [{ text: 'OK', onPress: () => navigation.navigate('KH') }])
    } else {
      navigation.navigate('dsLC', {
        otherParam: otherParam,
      })
    }
  }

  // return (
  //   <View onLayout={onLayout}>
  //     <ScrollView>
  //       <Youtubeiframe videoId={trailer} />
  //       <Head>{tenPhim}</Head>
  //       <View style={{ flex: 1, flexDirection: 'row' }}>
  //         <Text style={{ flex: 0.1 }}>Thể loại:</Text>
  //         {loaiPhim.map((lphim, index) => <Txtbtn style={{ flex: 0.15 }} key={index} title={lphim} />)}
  //       </View>
  //       <Text>Diễn viên:</Text>
  //       {dienvienPhim.map((dv, index) => <Txtbtn key={index} title={dv} />)}
  //       <Text>Đạo diễn: {daodienPhim}</Text>
  //       <Head>Nội dung:</Head>
  //       <Text>{mieutaPhim}</Text>
  //     </ScrollView>
  //   </View>
  // );

  return (
    <View style={{ backgroundColor: '#2c2c2c', height: '100%' }}>
      <TouchableOpacity style={{ width: 'auto', height: 'auto' }} onPress={() => navigation.goBack()}>
        <Icon name='arrow-back'
          size={scale(40)} color='red' >
        </Icon>
      </TouchableOpacity>
      <ScrollView>
        <View style={{ paddingBottom: '25%' }}>
          <Youtubeiframe height={scale(200)} videoId={trailer} />
          <Head>{tenPhim}</Head>
          <Text style={styles.text}>Thời lượng phim: {thoiluong.toString()}</Text>
          <Text style={styles.text}>Đánh giá: {danhgia.toString()}</Text>
          <Text style={styles.text}>Thể loại: {loaiPhim.toString()}</Text>
          <Text style={styles.text}>Diễn viên: {dienvienPhim.toString()}</Text>
          <Text style={styles.text}>Đạo diễn: {daodienPhim}</Text>
          <Head>Nội dung:</Head>
          <Text style={styles.text}>{mieutaPhim}</Text>
        </View>
      </ScrollView>
      <View style={{ height: '10%', width: '100%', position: 'absolute', bottom: '5%', alignItems: 'center', }}>
        <TouchableOpacity onPress={onDatve} style={styles.btn}>
          <Text style={styles.textbtn}>{'Đặt vé'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: '100%',
    marginVertical: '3%',
    backgroundColor: 'tomato',
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
  },
  textbtn: {
    padding: scale(1),
    fontWeight: 'bold',
    fontSize: scale(40),
    color: 'white',
  },
  text: {
    fontSize: scale(17),
    color: 'white',
  },
});
