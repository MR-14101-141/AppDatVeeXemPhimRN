/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef, Component } from "react"

import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { FlatList, PanResponder, } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { scale } from "react-native-size-matters";

export class Dsphim extends Component {
  constructor(props) {
    super(props)
    {
      this.state = { DV: [], LPhim: [], Phim: [], page: 1, isLoading: true, search: '', link: '',refreshing: false, }
      this.timerId = React.createRef();
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => {
          // console.log('user starts touch');
          clearTimeout(this.timerId.current)
          this.timerId.current = setTimeout(() => {
            this.props.navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false, style: { backgroundColor: 'while' } })
          }, 2000)
        },
      })
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true,page:1});
    setTimeout(() => { this.setState({refreshing: false}),this.componentDidMount();}, 1000)
  }

  componentDidMount = async () => {
    await this.setState({ link: 'https://rapphimmeme.000webhostapp.com/home' })
    const url = this.state.link + '?page=' + this.state.page
    //console.log(url)
    return fetch(url)
      .then((reponse) => reponse.json())
      .then((responseJson) => {
        //console.log(responseJson)

        this.setState({
          Phim: responseJson.dsphim.data, isLoading: false, LPhim: responseJson.dslphim, DV: responseJson.dsdv
        })
      })
      .catch((erron) => {
        console.error(erron);
      })
  }

  Lazyload = async () => {
    await this.setState({ page: this.state.page + 1 })
    const url = this.state.link + '?page=' + this.state.page
    return fetch(url)
      .then((reponse) => reponse.json())
      .then((responseJson) => {
        //console.log(responseJson)

        this.setState({
          //Phim: responseJson.dsphim.data, isLoading: false, LPhim: responseJson.dslphim
          Phim: this.state.Phim.concat(responseJson.dsphim.data), isLoading: false,
        })
      })
      .catch((erron) => {
        console.error(erron);
      })
  }

  footerList = () => {
    return (
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  componentWillUnmount = async () => {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { navigation } = this.props;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#2c2c2c' }} {...this.panResponder.panHandlers}>
        <View style={{ top: scale(3), backgroundColor: '#d8d8d8', flexDirection: 'row', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
          <View style={{ padding: scale(4) }} >
            <Icon name='search'
              size={scale(32)} color='#2c2c2c' >
            </Icon>
          </View>
          <TextInput style={{ height: scale(42), fontSize: scale(16), width: '100%' }} placeholderTextColor='grey' placeholder={'Tìm kiếm phim'}
            onFocus={() => { this.props.navigation.navigate('DsphimSearch') }}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.state.LPhim}
          contentContainerStyle={{
            padding: scale(8),
            marginBottom: scale(2),
            height: scale(45),
            flexGrow: 0,
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity style={{
              flex: 1, width: scale(80), height: '100%', padding: scale(7), marginRight: scale(5),
              backgroundColor: '#dcdcdcdc', borderRadius: 10,
            }} onPress={() => { this.props.navigation.navigate('DSPhimTheoLoaipage', { otherParam: item.idLPhim }) }} >
              <Text style={{ fontSize: scale(11), color: 'red', alignSelf: 'center', }}>{item.tenLPhim}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
          horizontal
          removeClippedSubviews={true} // Unmount components when outside of window 
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.state.DV}
          contentContainerStyle={{
            padding: scale(8),
            marginBottom: scale(10),
            height: scale(45),
            flexGrow: 0,
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity style={{
              flex: 1, width: scale(80), height: '100%', padding: scale(7), marginRight: scale(5),
              backgroundColor: '#dcdcdcdc', borderRadius: 10,
            }} onPress={() => { this.props.navigation.navigate('DSPhimTheoDVpage', { otherParam: item.idDV }) }} >
              <TextTicker
                style={{ fontSize: scale(11), color: 'red', alignSelf: 'center' }}
                duration={5000}
                loop
                shouldAnimateTreshold={40}
                bounce={false}
                repeatSpacer={50}
                marqueeDelay={500}
              >
                {item.tenDV}
              </TextTicker>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
          horizontal
          removeClippedSubviews={true} // Unmount components when outside of window 
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          onScroll={() => { this.props.navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true }) }}
          data={this.state.Phim}
          contentContainerStyle={{
            paddingHorizontal: scale(10),
          }}

          //contentContainerStyle = {{justifyContent:'space-between'}}
          renderItem={({ item, index }) =>
            <View style={{ padding: scale(8) }}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('CTPhimpage', { otherParam: item.idPhim }) }}>
                <PhimItem items={item} index={index} />
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}

          refreshControl={
            <RefreshControl colors={["tomato", "red"]}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }

          // Performance settings
          removeClippedSubviews={true} // Unmount components when outside of window 
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          onEndReached={this.Lazyload}
          onEndReachedThreshold={.2}
          ListFooterComponent={this.footerList}
        />
      </View>
    )
  }
}

export class PhimItem extends Component {
  state = {

  };
  render() {
    return (

      <View style={{
        flex: 1, flexDirection: 'row',
        padding: scale(7), width: '100%', marginBottom: scale(6),
        backgroundColor: '#dcdcdcdc', borderRadius: 12
      }}>
        <Image style={{ width: '60%', height: scale(140), borderRadius: 12 }}
          source={{ uri: 'https://rapphimmeme.000webhostapp.com/hinhanh/Phim/' + this.props.items.imgPhim }}
        />
        <View style={{ width: '40%' }}>
          <Text style={{ fontSize: scale(16), color: 'black', marginLeft: scale(5) }}>{this.props.items.tenPhim}</Text>
          <Text style={{ fontSize: scale(12), color: 'black', marginLeft: scale(5) }}>Thời lượng: {this.props.items.thoiluongPhim}</Text>
          <Text style={{ fontSize: scale(12), color: 'black', marginLeft: scale(5) }}>Đánh giá: {this.props.items.rate}</Text>
        </View>
      </View>
    );
  }
}






