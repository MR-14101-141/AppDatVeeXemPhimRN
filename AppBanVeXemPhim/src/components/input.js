import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import { scale } from "react-native-size-matters";
                                             
export function Input({style,...props})
{
  return(
  <TextInput {...props} style={[style, styles.inputs]}/>
  );
}

const styles = StyleSheet.create({
  inputs:{
    backgroundColor:'#d8d8d8',
    width:'100%',
    padding:scale(10),
    borderRadius:8,
  }
});