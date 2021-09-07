import {combineReducers} from 'redux'

import {
    COMPLETE_TEST,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    ADD_DEVICE,
    CLEAR_BLE
} from './actions'

const initialState = {
    user: {
        name: "",
        email: "",
        id: "",
    },

    tests: [
        { id: 1, completed: false },
        { id: 2, completed: false }
    ],
    BLE: {
        deviceList:[],
    },
}

// TRYING TO ADD a device to the DeviceList:

export default reducer = (state = initialState, action) =>  {
    switch (action.type) {
        case COMPLETE_TEST: {
            return { 
                ...state, 
                tests: state.tests.map(test => {
                    if (test.id !== action.payload) {
                        return test
                    }

                    return {
                        ...test,
                        completed: true
                    }
                })
            }
        }
        
        // TODO: Fix the order of the fallthrough
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    id: action.payload.uid,
                    medications: action.payload.medications,
                    //startDate: action.payload.medicineData.startDate.toDate(),
                }
            }
        }

        // TODO: Fix the order of the fallthrough 
        case SIGN_UP_ERROR:
        case SIGN_IN_ERROR: {
            return state
        }
        
        case ADD_DEVICE: {
            if (action.payload.scannedDevice && !state.BLE.deviceList.find((dev) => dev.id === action.payload.scannedDevice .id)) {
                const newDeviceList = [
                    ...state.BLE.deviceList,
                    action.payload.scannedDevice
                ]
                return {...state, deviceList: newDeviceList}
              }
            return state
        }
        
        case CLEAR_BLE: {
            const newDeviceList = []
            return {...state, deviceList: newDeviceList}; 
        }

        default:
            return state
    }
}

// const reducer = combineReducers ({
//     completed: completeReducer,
// })

// export default reducer