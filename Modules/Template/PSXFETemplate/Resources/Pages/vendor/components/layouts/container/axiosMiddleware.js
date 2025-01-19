import axios from 'axios';

// To track ongoing Axios requests
let currentRequests = [];

// Request middleware to add the cancel token to each request
const requestMiddleware = (config) => {
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    currentRequests.push(source);
    return config;
};

// Response middleware to clean up finished requests
const responseMiddleware = (response) => {
    currentRequests = currentRequests.filter(
        (source) => source.token !== response.config.cancelToken
    );
    return response;
};

// Error middleware to handle request failures and remove the corresponding request from the list
const errorMiddleware = (error) => {
    if (!axios.isCancel(error)) {
        currentRequests = currentRequests.filter(
            (source) => source.token !== error.config.cancelToken
        );
    }
    return Promise.reject(error);
};

// Function to cancel all ongoing requests
export const cancelAllRequests = () => {
    currentRequests.forEach((source) => source.cancel('Request canceled by navigation'));
    currentRequests = []; // Clear the list of requests
};

// Setup Axios interceptors
export const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(requestMiddleware);
    axios.interceptors.response.use(responseMiddleware, errorMiddleware);
};
