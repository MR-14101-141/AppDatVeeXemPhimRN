import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { Loginpage } from './activity/loginpage';
import { Registerpage } from './activity/registerpage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcomepage } from './activity/welcome';
import { CTPhimpage } from './activity/chitietphim';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DsLCpage } from './activity/dsLC';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Dsphim } from './activity/dsphim';
import { DsphimSearch } from "./activity/dsphimSearch";
import { DSPhimTheoLoaipage } from "./activity/dsphimtheoloaipage";
import { DSPhimTheoDVpage } from "./activity/dsphimtheoDVpage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KHprofile } from "./activity/KHprofile";
import { SplashScreenUser } from "./activity/splashscreenUser";
import { Changepass } from "./activity/changepass";
import { DsGhe } from "./activity/dsGhe";
import { Datve } from "./activity/datve";
import { DSve } from "./activity/dsvedat";
import { DStintuc } from "./activity/dstintuc";
import { CTtintuc } from "./activity/chitiettintuc";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SplashScreenVe } from "./activity/splashscreenVe";
import { CommonActions } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export function dsve({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'SplashScreenVe'} component={SplashScreenVe} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }
      }} />
      <Stack.Screen name={'DSve'} component={DSve} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }
      }} />
    </Stack.Navigator>
  );
}

export function tintuc() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'DStintuc'} component={DStintuc} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }
      }} />
      <Stack.Screen name={'CTtintuc'} component={CTtintuc} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }
      }} />
    </Stack.Navigator>
  );
}

export function KH() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'SplashScreenUser'} component={SplashScreenUser} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }
      }} />
      <Stack.Screen name={'Đăng nhập'} component={Loginpage} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }
      }} />
      <Stack.Screen name={'Đăng ký'} component={Registerpage} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
      <Stack.Screen name={'KHprofile'} component={KHprofile} options={{
        headerTitleStyle: { color: 'white' }, animationEnabled: false, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
      <Stack.Screen name={'Changepass'} component={Changepass} options={{
        headerTitleStyle: { color: 'white' }, animationEnabled: false, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
    </Stack.Navigator>
  );
}
export function Phim({ navigation, route }) {
  //setTimeout(() => {navigation.setOptions({ tabBarVisible: false })}, 0)
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
      keyboardHandlingEnabled={false}>
      <Stack.Screen name={'Home'} component={Dsphim} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
      <Stack.Screen name={'CTPhimpage'} component={CTPhimpage} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white', animationEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} />
      <Stack.Screen name={'DsphimSearch'} component={DsphimSearch} options={{
        animationEnabled: false,
        headerTitleStyle: { color: 'white' },
        headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white', animationEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} />
      <Stack.Screen name={'DSPhimTheoLoaipage'} component={DSPhimTheoLoaipage} options={{
        animationEnabled: false,
        headerTitleStyle: { color: 'white' },
        headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white', animationEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} />
      <Stack.Screen name={'DSPhimTheoDVpage'} component={DSPhimTheoDVpage} options={{
        animationEnabled: false,
        headerTitleStyle: { color: 'white' },
        headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white', animationEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} />
      <Stack.Screen name={'dsLC'} component={DsLCpage} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
      <Stack.Screen name={'dsGhe'} component={DsGhe} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
      <Stack.Screen name={'datve'} component={Datve} options={{
        headerTitleStyle: { color: 'white' }, headerStyle: {
          backgroundColor: 'red'
        }, headerTintColor: 'white'
      }} />
    </Stack.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        style:
        {
          backgroundColor: '#dcdcdcdc',
          position: 'absolute',
          //bottom: '2%',
          marginHorizontal: 10,
          // max Height
          height: '10%',
          borderRadius: 15,
          borderTopWidth: 0,
          elevation: 1,
        },
      }}>
        <Tab.Screen name={'Phim'} component={Phim} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            <View style={{
              position: 'absolute',
            }}>
              <Icon name='home'
                size={scale(40)} color={focused ? 'red' : 'gray'}>

              </Icon>
            </View>
        }} />
        <Tab.Screen name={'Tintuc'} component={tintuc} options={{
          //tabBarBadge: 'N',
          tabBarLabel: 'Tin tức',
          tabBarIcon: ({ focused }) =>
            <View style={{
              position: 'absolute',
            }}>
              <Icon name='bell'
                size={scale(34)} color={focused ? 'red' : 'gray'}>

              </Icon>
            </View>
        }} />
        <Tab.Screen name={'Dsve'} component={dsve} options={{
          tabBarLabel: 'Vé',
          //unmountOnBlur: true,
          tabBarIcon: ({ focused }) =>
            <View style={{
              position: 'absolute',
            }}>
              <Icon name='ticket'
                size={scale(40)} color={focused ? 'red' : 'gray'}>

              </Icon>
            </View>
        }} />
        <Tab.Screen name={'KH'} component={KH} options={{
          tabBarLabel: 'User',
          //unmountOnBlur: true,
          tabBarIcon: ({ focused }) =>
            <View style={{
              position: 'absolute',
            }}>
              <Icon name='user'
                size={scale(40)} color={focused ? 'red' : 'gray'}>

              </Icon>
            </View>
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
