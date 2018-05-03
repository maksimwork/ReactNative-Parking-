//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { NavigationActions } from 'react-navigation';
import { width } from 'react-native-dimension';
import images from '../utils/images';

// create a component
class DashboardScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 1,
    }
  }

  _navigationTitle() {
    const { tab } = this.state;
    if (tab == 0)
      return 'My Wallet';
    else if (tab == 1)
      return 'My Savings';
    return 'History';
  }

  _renderMainView() {
    const { tab } = this.state;

    const defaultData = [];
    defaultData.push({ key: 0, name: 'Chase', type: 'Visa', cardNumber: '**** **** **** 8870'})

    const walletData = [];
    walletData.push({ key: 0, name: 'BOA', type: 'Mastercard', cardNumber: '**** **** **** 1060'})
    walletData.push({ key: 1, name: 'Citi', type: 'Mastercard', cardNumber: '**** **** **** 1060'})

    const historyData = [];
    historyData.push({ key: 0, name: 'Coppins Well', money: -12, date: '24-10-2017' })
    historyData.push({ key: 1, name: 'AMLI', money: 16, date: '20-10-2017' })
    historyData.push({ key: 2, name: 'Aspira Apartment', money: -3, date: '19-10-2017' })
    historyData.push({ key: 3, name: 'Met Tower Apartments', money: 15, date: '15-10-2017' })
    historyData.push({ key: 4, name: 'Sheridan Apartment', money: -10, date: '10-10-2017' })

    if (tab == 2) {     // History Tab
      return (
        <View style={{
          marginTop: 60,
          marginBottom: 56,
          marginLeft: 25,
          marginRight: 25,
          flex: 1,
        }}>
          <View style={{paddingRight: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center', backgroundColor: 'transparent'}}>
              <Text style={{fontSize: 24, marginTop: 10, color: 'white'}}>Shiru Sun</Text>
              <Text style={{fontSize: 15, marginTop: 5, color: 'white'}}>Current balance: $987</Text>
            </View>
            <Image
              source={images.testPhoto1}
              style={{width: 100, height: 100, borderRadius: 50}}
              resizeMode='stretch'
            />
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={historyData}
              renderItem={this._renderHistoryItem}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{
        marginTop: 60,
        marginBottom: 56,
        flex: 1,
      }}>
        <View style={{flex: 1}}>
          {/*-------Profile-------*/}
          <View style={{
            position: 'absolute',
            top: 20,
            paddingLeft: 20,
            width: width(100),
            height: 60,
            flexDirection: 'row'
          }}>
            {
              this.state.tab == 0 ?
            <Image
              source={images.testPhoto1}
              style={{width: 60, height: 60, borderRadius: 30, marginRight: 18}}
              resizeMode='stretch'
            />
            : null
            }
            <View style={{justifyContent: 'space-around', backgroundColor: 'transparent'}}>
              <Text style={{color: 'white', fontSize: 26}}>Shiru Sun</Text>
              <Text style={{color: 'white', fontSize: 15}}>Current Ballance: ${this.state.tab == 0 ? 512 : 987}</Text>
            </View>
          </View>
          {/*--------Chart--------*/}
          
          {/*---------------------*/}
        </View>
        <View style={{height: 180, backgroundColor: '#f6f9fc'}}>
          <View style={{flex:1}}/>
          <View style={{height: 105, marginLeft: 20, marginRight: 20, paddingTop: 5, borderTopColor: '#e3ebf3', borderTopWidth: 2}}>
            <FlatList
              data={this.state.tab == 0 ? walletData : historyData}
              renderItem={this.state.tab == 0 ? this._renderWalletItem : this._renderSavingItem}
            />
          </View>
        </View>
        <View style={{
          position: 'absolute',
          width: '100%',
          height: 100,
          bottom: 130,
        }}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            sliderWidth={width(100)}
            itemWidth={width(80)}
            data={this.state.tab == 0 ? defaultData : historyData}
            renderItem={this.state.tab == 0 ? this._renderWalletScrollItem : this._renderSavingScrollItem}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0.87}
          />
        </View>
      </View>
    )
  }

  _renderWalletItem({item}) {
    const paymentImage = item.type == 'Visa' ? images.visa : images.mastercard
    return (
      <View style={{paddingTop: 10}}>
        <TouchableOpacity
          onPress={() => {this.onWalletItemPress(item)}}
        >
          <View style={{height: 60, padding: 10, borderRadius: 8, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'space-around'}}>
              <Text style={{color: 'black'}}>{item.name}</Text>
              <Text style={{color: '#aaa', fontSize: 12}}>Card Number: {item.cardNumber}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={paymentImage}
                style={{width: 40, height: 28, /*borderWidth: 1, borderColor: '#ccc'*/}}
                resizeMode='contain'
              />
              <Text style={{color: '#aaa', fontSize: 12}}>{item.type}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _renderWalletScrollItem({item, index}) {
    const paymentImage = item.type == 'Visa' ? images.visa : images.mastercard
    return (
      <View style={{
        width: width(80),
        height: 100,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 15,
        paddingBottom: 12,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{color: 'black', fontSize: 17, paddingBottom: 15}}>Default card: {item.name}</Text>
          <Text style={{color: '#aaa', fontSize: 13}}>Card Number: {item.cardNumber}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={paymentImage}
            style={{width: 40, height: 28, /*borderWidth: 1, borderColor: '#ccc'*/}}
            resizeMode='contain'
          />
          <Text style={{color: '#aaa', fontSize: 13, paddingTop: 10}}>{item.type}</Text>
        </View>
      </View>
    )
  }

  _renderSavingItem({item}) {
    return (
      <View style={{paddingTop: 10}}>
        <TouchableOpacity
          onPress={() => {this.onSavingItemPress(item)}}
        >
          <View style={{height: 60, padding: 10, borderRadius: 8, backgroundColor: 'white', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black'}}>{item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'black'}}>{item.money > 0 ? 'Earn' : 'Spend'}: </Text>
                <Text style={{color: item.money < 0 ? '#c0392b' : '#64DD17'}}>${Math.abs(item.money)}</Text>
              </View>
            </View>
            <Text style={{color: '#aaa', fontSize: 13}}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _renderSavingScrollItem({item, index}) {
    return (
      <View style={{
        width: width(80),
        height: 100,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 15,
        paddingBottom: 12
      }}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text style={{color: 'black', fontSize: 17}}>{item.name}</Text>
          <View style={{height: 10, borderRadius: 5, marginTop: 7, backgroundColor: '#dce6f0'}}>
            <View style={{width: '12%', height: 10, borderRadius: 5, backgroundColor: '#2cc197'}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 13, color: '#888'}}>Cost: ${item.money} of $999</Text>
            <Text style={{fontSize: 13, color: '#888'}}>98.7% Left</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderHistoryItem({item}) {
    return (
      <View style={{marginTop: 10, marginBottom: 10, borderRadius: 5, height: 80, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{flex: 1, paddingLeft: 25, paddingRight: 25, paddingTop: 18, paddingBottom: 10, justifyContent: 'space-between'}}
          onPress={() => {this.onHistoryItemPress(item)}}
        >
          <Text style={{color: 'black', fontSize: 16}}>{item.name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#aaa'}}>{item.money > 0 ? 'Earned' : 'Spend'}:</Text>
              <Text style={{color: item.money < 0 ? '#c0392b' : '#64DD17'}}> ${Math.abs(item.money)}</Text>
            </View>
            <Text style={{color: '#aaa'}}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  onSavingItemPress(item) {
    alert(item.name)
  }

  onHistoryItemPress(item) {
    alert(item.name)
  }

  _renderTabBar() {
    return (
      [<View key={0} style={{
        width: '100%',
        height: 56,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <View style={styles.tabButtonContainer}>
            <TouchableOpacity onPress={() => {this.onFindPress()}}>
              <View style={[styles.tabButton, styles.tabButtonNormal]}>
                <Image
                  source={images.dashboardFind}
                  style={{width: 18, height: 18}}
                  resizeMode='contain'
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tabButtonContainer}>
            <TouchableOpacity onPress={()=>{this.onTabPress(0)}}>
              <View style={[styles.tabButton, this.state.tab == 0 ? styles.tabButtonSelect : styles.tabButtonNormal]}>
                <Image
                  source={this.state.tab == 0 ? images.dashboardWalletSelect : images.dashboardWallet}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tabButtonContainer}/>
          <View style={styles.tabButtonContainer}>
            <TouchableOpacity onPress={()=>{this.onTabPress(1)}}>
              <View style={[styles.tabButton, this.state.tab == 1 ? styles.tabButtonSelect : styles.tabButtonNormal]}>
                <Image
                  source={this.state.tab == 1 ? images.dashboardSavingSelect : images.dashboardSaving}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tabButtonContainer}>
            <TouchableOpacity onPress={()=>{this.onTabPress(2)}}>
              <View style={[styles.tabButton, this.state.tab == 2 ? styles.tabButtonSelect : styles.tabButtonNormal]}>
                <Image
                  source={this.state.tab == 2 ? images.dashboardHistorySelect : images.dashboardHistory}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>,
      <View key={1} style={styles.tabHome}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {this.onHomePress()}}
        >
          <Image source={images.dashboardHome}/>
        </TouchableOpacity>
      </View>]
    );
  }

  onFindPress() {
    alert('find');
  }

  onHomePress() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'HomeScreen'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onTabPress(index) {
    this.setState({tab: index});
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.historyBackground}
          style={{flex:1}}
          resizeMode='stretch'
        >
        <View style={styles.safeArea}>
          {/*-----Navigation Bar-----*/}
            <TouchableOpacity
              style={[styles.navigationButton, styles.buttonLeft]}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={images.navigationBack}
                style={{width: 20, height: 20}}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.navigationTitle}>
              { this._navigationTitle() }
            </Text>
            <TouchableOpacity
              style={[styles.navigationButton, styles.buttonRight]}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={images.sideMenuAdd}
                style={{width: 20, height: 20}}
                resizeMode='contain'
              />
            </TouchableOpacity>
          {/*------------------------*/}
          { this._renderMainView() }
          { this._renderTabBar() }
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
    left: 20,
  },
  buttonRight: {
    right: 20,
  },
  navigationTitle: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  tabButtonContainer: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    width: 56,
    height: 56,
  },
  tabButtonNormal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonSelect: {
    justifyContent: 'flex-end'
  },
  tabHome: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#30c299',
    bottom: 8,
    position: 'absolute',
    alignSelf: 'center'
  }
});

//make this component available to the app
export default DashboardScreen;
