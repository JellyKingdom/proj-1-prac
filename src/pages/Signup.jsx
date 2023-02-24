import React, { useState } from "react";
import { signup } from "../api/test";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../elem/Wrapper";
import Text from "../elem/Text";
import Input from "../elem/Input";
import Button from "../elem/Button";

function Signup() {
    const navigate = useNavigate();

    //nickname, id, pw 담는 useState
    const [user, setUser] = useState({
        username: "",
        nickname: "",
        password: "",
    });

    //유저 스테이트 구조분해 할당
    const { username, password, nickname } = user;

    //상태관리 위해 초기값 세팅
    const [usernameInput, setUsernameInput] = useState("");
    const [nicknameInput, setNicknameInput] = useState("");

    //정규식
    const regUsername = /^[a-z0-9]{4,10}$/;
    const regNickname = /^[ㄱ-ㅎ|가-힣]{2,6}$/;

    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(signup, {
        onSuccess: () => {
            queryClient.invalidateQueries("user");
            alert("회원가입 성공!");
            navigate("/signin");
        },
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
        if (name === "username")
            !regUsername.test(value)
                ? setUsernameInput(
                      "5글자 이상 11글자 미만 영문과 숫자로 입력해주세요."
                  )
                : setUsernameInput("");

        if (name === "nickname")
            !regNickname.test(value)
                ? setNicknameInput("닉네임은 2-6자의 한글만 입력 가능합니다.")
                : setNicknameInput("");

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

        setUser({ id: "", username: "", nickname: "", password: "" });
    };

    return (
        <>
            <StContainer>
                <StForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitHandler();
                    }}
                >
                    <StMain>
                        <Wrapper mg='10px 0'>
                            <Text size='20'>nickname</Text>
                        </Wrapper>
                        <Input
                            type='text'
                            onChange={onChangeHandler}
                            name='nickname'
                            value={user.nickname}
                        />
                        <Wrapper mg='10px 0'>
                            <Text size='14' color='red'>
                                {nicknameInput}
                            </Text>
                        </Wrapper>

                        <Wrapper mg='10px 0'>
                            <Text size='20'>id</Text>
                        </Wrapper>
                        <Input
                            type='text'
                            onChange={onChangeHandler}
                            name='username'
                            value={user.username}
                        />
                        <Wrapper mg='10px 0'>
                            <Text size='14' color='red'>
                                {usernameInput}
                            </Text>
                        </Wrapper>

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
                    </StMain>

                    <Button size='large'>Register</Button>
                </StForm>
            </StContainer>
        </>
    );
}

export default Signup;

const StContainer = styled.div`
    height: 100%;
    border: 1px solid black;
    padding: 50px;
`;

const StMain = styled.div`
    width: 100%;
`;

const StForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
`;
