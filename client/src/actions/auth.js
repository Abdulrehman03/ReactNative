import axios from 'axios'
import Toast from "react-native-simple-toast"
// import setAuthToken from '../utils/setAuthToken'



//Load User
export const loadUser = () => async dispatch => {

    // if (localStorage.token) {
    //     setAuthToken(localStorage.token)
    // }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: "USER_LOADED",
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: "AUTH_ERROR"
        })
    }

}


//Register User
export const register = ({ name, id, password}) => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, id, password });

    try {

        const res = await axios.post('http://10.0.2.2:8000/api/users/', body, config);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });
        Toast.show("User Registerd")
       
    } catch (err) {
        Toast.show("Register Failed")

        const errors = err.response.data.errors
        console.log(errors)

        dispatch({
            type: "REGISTER_FAIL"
        })
    }

}

//Login User 

export const login = ({ regNo, password }) => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ regNo, password });

    try {

        const res = await axios.post('/api/auth', body, config);


        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });
        dispatch(loadUser());
        // dispatch(checkPayments());
    } catch (err) {

        const errors = err.response.data.errors
        console.log(errors)
        ToastsStore.error("Login Failed")

        dispatch({
            type: "LOGIN_FAIL"
        })
    }

}
//Logout User

export const logout = () => dispatch => {

    dispatch({
        type: "LOGOUT"
    })



}

