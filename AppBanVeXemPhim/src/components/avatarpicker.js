import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { scale } from "react-native-size-matters";


export function Avatarpicker({title,style,onPress,imgavartar})
{
  return(
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image style={[styles.container, style]} source={{uri: imgavartar}}/>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    height:scale(90),
    width: scale(90),
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: scale(45),
  },
});