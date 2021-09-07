import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment'


import styles from "./Styles"

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

timestampToDate = (medications) => {
    var intakes = []
    index = 0

    medications.map(medication => {
        intakes[index] = []
        medication.intake.map(intake => {
            intakes[index].push(moment(new Date(intake.toMillis())).format("YYYY-MM-DD"))

        })
        index++
    })

    return intakes
}

getMarkedDates = (intakes) => {
    var signUpDate = new Date(1626876000000)
    var currentDate = new Date()
    var takenToday = true
    var markedDates = {}

    while (currentDate > signUpDate) {
        intakes.forEach((intake, i) => {
            if (!intake.includes(moment(currentDate).format("YYYY-MM-DD"))) {
                takenToday = false
            }
        })
        if (takenToday == true) {
            markedDates[moment(currentDate).format("YYYY-MM-DD")] = { selected: true, selectedColor: "#DFF2EE" }
        }
        takenToday = true
        currentDate.setDate(currentDate.getDate() - 1)
    }
    return markedDates
}

getStreak = (medications) => {
    var streak = 0
    var position = 0
    var endLoop = false
    var currentDay = new Date()

    while (endLoop == false) {
        medications.map(medication => {
            if (!(medication.intake.length == position)) {
                const currentIntake = new Date(medication.intake[medication.intake.length - 1 - position].toMillis())
                if (!(currentIntake.toDateString() == currentDay.toDateString())) {
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


function ProgressScreen(props) {

    markedDates = getMarkedDates(timestampToDate(props.user.medications))
    const streak = getStreak(props.user.medications)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Your Progress"}</Text>
            </View>
            <View style={styles.footer}>
                <ScrollView style={{ margin: 10 }}>
                    <View style={{ alignItems:"center", flexDirection:"column", borderRadius:20, marginBottom: deviceHeight / 25}}>
                        <Text style={{ ...styles.medicineText, fontSize: 30, fontWeight: "700" }}>{streak} day streak</Text>
                        <Text style={{ ...styles.medicineText, fontSize: 20, marginTop:16}}>You're doing awesome!</Text>
                    </View>
                        <Calendar
                            theme={
                                {
                                    dayTextColor: "#000",
                                    arrowColor: "#009373",
                                    todayTextColor: "#000",
                                    textMonthFontSize: 20,
                                    textMonthFontWeight: "500",
                                    selectedDayTextColor: "#009373"
                                }
                            }
                            markedDates={markedDates}
                        ></Calendar>
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return (
        { user: state.user }
    )
}


export default connect(mapStateToProps)(ProgressScreen)

