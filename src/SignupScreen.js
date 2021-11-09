import React, { useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux'
import { signUpUser } from './redux/actions'

import styles from "./Styles"

function SignupScreen(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleRegisterPress = () => {
        props.signUpUser({ name, email, 
            password,
            onSuccess: () => {
                navigation.navigate("Tab")
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{"Enter your details"}</Text>
            </View>
            <Animatable.View
                style={styles.footer}
                animation="slideInUp"
            >
                <ScrollView>
                    <View
                        style={styles.formContainer}>
                        <Text style={styles.formTitle}>Name</Text>
                        <TextInput
                            placeholder="Full Name"
                            onChangeText={(text) => setName(text)}
                            style={styles.formInput}
                        >
                        </TextInput>
                    </View>
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
                            onPress={handleRegisterPress}
                        >
                            <LinearGradient
                                colors={["rgba(0, 147, 115, 1)", "rgba(0, 147, 115, 0.8)"]}
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
                                <Text style={styles.buttonText}>Create an account</Text>
                            </LinearGradient>
                            
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Already got an account? <Text onPress={() => navigation.navigate('Login')} style={styles.footerLinkText}>Log in</Text></Text>
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

export default connect(mapStateToProps,{signUpUser: signUpUser})(SignupScreen)
