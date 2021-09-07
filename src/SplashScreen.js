import React, {useState, useEffect} from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer, StackActions} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import styles from './Styles'

export default function SplashScreen({ navigation }) {
  return (
    <View style={{...styles.container, backgroundColor:"white"}}>
      <View style={styles.splashHeader}>
        <Animatable.Image
          animation="zoomIn"
          duraton="500"
          source={require("../assets/icons/eye_icon.png")}
          style={{ height: "50%", width: "70%"}}
        />
      </View>
      <Animatable.View 
        style={styles.splashFooter}
        animation="slideInUp"
      >
        <Text style={styles.headerText}>{"Let's fix\nyour eyes!"}</Text>
        <View style={{...styles.button, alignItems:"flex-end"}}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                StackActions.replace("Signup")
              )}
              }
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.8)"]}
              style={{
                width:150,
                height:50,
                borderRadius:30,
                alignItems:"center",
                justifyContent:"center",
              }}
            >
              <Text style={{...styles.buttonText, color:"black"}}>Sign me up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

