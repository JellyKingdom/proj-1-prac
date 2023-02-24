// axios 요청이 들어가는 모든 모듈
import axios from "axios";

const token = localStorage.getItem("Access_Token");

const api = axios.create({
    baseURL: "http://localhost:4000/",
    headers: { Access_Token: token },
});

const getUsers = async () => {
    const response = await api.get(`/signup`);
    console.log(response.data);
    return response.data;
};

//signup
const signup = async (newUsers) => {
    await axios.post(`http://localhost:4000/signup`, newUsers);
};

//signin
const signin = async (userInfo) => {
    await axios.post(`http://localhost:4000/login`, userInfo);
};

export { signup, getUsers };
