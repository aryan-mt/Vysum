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
import { useNavigation } from "@react-navigation/native"
import 'react-native-gesture-handler';
import moment from 'moment';

import { connect } from 'react-redux'

import styles from "./Styles"

hasTakenToday = (intake) => {
    var taken = false
    if (typeof intake !== 'undefined') {
        const latestIntake = new Date(intake[intake.length-1].toMillis()).toDateString()
        const today = new Date().toDateString()

        if( latestIntake == today) {
            taken = true
        }
    }

    return taken
}

function CheckBox(props) {
    if (hasTakenToday(props.intake)) {
        return (
            <TouchableOpacity>
                <Image
                    source={require("../assets/icons/check_ticked.png")}
                    style={{ height: 30, width: 30 }}
                />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity>
                <Image
                    source={require("../assets/icons/check_empty.png")}
                    style={{ height: 30, width: 30 }}
                />
            </TouchableOpacity>
        )
    }
}


function Reminder(props) {

    const navigation = useNavigation()
    const medications = props.medications

    return medications.map (medication => {
        return (
            <View>
                <View style={styles.shadowBoxContainer}>
                    <View style={{ flex: 4 }}>
                        <Text key={medication} style={styles.medicineText}>{medication.name}</Text>
                        <Text style={styles.descriptionText}>8:20pm</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <CheckBox intake={medication.intake}/>
                    </View>
                </View>
            </View>
        )

    })
    

}


function HomeScreen(props) {

    const navigation = useNavigation()

    const fname = props.user.name.split(" ")[0]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {`Hi ${fname}!`}</Text>
            </View>
            <View style={styles.footer}>
                <ScrollView>
                    <Reminder medications={props.user.medications}></Reminder>
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
export default connect(mapStateToProps)(HomeScreen)
