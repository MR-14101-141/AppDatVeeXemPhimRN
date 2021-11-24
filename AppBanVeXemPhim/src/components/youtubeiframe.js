import React, { useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button, View, Alert,Platform
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
                                             
export function Youtubeiframe({videoId,height})
{
  const [playing, setPlaying] = useState(true);

    return (
      <View>
        <YoutubePlayer
          webViewStyle={{opacity: 0.99}}
          height={height}
          play={playing}
          videoId={videoId}
          //onChangeState={onStateChange}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
            androidLayerType:
            Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'bold',
    fontSize: 32,
    color:'blue',
  }
});
