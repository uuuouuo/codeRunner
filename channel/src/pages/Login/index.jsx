import React, { useCallback, useState } from "react";
import useInput from "../../hooks/useInput";
import { Header, Form, Label, Input, Button } from "./styles";
import { redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [nickname, onChangeNickname] = useInput("");
  const [login, setLogin] = useState(false);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.setItem("nickname", nickname);
      axios
        .post(
          "http://localhost:8081/user/login",
          { nickname: nickname },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data.message);
          setLogin(true);
          localStorage.setItem("nickname", nickname);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [nickname]
  );
  if (login) {
    return redirect("/workspace/channel/일반채널");
  }
  return (
    <div id="container">
      <Header>Slack</Header>
      <Form onSubmit={onSubmit}>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
    </div>
  );
};

export default Login;
