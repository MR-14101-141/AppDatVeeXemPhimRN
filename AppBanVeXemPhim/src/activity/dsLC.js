import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  RefreshControl
} from 'react-native';
import { Head } from '../components/head';
import { Input } from '../components/input';
import { Filledbtn } from '../components/filledbtn';
import { Txtbtn } from '../components/txtbtn';
import { Error } from '../components/error';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { scale } from "react-native-size-matters";

export function DsLCpage({ navigation, route }) {
  const { otherParam } = route.params;
  const [SC, setSC] = useState([]);
  const [idPhong, setIdPhong] = useState('');
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
      //navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
      fetch('https://rapphimmeme.000webhostapp.com/home/dsSC/' + otherParam)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            //console.log(otherParam)
            setSC(json)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    Fetching();
    return () => { ignore = true; }
  }, [refreshing])

  const onPress = async (idSC) => {
    navigation.navigate('dsGhe', {
      otherParam: idSC,
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, [])

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#2c2c2c' }}>
      <TouchableOpacity style={{ width: 'auto', height: 'auto' }} onPress={() => navigation.goBack()}>
        <Icon name='arrow-back'
          size={scale(40)} color='red' >
        </Icon>
      </TouchableOpacity>
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          colors={["tomato", "red"]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        {Object.entries(SC).map(([nc, dsgc]) => (
          <View key={nc}>
            <Text style={styles.head}>{nc}</Text>
            {dsgc.map((gc, index) =>
              <TouchableOpacity key={index} style={styles.touch} onPress={() => onPress(gc.idSC)} >
                <Text style={styles.text} >{gc.giochieu.toString().substring(0, 5)}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  title: {
    marginBottom: scale(10),
  },
  touch: {
    marginVertical: '2%',
    backgroundColor: 'tomato',
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: scale(20),
    color: 'white',
  },
  head: {
    fontWeight: 'bold',
    fontSize: scale(25),
    color: 'red',
  }
});