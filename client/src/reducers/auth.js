

const initialState = {
    user: null,
   
    isAuthenticated: false
}

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            // localStorage.setItem('token', payload.token)
            console.log(payload);
            return {
                ...state,
                ...payload,
                user: payload,
                token: payload.token,
                isAuthenticated: true
            }

        case "AUTH_ERROR":    
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
        case "LOGOUT":    
            // localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated:false,
                user:null

            }
            case "USER_LOADED":
                return {
                    ...state,
                    isAuthenticated: true,
                    user: payload
                }    
        default:
            return state

    }
}