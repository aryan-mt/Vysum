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
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { useNavigation, NavigationContainer, StackActions } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import styles from "./Styles";


function ProfileScreen(props) {

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Profile"}</Text>
            </View>
            <View style={styles.footer}>
                <ScrollView style={{margin:10}}>
                    <TouchableOpacity 
                        style={{...styles.shadowBoxContainer, paddingLeft:24, justifyContent:"flex-start"}}
                        onPress={() => navigation.navigate('Device')}
                        >
                        <Text style={styles.medicineText}>Your device</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.shadowBoxContainer, paddingLeft:24, justifyContent:"flex-start"}}>
                        <Text style={styles.medicineText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.shadowBoxContainer, paddingLeft:24, justifyContent:"flex-start"}}>
                        <Text style={styles.medicineText}>Medications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.shadowBoxContainer, paddingLeft:24, justifyContent:"flex-start"}}>
                        <Text style={styles.medicineText}>Your doctor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.shadowBoxContainer, paddingLeft:24, justifyContent:"flex-start"}}>
                        <Text style={styles.medicineText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return(
        { tests: state.tests }
    )
}


export default connect(mapStateToProps)(ProfileScreen)

