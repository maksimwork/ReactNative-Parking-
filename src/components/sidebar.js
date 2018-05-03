//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import * as Actions from '../redux/actions';
import images from '../utils/images';

import MessagesScreen from './messages';

// create a component
class SideBar extends Component {

  logout() {
    const { updateCurrentUser } = this.props;
    updateCurrentUser({ });
  }

  renderMenuButton(icon, messageCount, label, callback) {
    return (
      <TouchableOpacity
        style={styles.menuButton}
        onPress={callback}
      >
        <ImageBackground
          source={icon}
          style={styles.menuButtonIcon}
          resizeMode='stretch'
        >
          { this.renderMessageNotification(messageCount) }
        </ImageBackground>
        <Text style={styles.menuButtonLabel}>{ label }</Text>
      </TouchableOpacity>
    );
  }

  renderMessageNotification(count) {
    if (count == 0)
      return null;
    return (
      <ImageBackground
        source={images.notification}
        style={styles.notification}
        resizeMode='stretch'
      >
        <Text style={styles.number}>{count}</Text>
      </ImageBackground>
    );
  }

  onMenuButtonPress(index) {
    switch(index) {
      case 0:     // Find Parking
        this.props.navigation.navigate('MapScreen');
        break;
      case 1:     // Main Menu
        this.props.navigation.navigate('HomeScreen');
        break;
      case 2:     // Messages
        this.props.navigation.navigate('MessagesScreen');
        break;
      case 3:     // Dashboard
        this.props.navigation.navigate('DashboardScreen');
        break;
      case 4:     // Vehicles and spots
        break;
      case 5:     // Contact us
        break;
      case 6:     // Settings
        break;
      case 7:     // Log out
        this.logout();
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.loginBackground}
          style={styles.background}
          resizeMode='stretch'
        >
          <View style={styles.profileView}>
            <Image
              source={images.testPhoto1}
              style={styles.profilePic}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Shiru Sun</Text>
              <Text style={styles.ballanceInfo}>Ballance: $43 742</Text>
            </View>
          </View>
          <View style={styles.menu}>
            { this.renderMenuButton(images.sideMenuFind, 0, "Find Parking", () => {this.onMenuButtonPress(0)}) }
            { this.renderMenuButton(images.sideMenuHome, 0, "Main Menu", () => {this.onMenuButtonPress(1)}) }
            { this.renderMenuButton(images.sideMenuMessages, 5, "Messages", () => {this.onMenuButtonPress(2)}) }
            { this.renderMenuButton(images.sideMenuDashboard, 0, "Dashboard", () => {this.onMenuButtonPress(3)}) }
            { this.renderMenuButton(images.sideMenuAdd, 0, "Vehicles and spots", () => {this.onMenuButtonPress(4)}) }
            { this.renderMenuButton(images.sideMenuContact, 0, "Contact us", () => {this.onMenuButtonPress(5)}) }
            { this.renderMenuButton(images.sideMenuSetting, 0, "Settings", () => {this.onMenuButtonPress(6)}) }
          </View>
          <View style={{flex: 1}}></View>
          <View>
            {
              this.renderMenuButton(images.sideMenuLogout, 0, "Log out", () => {this.onMenuButtonPress(7)})
            }
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
    backgroundColor: '#2c3e50',
  },
  background: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 80,
    paddingBottom: 100,
  },
  profileView: {
    marginLeft: -20,
    flexDirection: 'row',
    height: 56,
  },
  profilePic: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileInfo: {
    marginLeft: 20,
    height: 56,
    justifyContent: 'space-around'
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    backgroundColor: 'transparent'
  },
  ballanceInfo: {
    color: 'white',
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  menu: {
    marginTop: 30,
    height: 280,
    justifyContent: 'space-between',
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: 40,
  },
  menuButtonIcon: {
    width: 24,
    height: 24
  },
  menuButtonLabel: {
    marginLeft: 15,
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  notification: {
    width: 30,
    height: 33,
    marginLeft: 8,
    marginTop: -8,
    alignItems: 'center',
    paddingTop: Platform.select({ios: 1})
  },
  number: {
    color: 'white',
    fontSize: 15,
  }
});

const mapStateToProps = store => ({
  currentUser: store.currentUser
})

const mapDispatchToProps = {
  updateCurrentUser: Actions.updateCurrentUser
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
