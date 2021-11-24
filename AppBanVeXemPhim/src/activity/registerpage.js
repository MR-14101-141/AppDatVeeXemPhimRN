import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
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
import { scale } from "react-native-size-matters";

export function Registerpage({ navigation }) {
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
              height: 150,
              width: 150,
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

  const [date, setDate] = useState(new Date(1598051730000));
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
  const [passwordKH, setPasswordKH] = useState('');
  const [tenKH, setTenKH] = useState('');
  const [gioitinhKH, setGioitinhKH] = useState('Nam');
  const [sdtKH, setSdtKH] = useState('');
  const [diachiKH, setDiachiKH] = useState('');


  const handleSubmitPress = async () => {
    if (emailKH == '') {
      Alert.alert('Lỗi', 'Email KH chưa nhập')
    }
    else if (passwordKH == '') {
      Alert.alert('Lỗi', 'Mật khẩu KH chưa nhập')
    }
    else if (tenKH == '') {
      Alert.alert('Lỗi', 'Tên KH chưa nhập')
    }
    else if (sdtKH == '') {
      Alert.alert('Lỗi', 'Số điện thoại KH chưa nhập')
    }
    else if (diachiKH == '') {
      Alert.alert('Lỗi', 'Địa chỉ KH chưa nhập')
    }
    else if (date.getFullYear() >= (new Date().getFullYear() - 3)) {
      Alert.alert('Lỗi', 'Tuổi bạn hơi kỳ lạ')
    }
    else {
      var imgKH = {
        uri: imgavartar,
        type: 'image/jpeg',
        name: sdtKH + '.jpg',
      };
      var formData = new FormData();
      formData.append("emailKH", emailKH);
      formData.append("passwordKH", passwordKH);
      formData.append("tenKH", tenKH);
      formData.append("gioitinhKH", gioitinhKH);
      formData.append("sdtKH", sdtKH);
      formData.append("diachiKH", diachiKH);
      formData.append("ngaysinh", date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString());
      if (imgavartar.slice(0, 4) != 'http') {
        formData.append("imgKH", imgKH);
      }

      fetch('https://rapphimmeme.000webhostapp.com/postsignup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;'
        },
        body: formData,
      }).then(response => response.json())
        .then(json => {
          if (json == "register") {
            navigation.navigate('Đăng nhập')
          }
          else if (json == "trùng") {
            Alert.alert('Lỗi', 'Số điện thoại hoặc email đã tồn tại')
          }
          else {
            Alert.alert('Lỗi', 'Trừ hình đại diện ra, Bạn phải điền đầy đủ thông tin')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#2c2c2c', }}>
      <View style={styles.container}>
        <Avatarpicker title={'Đăng ký'} imgavartar={imgavartar} onPress={onAvatarpickerPress} />
        <Input style={styles.input} placeholderTextColor='grey' placeholder={'Địa chỉ mail: Email@example.com'} keyboardType={'email-address'}
          onChangeText={(text) => setEmailKH(text)} />
        <Input style={styles.input} placeholderTextColor='grey' placeholder={'Mật khẩu'} secureTextEntry
          onChangeText={(text) => setPasswordKH(text)} />
        <Input style={styles.input} placeholderTextColor='grey' placeholder={'Tên khách hàng'}
          onChangeText={(text) => setTenKH(text)} />
        <View style={styles.sexpicker}>
          <Picker
            /**</View>selectedValue={selectedValue}**/
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
        <Input style={styles.input} placeholderTextColor='grey' placeholder={'Số điện thoại'}
          onChangeText={(text) => setSdtKH(text)} />
        <Input style={styles.input} placeholderTextColor='grey' placeholder={'Địa chỉ'}
          onChangeText={(text) => setDiachiKH(text)} />
        <Filledbtn style={styles.loginbtn} title={'Đăng ký'} onPress={handleSubmitPress} />
        <Txtbtn style={styles.txtbtn} onPress={() => navigation.navigate('Đăng nhập')} title={'Trở về trang đăng nhập'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2c2c',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal:scale(13)
  },
  input: {
    marginVertical: scale(4),
    fontSize: scale(12),
    color:'black'
  },
  title: {
    marginBottom: scale(10),
  },
  loginbtn: {
    marginVertical: scale(2),
    fontSize:scale(20),
  },
  inputbirth: {
    marginVertical: scale(4),
    fontSize:scale(12)
  },
  sexpicker: {
    width: '100%',
    backgroundColor: '#d8d8d8',
    borderRadius: 8,
    marginVertical: scale(4),
    overflow: 'hidden',
  },
  txtbtn: {
    fontSize: scale(12)
  }
});
