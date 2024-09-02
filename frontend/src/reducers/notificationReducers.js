import {


    MESSSAGE_DELETE_REQUEST,
    MESSSAGE_DELETE_SUCCESS,
    MESSSAGE_DELETE_FAIL,
    MESSSAGE_DELETE_RESET,

    CHAT_CREATE_REQUEST,
    CHAT_CREATE_SUCCESS,
    CHAT_CREATE_FAIL,
    CHAT_CREATE_RESET,
} from '../constants/notificationConstants';


export const chatCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_CREATE_REQUEST:
            return { loading: true };
        case CHAT_CREATE_SUCCESS:
            return { loading: false, success: true, chat: action.payload };
        case CHAT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case CHAT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const messageDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSSAGE_DELETE_REQUEST:
            return { loading: true };
        case MESSSAGE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case MESSSAGE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case MESSSAGE_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
