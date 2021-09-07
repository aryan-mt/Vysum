import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


// Action types
export const COMPLETE_TEST = 'COMPLETE_TEST'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const ADD_DEVICE = 'ADD_DEVICE'
export const CLEAR_BLE = 'CLEAR_BLE'

// Action creators
export const addDevice = scannedDevice => ({
    type: ADD_DEVICE,
    payload: scannedDevice
})

export const clearBLE = () => ({
    type: CLEAR_BLE
})

export const completeTest = id => ({
    type: COMPLETE_TEST,
    payload: id
})

// TODO: Combine signInUser and SignUpUser - many of the lines are identical
export const signInUser = ({ email, password, onSuccess }) => async dispatch => {
    dispatch({type: SIGN_IN_REQUEST})
    
    try {
        const response = await auth().signInWithEmailAndPassword(email, password)
        const uid = response.user.uid
        const usersCollection = firestore().collection("Users")
        const fsDocument = await usersCollection.doc(uid).get()
        if (!fsDocument.exists) {
            alert("User does not exist")
        }
        const data = fsDocument.data()
        console.log(data)
        dispatch({type: SIGN_IN_SUCCESS, payload: data})
        onSuccess()
    } catch (error) {
        console.log(error)
        dispatch({type: SIGN_IN_ERROR})
    }
}


export const signUpUser = ({ name, email, password, onSuccess }) => async dispatch => {
    dispatch({type: SIGN_UP_REQUEST})

    try {
        const response = await auth().createUserWithEmailAndPassword(email, password)
        const uid = await response.user.uid
        data = {
            name,
            email,
            uid
        }
        const userCollection = firestore().collection('Users')
        await userCollection.doc(uid).set(data)
        dispatch({type: SIGN_UP_SUCCESS, payload: data})
        onSuccess()
    } catch (error) {
        console.log(error)
        dispatch({type: SIGN_UP_ERROR})
    }
}



// auth()
// .signInWithEmailAndPassword(email, password)
// .then((response) => {
//     const uid = response.user.uid
//     const usersCollection = firestore().collection('Users')
//     usersCollection
//         .doc(uid)
//         .get()
//         .then(fsDocument => {
//             if (!fsDocument.exists) {
//                 alert("User does not exist")
//             }
//             const data = fsDocument.data()
//             dispatch({type: SIGN_IN_SUCCESS, payload: data})
//         })
//         onSuccess()
// })
// .catch(error => {
//     dispatch({type: SIGN_IN_ERROR})
// })
// .catch(error => {
//     dispatch({type: SIGN_IN_ERROR})
// });