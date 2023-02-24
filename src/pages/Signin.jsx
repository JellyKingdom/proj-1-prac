import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../elem/Button";
import Input from "../elem/Input";
import Text from "../elem/Text";
import Wrapper from "../elem/Wrapper";
import { signin } from "../api/test";

function Signin() {

    //nickname, id, pw 담는 useState
    const [user, setUser] = useState({
        username: "",
        password: "",
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
        if (user.username.trim() === "" || user.password.trim() === "") {
            return alert("모든 항목을 입력해주세요.");
        }

        setUser({ id: "", username: "", password: "" });
    };

    return (
        <>
            <h2>로그인</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitHandler();
                }}
            >
                <Wrapper mg='10px 0'>
                            <Text size='20'>id</Text>
                        </Wrapper>
                <Input
                    type='text'
                    onChange={onChangeHandler}
                    name='username'
                    value={user.username}
                />
                <br />
                <Wrapper mg='10px 0'>
                            <Text size='20'>password</Text>
                        </Wrapper>
                <Input
                    type='password'
                    onChange={onChangeHandler}
                    name='password'
                    value={user.password}
                />
                <br />
                <Button size='large'>로그인</Button>
            </form>

      
            <Wrapper mg='10px 0'>
            <Text>
                회원이 아니신가요?
                <Link to={"/signup"}>회원가입</Link>
            </Text>
            </Wrapper>

        </>
    );
}

export default Signin;
