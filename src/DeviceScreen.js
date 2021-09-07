import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TouchableOpacity,
    Image,
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import { useNavigation, NavigationContainer, StackActions } from "@react-navigation/native"
import 'react-native-gesture-handler';

import styles from "./Styles";

import { connect } from 'react-redux'
import { addDevice, clearBLE } from './redux/actions'

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function DeviceScreen(props) {
    
    const [isLoading, setIsLoading] = useState(false);
    

    const scanDevices = () => {
        
        setIsLoading(true)
        

        BleManager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
              console.warn(error);
            }
      
            if (scannedDevice) {
                addDevice(scannedDevice)
            }
          })
      
          setTimeout(() => {
            manager.stopDeviceScan();
            setIsLoading(false);
          }, 5000);

    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Connect"}</Text>
            </View>
            <View style={styles.footer}>
               <Text>Hi</Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return(
        { tests: state.tests }
    )
}


export default connect(mapStateToProps,{addDevice: addDevice, clearBLE: clearBLE})(DeviceScreen)

