//import liraries
import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { width } from 'react-native-dimension';
import SideBar from './sidebar';
import HomeScreen from './home';
import MessagesScreen from './messages';
import DashboardScreen from './dashboard';
import MapScreen from './map';

const getNavigationOptions = () => ({drawerLockMode: 'locked-closed'});

const getDrawerNavigator = Screen => DrawerNavigator({
    Main: {
        screen: Screen,
        navigationOptions: getNavigationOptions()
    }
},{
    drawerWidth: width(80),
    drawerPosition: 'left',
    contentComponent: SideBar,
    drawerLockMode: 'locked-closed',
});

const Drawer = StackNavigator({
    HomeScreen: {
        screen: getDrawerNavigator(HomeScreen)
    },
    MessagesScreen: {
        screen: MessagesScreen,
    },
    DashboardScreen: {
        screen: DashboardScreen,
    },
    MapScreen: {
        screen: getDrawerNavigator(MapScreen),
    }
},{
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
})

export default Drawer;