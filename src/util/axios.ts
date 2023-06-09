import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Accept = 'application/json';

export default axios;