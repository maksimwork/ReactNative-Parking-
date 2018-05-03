//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import images from '../utils/images';

// create a component
class MessagesScreen extends Component {

  onPhotoPress(index) {
    alert(index);
  }

  _renderMessage = ({item}) => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          flexDirection: 'row',
        }}>
        <View style={{
          width: 55,
        }}>
          <Image
            source={item.photo}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginTop: 10
            }}
          />
          {
            item.unread != 0 ?
            <ImageBackground
              source={images.notification}
              style={{
                position: 'absolute',
                width: 30,
                height: 33,
                marginLeft: 20,
                alignItems: 'center'
              }}
              resizeMode='stretch'
            >
              <Text
                style={{
                  color: 'white',
                  marginTop: Platform.select({ios: 1}),
                  backgroundColor: 'transparent'
                }}>
                {item.unread}
              </Text>
            </ImageBackground>
            : null
          }
        </View>
        <View style={{
          flex: 1,
          paddingTop: 10,
        }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>{item.name}</Text>
            <Text style={{fontSize: 16, color: '#9E9E9E'}}>{item.time}</Text>
          </View>
          <View style={{height: 55, marginRight: 10, justifyContent: 'center'}}>
            <Text
              style={{fontSize: 16, color: '#9E9E9E', lineHeight: 22}}
              numberOfLines={2}
              ellipsizeMode='tail'
            >
              {item.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const listData = [];
    listData.push({ key: 0, photo: images.testPhoto2 });
    listData.push({ key: 1, photo: images.testPhoto2 });
    listData.push({ key: 2, photo: images.testPhoto2 });
    listData.push({ key: 3, photo: images.testPhoto2 });
    listData.push({ key: 4, photo: images.testPhoto2 });
    listData.push({ key: 5, photo: images.testPhoto2 });
    listData.push({ key: 6, photo: images.testPhoto2 });

    const testMessageData = [];
    for(var i = 0; i < 5; i ++) {
      testMessageData.push({
        key: i,
        unread: i == 0 ? 5 : 0,
        photo: images.testPhoto2,
        name: 'Test Message',
        message: 'Hello! How are you? Hope everything is fine! I just wanted to tell you that I was outside home.',
        time: '14:31'
      });
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.messageBackground}
          style={{flex:1}}
          resizeMode='stretch'
        >
          <View style={styles.safeArea}>
            {/*-----Navigation Bar-----*/}
            <TouchableOpacity
              style={[styles.navigationButton, styles.buttonLeft]}
              onPress={() => {
                navigation.dispatch(NavigationActions.back());
              }}
            >
              <Image
                source={images.navigationBack}
                style={{width: 20, height: 20}}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.navigationTitle}>Messages</Text>
            {/*------------------------*/}
            {/*-------Photo List-------*/}
            <View style={styles.photoList}>
              <FlatList
                horizontal
                data={listData}
                renderItem={({item}) => {
                  return (
                    <ImageBackground
                      source={images.messagePhotoFrame}
                      style={{
                        width: 90,
                        height: 90,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        source={item.photo}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                        }}
                        resizeMode='stretch'
                      />
                    </ImageBackground>
                  );
                }}
              />
            </View>
            {/*------------------------*/}
            {/*------Message List------*/}
            <View style={{flex: 1, marginTop: 10, marginBottom: 30}}>
              <FlatList
                data={testMessageData}
                renderItem={this._renderMessage}
              />
            </View>
            {/*------------------------*/}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  safeArea: {
    flex: 1,
    marginTop: Platform.select({ios: 20}),
  },
  navigationButton: {
    position: 'absolute',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    marginLeft: 20,
  },
  buttonRight: {
    marginRight: 20,
  },
  navigationTitle: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    marginTop: 18,
    alignSelf: 'center'
  },
  photoList: {
    marginTop: 50,
    paddingLeft: 40,
    paddingRight: 0,
    height: 90,
  }
});

//make this component available to the app
export default MessagesScreen;
