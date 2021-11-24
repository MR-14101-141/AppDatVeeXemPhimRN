import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scale } from 'react-native-size-matters';


export function DATEPICKER({ style, onChange, date, mode, showDatepicker, show, ...props }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', width: '70%' }}>
        <TouchableOpacity onPress={showDatepicker} style={[style, styles.container]}>
          <Text style={[style, styles.txt]} >{'Chọn ngày'}</Text>
        </TouchableOpacity>
        <TextInput {...props} style={[style, styles.input]} value={date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString()} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '43%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    padding:scale(1)
  },
  input: {
    color: 'black',
    backgroundColor: '#d8d8d8',
    width: '100%',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    padding:scale(10)
  },
  txt: {
    color: 'white',
  }
});
