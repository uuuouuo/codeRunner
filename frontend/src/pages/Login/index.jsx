import React, { useCallback, useState } from "react";
import useInput from "../../hooks/useInput";
import { Header, Form, Label, Input, Button } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [nickname, onChangeNickname] = useInput("");
  const [login, setLogin] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`http://localhost:8081/user/${nickname}`, {
          params: { nickname: nickname },
        })
        .then(() => {
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
    navigate("/workspace/channel/일반채널");
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
