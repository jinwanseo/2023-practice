import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logManagerIn } from "apollo";
import Button from "components/Button";
import path from "router/path";
import Container from "components/Container";
import { Caption, LogoTitle, SubTitle } from "components/Heading";
import Card from "components/Card";
import Input from "components/Input";
import HelperText from "components/HelperText";
import Form from "components/Form";
import HeaderBar from "components/Header";
import StyledLink from "components/StyledLink";
import Message from "components/Message";
import LogoText from "components/LogoText";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
`;

const LOGIN_MANAGER = gql`
  mutation LoginManager($username: String!, $password: String!) {
    loginManager(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login(props) {
  const location = useLocation();
  const navigator = useNavigate();
  const [login, { loading }] = useMutation(LOGIN_MANAGER);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username,
      password: location?.state?.password,
    },
  });

  const handlers = {
    onSubmit: (data) => {
      login({
        variables: data,
      })
        .then(({ data }) => {
          if (!data?.loginManager?.ok) {
            setError("result", { message: data?.loginManager?.error });
            return;
          }
          logManagerIn(data.loginManager.token);
          navigator(path.home);
        })
        .catch((err) =>
          setError("result", { message: "서버 에러 (1~2분 후 재시도)" })
        );
    },
  };

  return (
    <Container>
      <HeaderBar />
      <ContentWrapper>
        <Card>
          <LogoText />

          <SubTitle>스토어 로그인</SubTitle>

          <Message>{location?.state?.message}</Message>

          <Form onSubmit={handleSubmit(handlers.onSubmit)}>
            <Input
              {...register("username", {
                required: {
                  value: true,
                  message: "아이디를 입력하세요",
                },
              })}
              placeholder="아이디"
              error={Boolean(errors?.username?.message)}
              onChange={() => clearErrors("result")}
            />
            <HelperText>{errors?.username?.message}</HelperText>

            <Input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "비밀번호를 입력하세요",
                },
              })}
              placeholder="비밀번호"
              error={Boolean(errors?.password?.message)}
              onChange={() => clearErrors("result")}
            />
            <HelperText>{errors?.password?.message}</HelperText>
            <HelperText>{errors?.result?.message}</HelperText>
            <Button type="submit" value="로그인" disabled={loading} />
          </Form>
        </Card>
        <Card style={{ display: "flex", flexDirection: "row" }}>
          <Caption>계정이 없으신가요?</Caption>
          <Caption>
            <StyledLink to={path.join}>가입하기</StyledLink>
          </Caption>
        </Card>
      </ContentWrapper>
    </Container>
  );
}

export default Login;
