import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Dimensions,
    Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { useNavigation, NavigationContainer, StackActions } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import {Svg, G, Circle} from 'react-native-svg'

import styles from "./Styles"
import Progbar from './components/Progbar';

const deviceWidth = Dimensions.get('window').width

getStreak = (medications) => {
    var streak = 0
    var position = 0
    var endLoop = false
    var currentDay = new Date()

    while (endLoop == false) {
        medications.map (medication =>{
            if(!(medication.intake.length == position)) {
                const currentIntake = new Date(medication.intake[medication.intake.length-1-position].toMillis())
                if(!(currentIntake.toDateString() == currentDay.toDateString())) {
                    endLoop = true
                    return
                }
            }
        })
        streak++
        position++
        currentDay.setDate(currentDay.getDate() - 1)

    }
    streak--
    return streak
}

function Voucher(props) {
    const daysRemaining = props.totalDays - props.streak

    return (
        <View style={styles.voucherContainer}>
            <Image
                source={require("../assets/icons/voucher.png")}
                style={{
                    width: deviceWidth*0.78,
                    resizeMode:"contain"
                }}
            />
            <View style={{position:"absolute", paddingLeft:deviceWidth*0.08}}>
                <Text style={styles.medicineText}>{daysRemaining} more days until</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Text style={{...styles.medicineText, fontSize:50, fontWeight:"600"}}>${props.value}</Text>
                    <Text style={styles.medicineText}> voucher!</Text>    
                </View>
            </View>
        </View>
    )
}

function RewardScreen(props) {

    const streak = getStreak(props.user.medications)
    
    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Rewards!"}</Text>
            </View>
            <View style={{...styles.footer}}>
                <ScrollView style={{margin:10}}>
                    <View style={{alignItems:"center", justifyContent:"center", flex:1, overflow:"hidden"}}>
                        <Progbar streak={streak} max={50}></Progbar>
                    </View>
                    <Voucher value={10} totalDays={50} streak={streak}/>
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return(
        { user: state.user }
    )
}


export default connect(mapStateToProps)(RewardScreen)

