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

export function Error({error})
{
  return(
  <View style={styles.container}>
      <Text style={styles.text}> {error} </Text>
  </View>
  );
}

const styles = StyleSheet.create({
    container:{
    },
    text:{
      fontSize: 18,
      color:'red',
    }
  });