//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import images from '../utils/images';

// create a component
class MapScreen extends Component {

  _renderMenuButton(unreadCount) {
    return (
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity
          style={styles.menuButtonArea}
          onPress={() => {this.props.navigation.navigate('DrawerOpen')}}
        >
          <Image
            source={images.menuIcon}
            style={styles.menuIcon}
            resizeMode='stretch'
          />
          { this._renderNotification(unreadCount) }
        </TouchableOpacity>
      </View>
    )
  }

  _renderNotification(unreadCount) {
    return (
        <ImageBackground
          source={images.notification}
          style={styles.menuNotification}
          resizeMode='stretch'
          onPress={this.props.onPress}
        >
          <Text style={styles.menuNotificationCount}>
            {unreadCount}
          </Text>
        </ImageBackground>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        { this._renderMenuButton(5) }
        
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({ios: 20}),
  },
  // Menu Button Styles //
  menuButtonContainer: {
    height: 40,
    paddingTop: 5,
  },
  menuButtonArea: {
    width: 35,
    height: 30,
    marginLeft: 20,
    justifyContent: 'flex-end',
  },
  menuIcon: {
    width: 17,
    height: 17,
  },
  menuNotification: {
    position: 'absolute',
    left: 10,
    width: 27.5,
    height: 30,
    alignItems: 'center'
  },
  menuNotificationCount : {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    marginTop: Platform.select({ios: 2, android: 1})
  },
  ////////////////////////
});

//make this component available to the app
export default MapScreen;
