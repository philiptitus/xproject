import {
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_RESET,

    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    POST_DELETE_RESET,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,
} from '../constants/postConstants';
import axios from 'axios';

const BASE_URL = 'https://projectxfoundation/api/v1/';

export const listPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });

        const { data } = await axios.get(`${BASE_URL}${id}/`);

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Reset the post details state
export const resetPostDetails = () => (dispatch) => {
    dispatch({ type: POST_DETAILS_RESET });
};

export const deletePost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_DELETE_REQUEST,
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

        await axios.delete(`${BASE_URL}${postId}/delete/`, config);

        dispatch({
            type: POST_DELETE_SUCCESS,
        });

        // Reset the post delete state
        dispatch({
            type: POST_DELETE_RESET,
        });

    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createPost = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_CREATE_REQUEST,
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

        const { data } = await axios.post(`${BASE_URL}new/`, {}, config);

        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data,
        });

        // Reset the post creation state
        dispatch({
            type: POST_CREATE_RESET,
        });

    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updatePost = (post) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_UPDATE_REQUEST,
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

        const { data } = await axios.put(`${BASE_URL}update/${post.id}/`, post, config);

        dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: data,
        });

        // Optionally reset the post update state
        dispatch({
            type: POST_UPDATE_RESET,
        });

        // Update post details with the updated post data
        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Reset the post update state
export const resetPostUpdate = () => (dispatch) => {
    dispatch({ type: POST_UPDATE_RESET });
};

// Reset the post creation state
export const resetPostCreate = () => (dispatch) => {
    dispatch({ type: POST_CREATE_RESET });
};

// Reset the post delete state
export const resetPostDelete = () => (dispatch) => {
    dispatch({ type: POST_DELETE_RESET });
};
