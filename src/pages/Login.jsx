import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  darkModeVar,
  disableDarkMode,
  enableDarkMode,
  logManagerIn,
  managerLoginVar,
} from "../apollo";
import path from "../router/path";
const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StyledTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  user-select: none;
`;

const LogoTitle = styled(StyledTitle)`
  text-transform: uppercase;
  cursor: pointer;
`;

const HelperText = styled(StyledTitle)`
  margin-top: -8px;
  font-size: 13px;
  color: tomato;
  padding-left: 3px;
`;

const SubTitle = styled(StyledTitle)`
  font-size: 22px;
  font-weight: 700;
`;

const Caption = styled(StyledTitle)`
  font-size: 14px;
  font-weight: 400;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
`;
const IconButton = styled.span`
  padding: 8px;
  cursor: pointer;
  transform: scale(1.05);
  transition: all 300ms ease-in-out;
`;

const Card = styled.div`
  border-color: ${(props) => props.theme.borderColor};
  border: 1px solid;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  min-width: 150px;
  border: 1px solid #95a5a6;
  padding: 8px 16px;
`;

const Button = styled.input`
  padding: 12px 16px;
  color: white;
  text-align: center;
  background-color: ${(props) => props.theme.success};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  &:hover {
    transform: scale(1.01);
    transition: all 150ms ease-in;
    box-shadow: 1px 1px 1px grey;
  }
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
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
  const isDarkMode = useReactiveVar(darkModeVar);
  const navigator = useNavigate();

  const [login, { loading }] = useMutation(LOGIN_MANAGER);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handlers = {
    onSubmit: (data) => {
      login({
        variables: data,
      }).then(({ data }) => {
        if (!data?.loginManager?.ok) {
          setError("result", { message: data?.loginManager?.error });
          return;
        }
        logManagerIn(data.loginManager.token);
        navigator(path.home);
      });
    },
  };

  return (
    <Container>
      <Header>
        <LogoTitle>Standby Togeter</LogoTitle>
        <IconButton onClick={isDarkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} size="lg" />
        </IconButton>
      </Header>
      <ContentWrapper>
        <Card>
          <img
            src="/images/logo_icon_.png"
            alt="logo"
            style={{ width: "40px" }}
          />
          <SubTitle>관리자 로그인</SubTitle>
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
            {errors?.username?.message && (
              <HelperText>{errors?.username?.message}</HelperText>
            )}
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
            {errors?.password?.message && (
              <HelperText>{errors?.password?.message}</HelperText>
            )}

            {errors?.result?.message && (
              <HelperText>{errors?.result?.message}</HelperText>
            )}
            <Button type="submit" value="로그인" disabled={loading} />
          </Form>
        </Card>
        <Card style={{ display: "flex", flexDirection: "row" }}>
          <Link to={path.join}>
            <Caption>회원 가입 하기</Caption>
          </Link>
        </Card>
      </ContentWrapper>
    </Container>
  );
}

export default Login;
