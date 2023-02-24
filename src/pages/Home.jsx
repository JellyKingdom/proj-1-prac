import React from "react";
import { getUsers } from "../api/test";
import { useQuery } from "react-query";

function Home() {
    const { isLoading, isError, data } = useQuery("user", getUsers);

    console.log(data);

    if (isLoading) {
        return <p>로딩중입니다....!</p>;
    }

    if (isError) {
        return <p>오류가 발생하였습니다...!</p>;
    }
    return (
        <>
            {data.map((item) => {
                return (
                <div key={item.id}>{item.username}</div>
                );
            })}
        </>
    );
}

export default Home;
