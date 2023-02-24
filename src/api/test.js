// axios 요청이 들어가는 모든 모듈
import axios from "axios";

const getUsers = async () => {
    const response = await axios.get(`http://localhost:4000/signup`);
    console.log(response.data);
    return response.data;
};

//signup
const signup = async (newUsers) => {
    await axios.post(`http://localhost:4000/signup`, newUsers);
};

export { signup, getUsers };
