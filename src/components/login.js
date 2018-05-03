//import liraries
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Platform,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { width, height } from 'react-native-dimension';
import images from '../utils/images';
import * as Actions from '../redux/actions';

// create a component
class LoginScreen extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            usernameFocus: false,
            password: '',
            passwordFocus: false,
            keyboardOffset: 0
        }

        this.handleKeyboardShow = this.handleKeyboardShow.bind(this);
        this.handleKeyboardHide = this.handleKeyboardHide.bind(this);

    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
    }

    handleKeyboardShow(e) {
        let offset = Platform.select({ios: 0, android: 25});
        this.setState({keyboardOffset: e.endCoordinates.height + offset});
    }
    
    handleKeyboardHide() {
        this.setState({keyboardOffset: 0});
    }

    onUsernameChange(e) {
        this.setState({username: e});
    }

    onUsernameFocus(e) {
        if (this.state.usernameFocus) 
            return;
        this.setState({usernameFocus: true, passwordFocus: false});
    }

    onPasswordChange(e) {
        this.setState({password: e});
    }

    onPasswordFocus(e) {
        if (this.state.passwordFocus)
            return;
        this.setState({passwordFocus: true, usernameFocus: false});
    }

    login() {
        Keyboard.removeListener('keyboardDidShow', this.handleKeyboardShow);
        Keyboard.removeListener('keyboardDidHide', this.handleKeyboardHide);
        Keyboard.removeListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.removeListener('keyboardWillHide', this.handleKeyboardHide);
        const { updateCurrentUser } = this.props;
        updateCurrentUser({ name: 'Shiru Sun' });
    }

    render() {
        const {username, password, usernameFocus, passwordFocus, keyboardOffset} = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={images.loginBackground}
                    style={styles.background}
                    resizeMode={'stretch'}>
                        <View style={{paddingBottom: keyboardOffset}}>
                            <View style={styles.loginForm}>
                                <Text style={styles.loginText}>Login</Text>

                                <Text
                                    style={username.length == 0
                                    ? styles.invisible
                                    : styles.visible}>Username</Text>
                                <View
                                    style={[
                                    styles.inputContainer, usernameFocus
                                        ? styles.focusUnderline
                                        : styles.normalUnderline
                                ]}>
                                    <Image source={images.loginUserIcon} style={styles.icon}/>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Username"
                                        placeholderTextColor='#aaa'
                                        underlineColorAndroid='transparent'
                                        value={username}
                                        onChangeText={ this.onUsernameChange.bind(this) }
                                        onFocus={ this.onUsernameFocus.bind(this) }
                                        autoCapitalize='none'
                                        autoCorrect={false}/>
                                </View>

                                <Text
                                    style={password.length == 0
                                    ? styles.invisible
                                    : styles.visible}>Password</Text>
                                <View
                                    style={[
                                    styles.inputContainer, passwordFocus
                                        ? styles.focusUnderline
                                        : styles.normalUnderline
                                ]}>
                                    <Image source={images.loginPasswordIcon} style={styles.icon}/>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Password"
                                        placeholderTextColor='#aaa'
                                        underlineColorAndroid='transparent'
                                        value={password}
                                        onChangeText={ this.onPasswordChange.bind(this) }
                                        onFocus={ this.onPasswordFocus.bind(this) }
                                        secureTextEntry/>
                                </View>

                                <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                </ImageBackground>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        width: width(100),
        height: height(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginForm: {
        width: width(87),
        height: 330,
        borderRadius: 7,
        backgroundColor: '#fff'
    },
    keyboardStyle: {
        width: width(87),
        height: 330,
        borderRadius: 7,
        backgroundColor: '#fff',
        marginBottom: 30
    },
    loginText: {
        fontSize: 25,
        color: '#000',
        marginTop: 20,
        textAlign: 'center'
    },
    visible: {
        fontSize: 14,
        color: '#aaa',
        marginLeft: 20,
        marginTop: 20
    },
    invisible: {
        fontSize: 14,
        color: 'transparent',
        marginLeft: 20,
        marginTop: 20
    },
    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
        // backgroundColor: '#789'
    },
    icon: {
        marginLeft: 10
    },
    textInput: {
        color: '#555',
        marginLeft: 10,
        flex: 1
    },
    focusUnderline: {
        borderBottomColor: '#2ecc71',
        borderBottomWidth: Platform.select({ios: 0.8, android: 1.1})
    },
    normalUnderline: {
        borderBottomColor: '#95a5a6',
        borderBottomWidth: Platform.select({ios: 0.5, android: 0.8})
    },
    loginButton: {
        marginTop: 25,
        marginLeft: 40,
        marginRight: 40,
        height: 40,
        backgroundColor: '#64DD17',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const mapStateToProps = store => ({
    currentUser: store.currentUser,
})

const mapDispatchToProps = {
    updateCurrentUser: Actions.updateCurrentUser,
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);