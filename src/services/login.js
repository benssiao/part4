import axios from "axios"
const baseUrl = 'http://localhost:3003/api/login';

async function login(credentials) {
    console.log(credentials);
    const response = await axios.post(baseUrl, credentials);
    console.log(response);
    return response;
}

export default {login}