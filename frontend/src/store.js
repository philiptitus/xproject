import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { 
    postDetailsReducer, 
    postUpdateReducer,
    postDeleteReducer,
    postCreateReducer, 




} from './reducers/postReducers'
import { 
chatCreateReducer, messageDeleteReducer } from './reducers/notificationReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    userLoginReducer,
     userRegisterReducer,
      userDetailsReducer,  
        accountDeleteReducer,
    } from './reducers/userReducers'


const reducer = combineReducers(
    {
        postDetails: postDetailsReducer,
        postDelete: postDeleteReducer,
        postCreate: postCreateReducer,
        postUpdate: postUpdateReducer,
    


        
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        accountDelete:accountDeleteReducer,
      

        chatCreate:chatCreateReducer,
        messageDelete:messageDeleteReducer,


    }
)






const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null



const initialstate = {

    userLogin: { userInfo: userInfoFromStorage }

}

const middleware = [thunk]
const store = createStore(reducer, initialstate, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store