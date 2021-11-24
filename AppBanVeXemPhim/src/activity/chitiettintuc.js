import React, { useState, useCallback, useRef, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme, Image,
    Button, View, Alert, Platform, TouchableOpacity
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import { Youtubeiframe } from "../components/youtubeiframe";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { scale } from "react-native-size-matters";

export function CTtintuc({ navigation, route }) {
    const { otherParam } = route.params;
    const [tieudetintuc, setTieude] = useState('');
    const [imgtintuc, setImgtintuc] = useState('');
    const [noidungtintuc, setNoidungtintuc] = useState('');

    useEffect(() => {
        let ignore = false;
        const Fetching = async () => {
            //navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
            fetch('https://rapphimmeme.000webhostapp.com/home/CTtintuc/' + otherParam)
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        setTieude(json.tieudetintuc)
                        setImgtintuc(json.imgtintuc)
                        setNoidungtintuc(json.noidungtintuc)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        Fetching();
        return () => { ignore = true; }
    }, [])

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
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: 'auto', height: 'auto', paddingRight: scale(10) }} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back'
                        size={scale(40)} color='red' >
                    </Icon>
                </TouchableOpacity>
                <Text style={{ fontSize: scale(34), fontWeight: 'bold', color: 'red' }}>{tieudetintuc}</Text>
            </View>
            <ScrollView>
                <View style={{ paddingBottom: '25%' }}>
                    <Image style={{ height: scale(180), width: '100%' }} source={{ uri: 'https://rapphimmeme.000webhostapp.com/hinhanh/Tintuc/' + imgtintuc + '?time=' + (new Date()) }} />

                    <Text style={styles.text}>{noidungtintuc}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: scale(15),
        color: 'white',
    },
});
