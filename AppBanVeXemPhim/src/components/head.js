import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
                                             
export function Head({children,style,...props})
{
  return(
  <Text {...props} style={[style, styles.text]}>
    {children}
  </Text>
  );
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'bold',
    fontSize: scale(32),
    color:'red',
  }
});
