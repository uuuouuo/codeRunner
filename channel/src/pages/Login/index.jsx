import React, { useCallback } from "react";
import useInput from "../../hooks/useInput";
import { Header, Form, Label, Input, Button } from "./styles";
import axios from "axios";

const Login = () => {
  const [email, onChangeEmail] = useInput("");
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "",
          { email },
          {
            withCredentials: true,
          }
        )
        .then(() => {})
        .catch(() => {});
    },
    [email]
  );
  return (
    <div id="container">
      <Header>Slack</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
    </div>
  );
};

export default Login;
