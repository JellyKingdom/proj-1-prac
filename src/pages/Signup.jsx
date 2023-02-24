import React, { useState } from "react";
import { signup } from "../api/test";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    //nickname, id, pw 담는 useState
    const [user, setUser] = useState({

        username: "",
        nickname: "",
        password: "",
    });



    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(signup, {
        onSuccess: () => {
            queryClient.invalidateQueries("user");
            alert("회원가입 성공!")
            navigate('/signin');
            
        },
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });

        console.log(user);
    };



    const onSubmitHandler = async () => {
        if (
            user.nickname.trim() === "" ||
            user.username.trim() === "" ||
            user.password.trim() === ""
        ) {
            return alert("모든 항목을 입력해주세요.");
        }

        mutation.mutate(user);

        setUser({ id:"", username: "", nickname: "", password: "" , confirmPassword: ""});

    };

    return (
        <>
            <h2>회원가입</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitHandler();
                }}
            >
                nickname:
                <input
                    type='text'
                    onChange={onChangeHandler}
                    name='nickname'
                    value={user.nickname}
                />
                <br />
                id:
                <input
                    type='text'
                    onChange={onChangeHandler}
                    name='username'
                    value={user.username}
                />
                <br />
                password:
                <input
                    type='password'
                    onChange={onChangeHandler}
                    name='password'
                    value={user.password}
                />
                <br />
    
                <button>회원가입</button>
            </form>
        </>
    );
}

export default Signup;
