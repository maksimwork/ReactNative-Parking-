import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './login';
import Drawer from './drawer';

const createStackNavigator = currentUser => StackNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    Drawer: {
        screen: Drawer
    }
}, {
    initialRouteName: isEmpty(currentUser)
        ? 'LoginScreen'
        : 'Drawer',
    headerMode: 'none'
});

class Root extends Component {
    render() {
        const { currentUser } = this.props;
        const Navigator = createStackNavigator(currentUser);
        return (<Navigator/>);
    }
}

Root.propTypes = {
    currentUser: PropTypes.object.isRequired
};

const mapStateToProps = store => ({currentUser: store.currentUser});

export default connect(mapStateToProps)(Root);
