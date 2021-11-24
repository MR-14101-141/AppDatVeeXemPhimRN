import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

export function Txtbtn({title,style,onPress})
{
  return(
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[style, styles.text]} >{title.toUpperCase()}</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 8,
  },
  text:{
    fontWeight:'bold',
    color:'red',
  }
});