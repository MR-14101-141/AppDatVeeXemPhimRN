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
  TouchableOpacity
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
import { CommonActions } from '@react-navigation/native';
import { scale } from "react-native-size-matters";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export function KHprofile({ navigation }) {
  const [imgavartar, setImgavatar] = useState('https://i1.wp.com/gocsuckhoe.com/wp-content/uploads/2020/09/avatar-facebook.jpg');
  const onAvatarpickerPress = (event) => {
    Alert.alert(
      "Chọn Ảnh Đại Diện",
      "Chọn Ảnh Đại Diện",
      [
        {
          text: "Ảnh trong thư viện",
          onPress: () => {
            ImagePicker.openPicker({
              height: 600,
              width: 600,
              cropping: true,
              cropperCircleOverlay: true,
            }).then(image => {
              setImgavatar(image.path)
            }).catch(() => { });
          }
        },
        {
          text: "Ảnh chụp", onPress: () => {
            ImagePicker.openCamera({
              height: 600,
              width: 600,
              cropping: true,
              cropperCircleOverlay: true,
            }).then(image => {
              setImgavatar(image.path)
            }).catch(() => { });
          }
        }
      ]
    );
  }

  const [date, setDate] = useState(new Date(1594051730000));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [emailKH, setEmailKH] = useState('');
  const [tenKH, setTenKH] = useState('');
  const [gioitinhKH, setGioitinhKH] = useState('Nam');
  const [sdtKH, setSdtKH] = useState('');
  const [diachiKH, setDiachiKH] = useState('');


  const handleSubmitPress2 = async () => {
    try {
      await AsyncStorage.clear()
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: 'KH' }, { name: 'Dsve' }]
        }))
    } catch (e) {
      // clear error
    }
    //console.log('Done.')  
  }

  const handleSubmitPress1 = async () => {
    const id = await AsyncStorage.getItem('@idKH')
    var imgKH = {
      uri: imgavartar,
      type: 'image/jpeg',
      name: sdtKH + '.jpg',
    };
    var formData = new FormData();
    formData.append("idKH", id);
    formData.append("tenKH", tenKH);
    formData.append("gioitinhKH", gioitinhKH);
    formData.append("sdtKH", sdtKH);
    formData.append("diachiKH", diachiKH);
    formData.append("ngaysinh", date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString());
    if (imgavartar.slice(0, 4) != 'http') {
      formData.append("imgKH", imgKH);
    }

    fetch('https://rapphimmeme.000webhostapp.com/update-cus', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;'
      },
      body: formData,
    }).then(response => response.json())
      .then(json => {
        if (json == "update") {
          AsyncStorage.setItem('@tenKH', JSON.stringify(tenKH)),
            navigation.navigate('Phim')
        }
        else {
          console.log(json.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let ignore = false;
    const Fetching = async () => {
      const ten = await AsyncStorage.getItem('@tenKH')
      const id = await AsyncStorage.getItem('@idKH')
      fetch('https://rapphimmeme.000webhostapp.com/profile/' + id)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            //console.log(json)
            setTenKH(JSON.parse(ten))

            json.map((kh, index) => {
              setEmailKH(kh.emailKH)
              setGioitinhKH(kh.gioitinhKH)
              setSdtKH(kh.sdtKH)
              setDate(new Date(Date.parse(kh.ngaysinh)))
              setDiachiKH(kh.diachiKH)
              setImgavatar('https://rapphimmeme.000webhostapp.com/hinhanh/KH/' + kh.imgKH + '?time=' + (new Date()))
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    Fetching();
    return () => { ignore = true; }
  }, [])

  return (
      <View style={styles.container}>
        <View style={{ top: scale(3), flexDirection: 'row', width: '100%',marginBottom: scale(8) }}>
        <Avatarpicker style={{marginLeft:'32%'}} title={'Đăng ký'} imgavartar={imgavartar} onPress={onAvatarpickerPress} />
        <TouchableOpacity style={{marginLeft:'31%'}} onPress={handleSubmitPress2}>
                    <Icon name='logout'
                        size={scale(40)} color='red' >
                    </Icon>
                </TouchableOpacity>
        </View>
        
        <Input style={{ color: 'red', fontSize: scale(12), marginVertical: scale(4) }} editable={false} keyboardType={'email-address'}
          onChangeText={(text) => setEmailKH(text)} value={emailKH} />
        <Input style={styles.input} placeholder={'Tên khách hàng'} value={tenKH}
          onChangeText={(text) => setTenKH(text)} />
        <View style={styles.sexpicker}>
          <Picker
            selectedValue={gioitinhKH}
            dropdownIconColor='black'
            style={{ color: 'black' }}
            onValueChange={(itemValue, itemIndex) => setGioitinhKH(itemValue)}
          >
            <Picker.Item style={{ fontSize: scale(12) }} label="Giới tính: Nam" value="Nam" />
            <Picker.Item style={{ fontSize: scale(12) }} label="Giới tính: Nữ" value="Nữ" />
            <Picker.Item style={{ fontSize: scale(12) }} label="Giới tính: Không xác định" value="Không xác định" />
          </Picker>
        </View>
        <DATEPICKER editable={false} placeholder={'Ngày sinh'} style={styles.inputbirth}
          //onChangeText={(text) => setNgaysinh(text)}
          onChange={onChange}
          date={date}
          mode={mode}
          show={show}
          showDatepicker={showDatepicker}
        />
        <Input style={styles.input} placeholder={'Số điện thoại'}
          onChangeText={(text) => setSdtKH(text)} value={sdtKH} />
        <Input style={styles.input} placeholder={'Địa chỉ'}
          onChangeText={(text) => setDiachiKH(text)} value={diachiKH} />
        <Filledbtn style={styles.btn} title={'Sửa thông tin'} onPress={handleSubmitPress1} />
        <Filledbtn style={styles.btn} title={'Đổi mật khẩu'} onPress={() => { navigation.navigate('Changepass') }} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2c2c',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(13),
  },
  input: {
    marginVertical: scale(4),
    fontSize: scale(12),
    color:'black'
  },
  btn: {
    marginVertical: scale(6),
    fontSize: scale(20),
  },
  inputbirth: {
    marginVertical: scale(4),
    fontSize: scale(12),
    color:'black'
  },
  sexpicker: {
    width: '100%',
    backgroundColor: '#d4d4d4',
    borderRadius: 8,
    marginVertical: scale(4),
    overflow: 'hidden',
  }
});
