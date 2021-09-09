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
    TouchableHighlight,
    Image,
    FlatList,
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import { useNavigation, NavigationContainer, StackActions } from "@react-navigation/native"
import 'react-native-gesture-handler';

import styles from "./Styles";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { connect } from 'react-redux'
//import { addDevice, clearBLE } from './redux/actions'

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

async function sendAdministrationData(uid) {

     
    
    const usersCollection = firestore().collection("Users")
    const fsDocument = await usersCollection.doc(uid).get()
    let actualMedications = fsDocument.data().medications
    let updatedMedications = [];

    actualMedications.forEach(medication => {
        updatedMedications.push({
            name: medication.name,
            intake: medication.intake,
            startDate: medication.startDate,
        })
    })

    const newDate = new Date()
    updatedMedications[0].intake = [...updatedMedications[0].intake, newDate];

    await usersCollection.doc(uid).update({
        medications: updatedMedications
    })
}

function DeviceScreen(props) {
    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();
    const [list, setList] = useState([]);


    const startScan = () => {
        if (!isScanning) {
          BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning...');
            setIsScanning(true);
          }).catch(err => {
            console.error(err);
          });
        }    
      }
    
      const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
      }
    
      const handleDisconnectedPeripheral = (data) => {
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
          peripheral.connected = false;
          peripherals.set(peripheral.id, peripheral);
          setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
      }
    
      const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
      }
    
      const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
          if (results.length == 0) {
            console.log('No connected peripherals')
          }
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var peripheral = results[i];
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
          }
        });
      }
    
      const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
          peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    
      const testPeripheral = (peripheral) => {
        if (peripheral){
          if (peripheral.connected){
            BleManager.disconnect(peripheral.id);
          }else{
            BleManager.connect(peripheral.id).then(() => {
              let p = peripherals.get(peripheral.id);
              if (p) {
                p.connected = true;
                peripherals.set(peripheral.id, p);
                setList(Array.from(peripherals.values()));
              }
              console.log('Connected to ' + peripheral.id);
    
    
              setTimeout(() => {
                
                /* Test read current RSSI value */
                BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                  console.log('Retrieved peripheral services', peripheralData);
                    
                  BleManager.startNotification(peripheral.id, "19B10010-E8F2-537E-4F6C-D104768A1214", "19B10012-E8F2-537E-4F6C-D104768A1214").then(() => {
                    // Success code
                    console.log("Notification started");
                  })
                  .catch((error) => {
                    // Failure code
                    console.log(error);
                  });
                //   BleManager.readRSSI(peripheral.id).then((rssi) => {
                //     console.log('Retrieved actual RSSI value', rssi);
                //     let p = peripherals.get(peripheral.id);
                //     if (p) {
                //       p.rssi = rssi;
                //       peripherals.set(peripheral.id, p);
                //       setList(Array.from(peripherals.values()));
                //     }                
                //   });                                          
                });
              }, 900);
            }).catch((error) => {
              console.log('Connection error', error);
            });
          }
        }
    
      }
    
      useEffect(() => {
        BleManager.start({showAlert: false});
    
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
        bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
        //bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
        bleManagerEmitter.addListener(
            "BleManagerDidUpdateValueForCharacteristic",
            ({ value, peripheral, characteristic, service }) => {
              // Convert bytes array to string
              console.log(`Recieved ${value} for characteristic ${characteristic}`);
              sendAdministrationData(props.user.id)
            }
          );
    
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("Permission is OK");
              } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                  if (result) {
                    console.log("User accept");
                  } else {
                    console.log("User refuse");
                  }
                });
              }
          });
        }  
        
        return (() => {
          console.log('unmount');
          bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
          bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
          bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
          bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
          
        })
      }, []);
    

      // Takes care of how the items are viewed in render
      const renderItem = (item) => {
        const color = item.connected ? '#DFF2EE' : '#fff';
        return (
          <TouchableHighlight onPress={() => testPeripheral(item) }>
            <View style={[styles.row, {backgroundColor: color, borderRadius:20}]}>
              <Text style={{...styles.medicineText, textAlign:"center", color: '#333333', marginTop:"5%"}}>{item.name}</Text>
              <Text style={{...styles.descriptionText, textAlign:"center", color: '#333333', fontSize:12}}>RSSI: {item.rssi}</Text>
              <Text style={{...styles.descriptionText, textAlign:"center", color: '#333333', marginBottom:"5%", fontSize:12}}>{item.id}</Text>
            </View>
          </TouchableHighlight>
        );
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Connect"}</Text>
            </View>
            <View style={styles.footer}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >   
                    <View
                        style={{marginBottom:"20%", justifyContent:"space-between"}}
                        >
                        <TouchableOpacity
                                onPress={() => startScan()}
                                style={{
                                alignItems: "center",
                                justifyContent:"center",
                                borderRadius:20,
                                backgroundColor: "#009373",
                                padding:"4%",
                                marginBottom:"3%"}}
                            >
                                    <Text style={styles.buttonText}>{'Scan (' + (isScanning ? 'on' : 'off') + ')'}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                                onPress={() => retrieveConnected()}
                                style={{
                                alignItems: "center",
                                justifyContent:"center",
                                borderRadius:20,
                                backgroundColor: "#009373",
                                padding:"4%",
                                marginBottom:"3%"}}
                            >
                                    <Text style={styles.buttonText}>'Retrieve'</Text>
                        </TouchableOpacity>
                    </View>
                    
                {(list.length == 0) &&
                    <View style={{margin: 20 }}>
                        <Text style={{ textAlign: 'center' }}>No peripherals</Text>
                    </View>
                }
                </ScrollView>
                <FlatList
                    style={{backgroundColor:"white"}}
                    data={list}
                    renderItem={({ item }) => renderItem(item) }
                    keyExtractor={item => item.id}
                />   
            </View>
 
        </View>
    )
}

const mapStateToProps = (state) => {
    return (
        { user: state.user }
    )
}


export default connect(mapStateToProps)(DeviceScreen)

