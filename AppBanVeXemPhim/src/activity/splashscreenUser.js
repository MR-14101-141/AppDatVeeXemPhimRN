import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SplashScreenUser({ navigation }) {

  useEffect(() => {
    AsyncStorage.getItem('@idKH').then((value) => {
      if (value === null) {
        navigation.replace('Đăng nhập')
      }
      else {
        navigation.replace('KHprofile')
      }
    }
    );
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator size="large" color="black" />
    </View>
  )
}
