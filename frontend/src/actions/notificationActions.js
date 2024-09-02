import {
    CHAT_CREATE_REQUEST,
    CHAT_CREATE_SUCCESS,
    CHAT_CREATE_FAIL,
    CHAT_CREATE_RESET,

    MESSSAGE_DELETE_REQUEST,
    MESSSAGE_DELETE_SUCCESS,
    MESSSAGE_DELETE_FAIL,
    MESSSAGE_DELETE_RESET,
} from '../constants/notificationConstants';
import axios from 'axios';

const BASE_URL = 'https://projectxfoundation/api/v1/';

export const createChat = (chat) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${BASE_URL}chat/`, chat, config);

        dispatch({
            type: CHAT_CREATE_SUCCESS,
            payload: {
                data,
                message:
                    data && data.message
                        ? data.message
                        : 'Comment saved successfully', // Default message if not present
            },
        });

        // Optionally reset the chat creation state
        dispatch({
            type: CHAT_CREATE_RESET,
        });

    } catch (error) {
        dispatch({
            type: CHAT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Reset the chat creation state
export const resetChatCreate = () => (dispatch) => {
    dispatch({ type: CHAT_CREATE_RESET });
};

export const deleteMessage = (messageId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSSAGE_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${BASE_URL}${messageId}/delete/`, config);

        dispatch({
            type: MESSSAGE_DELETE_SUCCESS,
        });

        // Optionally reset the message deletion state
        dispatch({
            type: MESSSAGE_DELETE_RESET,
        });

    } catch (error) {
        dispatch({
            type: MESSSAGE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Reset the message deletion state
export const resetMessageDelete = () => (dispatch) => {
    dispatch({ type: MESSSAGE_DELETE_RESET });
};
