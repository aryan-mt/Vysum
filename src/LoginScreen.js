import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image
} from 'react-native';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {  useNavigation } from "@react-navigation/native"

import { connect } from 'react-redux'
import { signInUser } from './redux/actions'

import styles from "./Styles"


function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleLoginPress = () => {
        props.signInUser({ email, 
            password,
            onSuccess: () => {
                navigation.navigate("Tab")
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{"Login"}</Text>
            </View>
            <Animatable.View
                style={styles.footer}
                animation="slideInUp"
            >
                <ScrollView>
                    <View
                        style={styles.formContainer}>
                        <Text style={styles.formTitle}>Email</Text>
                        <TextInput
                            placeholder="Your Email"
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                            style={styles.formInput}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            autocorrect="false"
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={ true }
                            style={styles.formInput}
                    ></TextInput>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleLoginPress}
                        >
                            <LinearGradient
                                colors={["rgba(5, 16, 148, 1)", "rgba(5, 16, 148, 0.8)"]}
                                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                                locations={[0, 0.9]}
                                style={{
                                    width: 250,
                                    height: 50,
                                    borderRadius: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return(
        { name: state.name }
    )
}

export default connect(mapStateToProps,{signInUser: signInUser})(LoginScreen)