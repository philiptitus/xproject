import store from "../store";
import {
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_RESET,

    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    POST_DELETE_RESET,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,
} from '../constants/postConstants';

const initialStater = {
    loading: false,
    brands: [],
    error: null,
};

export const postDetailsReducer = (
    state = { post: {} },
    action
) => {
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { loading: true, ...state };
        case POST_DETAILS_SUCCESS:
            return { loading: false, post: action.payload, success: true };
        case POST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case POST_DETAILS_RESET:
            return { post: {} };
        default:
            return state;
    }
};

export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_DELETE_REQUEST:
            return { loading: true };
        case POST_DELETE_SUCCESS:
            return { loading: false, success: true };
        case POST_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case POST_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true };
        case POST_CREATE_SUCCESS:
            return { loading: false, success: true, post: action.payload };
        case POST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case POST_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const postUpdateReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case POST_UPDATE_REQUEST:
            return { loading: true };
        case POST_UPDATE_SUCCESS:
            return { loading: false, success: true, post: action.payload };
        case POST_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case POST_UPDATE_RESET:
            return { post: {} };
        default:
            return state;
    }
};
