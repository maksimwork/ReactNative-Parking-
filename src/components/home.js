//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import { width } from 'react-native-dimension';
import Switch from 'react-native-switch-pro';
import AddButtonBottom from './addButtonBottom';
import GridView from 'react-native-super-grid';
import images from '../utils/images';

// create a component
class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mine: true,
      renterData: ['Shiru Sun', 'Yan Cheng', 'Robin', 'Lun li'],
      mineData: ['John Smith'],
      showDetail: false,
      detailItem: null,
      showAddModal: false,
    }
  }

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

  renderMineItem(item) {
    return (
      <View>
        <ImageBackground
          source={images.gridItemBox}
          style={styles.gridItem}
          resizeMode='cover'
        >
          <View style={styles.infoBox}>
            <Text style={styles.driverName}>{item}</Text>
            <View>
              <View style={styles.renterActionView}>
                <TouchableOpacity
                  style={styles.renterActionButton}
                  onPress={() => {}}
                >
                  <Text style={styles.renterActionText}>start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.renterActionButton}
                  onPress={() => {}}
                >
                  <Text style={styles.renterActionText}>end</Text>
                </TouchableOpacity>
              </View>
              <Text style={{marginLeft: 40, color: '#666'}}>Augusta</Text>
            </View>
            <View style={styles.picView}>
              <Image
                source={images.loginBackground}
                style={styles.profilePic}
              />
              <Image
                source={images.loginBackground}
                style={styles.carPic}
              />
              <Image
                source={images.loginBackground}
                style={styles.keyPic}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderRenterItem(item) {
    return (
      <View>
        <TouchableOpacity
          style={{flex:1}}
          onPress={() => {this.showDetail(item)}}
        >
        <ImageBackground
          source={images.gridItemBox}
          style={styles.gridItem}
          resizeMode='cover'
        >
          <View style={styles.infoBox}>
            <Text style={styles.driverName}>{item}</Text>
            <View style={styles.driverInfo}>
              <Text style={styles.infoText}>1201, Boylston Ave,</Text>
              <Text style={styles.infoText}>Seattle, WA 98101</Text>
              <Text style={styles.infoText}>Spot #: 45</Text>
            </View>
            <View style={styles.picView}>
              <Image
                source={images.loginBackground}
                style={styles.profilePic}
              />
              <Image
                source={images.loginBackground}
                style={styles.carPic}
              />
            </View>
          </View>
        </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  showDetail(item) {
    this.setState({
      showDetail: true,
      detailItem: item
    })
  }

  render() {
    const gridItemWidth = (width(100) - 41) / 2;
    const renderItems = this.state.mine ? this.state.mineData : this.state.renterData;
    const renderFunc = this.state.mine ? this.renderMineItem.bind(this) : this.renderRenterItem.bind(this);
    const { detailItem } = this.state;

    return (
      <View style={styles.container}>
        { this._renderMenuButton(5) }

        <View style={styles.header}>
          <Text style={styles.heading}>Reservations</Text>
          <Text style={[styles.subHeading, styles.grayText]}>{renderItems.length} Total</Text>
        </View>

        <View style={styles.optionView}>
          <View style={styles.innerOption}>
            <Text style={this.state.mine ? styles.blueText : styles.grayText}>Mine</Text>
            <Switch
              value={!this.state.mine}
              onSyncPress={val => {this.setState({mine: !val})}}
              width={60}
              height={30}
              backgroundActive='#2980b9'
              backgroundInactive='#2980b9'
            />
            <Text style={this.state.mine ? styles.grayText : styles.blueText}>Renters</Text>
          </View>
        </View>

        <View style={styles.scrollView}>
          {
            renderItems.length != 0 ?
              <ScrollView style={{flex:1, backgroundColor: 'transparent'}}>
                <GridView
                  itemWidth={gridItemWidth}
                  items={renderItems}
                  renderItem={item => renderFunc(item)}
                />
              </ScrollView>
              :
              <View style={styles.emptyTextView}>
                <Text style={styles.emptyText}>You have no reservation</Text>
              </View>
          }
        </View>

        {
          !this.state.showAddModal ?
            <AddButtonBottom
              onPress={() => {
                this.setState({showAddModal: true})
              }}
            />
            : null
        }

        <Modal
          transparent={true}
          visible={this.state.showDetail}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity
              style={styles.modalExit}
              onPress={() => { this.setState({showDetail: false}) }}
            >
            </TouchableOpacity>
            <View style={styles.detailView}>
              <Text style={styles.detailText}>Renter: {detailItem}</Text>
              <View>
                <Text style={styles.detailText}>
                  Spot: 1000 minor ave,
                </Text>
                <Text style={styles.detailText}>
                  Seattle, WA 98104,
                </Text>
                <Text style={styles.detailText}>
                  spot #12
                </Text>
              </View>
              <View>
                <Text style={styles.detailText}>
                  Vehicle: Alfa Romeo
                </Text>
                <Text style={styles.detailText}>
                  Color: Red
                </Text>
              </View>
              <View style={styles.detailButtonBox}>
                <TouchableOpacity
                  style={styles.detailButton}
                >
                  <Text style={styles.detailButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.detailButton}
                >
                  <Text style={styles.detailButtonText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.showAddModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity
              style={styles.modalExit}
              onPress={() => { this.setState({showAddModal: false}) }}
            >
            </TouchableOpacity>
            <View style={{flex: 1 }}></View>
            <View style={styles.popup} pointerEvents='auto'>
              <TouchableOpacity
                style={{position: 'absolute', width: '100%', height: '100%'}}
                onPress={() => {this.setState({showAddModal: false})}}
              />
              <View style={styles.popupTop}>
                <TouchableOpacity
                  style={{position: 'absolute', width: '100%', height: '100%'}}
                  onPress={() => {this.setState({showAddModal: false})}}
                />
                <TouchableOpacity
                  style={[styles.popupButton, styles.popupNormal]}>
                  <Image
                    source={images.popupPark}
                    style={{width: 35, height: 35}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.popupButton, styles.popupNormal]}>
                  <Image
                    source={images.popupKey}
                    style={{width: 45, height: 18}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.popupBottom}>
                <TouchableOpacity
                  style={{position: 'absolute', width: '100%', height: '100%'}}
                  onPress={() => {this.setState({showAddModal: false})}}
                />
                <TouchableOpacity
                  style={[styles.popupButton, styles.popupNormal]}>
                  <Image
                    source={images.popupFind}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.popupButton, styles.popupNormal]}>
                  <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Exit</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.popupButton, styles.exitPopup]}
                onPress={()=>{this.setState({showAddModal: false})}}>
                <Image
                  source={images.sideMenuAdd}
                  style={{width: 15, height: 15, transform: [{ rotate: '45deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({ios: 20}),
    backgroundColor: 'white'
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
  header: {
    marginTop: 15,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e'
  },
  subHeading: {
    marginTop: 10,
  },
  grayText: {
    fontSize: 15,
    color: '#666'
  },
  blueText: {
    fontSize: 15,
    color: '#3498db'
  },
  optionView: {
    width: '100%',
    paddingTop: 10,
  },
  innerOption: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    paddingRight: 20,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 25,
    paddingBottom: 40,
  },
  emptyTextView: {
    flex: 1,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    width: width(50),
    fontSize: 25,
    color: '#999'
  },
  gridItem: {
    height: (width(100) - 41) / 32 * 15,
    // backgroundColor: 'blue'
  },
  infoBox: {
    flex: 1,
    marginTop: 24,
    marginBottom: 18,
    marginLeft: 15,
  },
  driverName: {
    fontSize: 18,
    color: '#34495e',
  },
  driverInfo: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 35,
  },
  infoText: {
    fontSize: 12,
    color: '#95a5a6',
  },
  picView: {
    alignSelf: 'flex-end',
    width: '100%',
    height: 30,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  carPic: {
    marginLeft: 10,
    width: 50,
    height: 30,
    borderRadius: 15,
  },
  keyPic: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalExit: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  detailView: {
    width: width(70),
    height: 300,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 30,
    justifyContent: 'space-between'
  },
  detailText: {
    fontSize: 20,
    color: '#888'
  },
  detailButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailButton: {
    width: (width(70) - 80) / 2,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailButtonText: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  renterActionView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingRight: 20,
  },
  renterActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  renterActionText: {
    fontSize: 15,
    color: '#666',
    backgroundColor: 'transparent',
  },
  popup: {
    marginBottom: 40,
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  popupButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupNormal: {
    backgroundColor: '#2980b9'
  },
  exitPopup: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#EC407A'
  },
  popupTop: {
    width: 150,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupBottom: {
    width: 270,
    height: 60,
    marginBottom: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default HomeScreen;
