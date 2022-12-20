import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import Divider from "components/Divider";
import LogoText from "components/LogoText";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
`;

const CREATE_MANAGER = gql`
  mutation CreateManager(
    $username: String!
    $password: String!
    $name: String!
    $phone: String!
    $storeName: String!
    $storeNumber: String!
    $storeAddress: String!
    $email: String
  ) {
    createManager(
      username: $username
      password: $password
      name: $name
      phone: $phone
      storeName: $storeName
      storeNumber: $storeNumber
      storeAddress: $storeAddress
      email: $email
    ) {
      ok
      error
    }
  }
`;

function Join(props) {
  const navigator = useNavigate();
  const [createManager, { loading }] = useMutation(CREATE_MANAGER);

  const {
    handleSubmit,
    register,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm();

  const handlers = {
    clearLoginError: () => {
      clearErrors("result");
    },
    onSubmit: (data) => {
      createManager({
        variables: data,
      })
        .then(({ data }) => {
          if (!data?.createManager?.ok)
            return setError("result", { message: data?.createManager?.error });
          const { username, password } = getValues();
          navigator(path.login, {
            state: {
              message: "회원가입 완료, 로그인 해주세요",
              username,
              password,
            },
          });
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
          <SubTitle>무료 스마트 대기 플랫폼을 사용하려면 가입하세요</SubTitle>

          <Form onSubmit={handleSubmit(handlers.onSubmit)}>
            <Divider label="기본 정보" />
            {/* 사용자 이름 */}
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "사용자 이름은 필수 입력 입니다",
                },
              })}
              placeholder={"사용자 이름"}
              error={Boolean(errors?.name?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.name?.message}</HelperText>
            {/* 휴대폰 번호 */}
            <Input
              {...register("phone", {
                required: {
                  value: true,
                  message: "휴대폰 번호는 필수 입력 입니다",
                },
              })}
              placeholder={"휴대폰 번호"}
              error={Boolean(errors?.phone?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.phone?.message}</HelperText>
            {/* 이메일 주소 */}
            <Input
              {...register("email", {
                required: {
                  value: true,
                  message: "메일 주소는 필수 입력 입니다",
                },
              })}
              placeholder={"메일 주소"}
              error={Boolean(errors?.email?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.email?.message}</HelperText>

            <Divider label="스토어 정보" />

            {/* 스토어명 */}
            <Input
              {...register("storeName", {
                required: {
                  value: true,
                  message: "스토어명은 필수 입력 입니다",
                },
              })}
              placeholder={"스토어명"}
              error={Boolean(errors?.storeName?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.storeName?.message}</HelperText>
            {/* 스토어 연락처 */}
            <Input
              {...register("storeNumber", {
                required: {
                  value: true,
                  message: "스토어 연락처는 필수 입력 입니다",
                },
              })}
              placeholder={"스토어 연락처"}
              error={Boolean(errors?.storeNumber?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.storeNumber?.message}</HelperText>
            {/* 스토어 주소 */}
            <Input
              {...register("storeAddress", {
                required: {
                  value: true,
                  message: "스토어 주소는 필수 입력 입니다",
                },
              })}
              placeholder={"스토어 주소 (지점명 가능)"}
              error={Boolean(errors?.storeAddress?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.storeAddress?.message}</HelperText>

            <Divider label="로그인 정보" />

            {/* 로그인 아이디 */}
            <Input
              {...register("username", {
                required: {
                  value: true,
                  message: "로그인 아이디는 필수 입력 입니다",
                },
              })}
              placeholder={"로그인 아이디"}
              error={Boolean(errors?.username?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.username?.message}</HelperText>

            {/* 로그인 비밀번호 */}
            <Input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "로그인 비밀번호는 필수 입력 입니다",
                },
              })}
              placeholder={"로그인 비밀번호"}
              error={Boolean(errors?.password?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.password?.message}</HelperText>

            {/* 비밀번호 확인 */}
            <Input
              type="password"
              {...register("passwordCheck", {
                required: {
                  value: true,
                  message: "비밀번호 확인은 필수 입력 입니다",
                },
                validate: (check) => {
                  const pw = getValues()?.password;
                  if (check !== pw) {
                    setError("passwordCheck", {
                      message: "비밀번호와 일치하지 않음",
                    });
                    return false;
                  } else return true;
                },
              })}
              placeholder={"비밀번호 확인"}
              error={Boolean(errors?.passwordCheck?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.passwordCheck?.message}</HelperText>

            <HelperText>{errors?.result?.message}</HelperText>
            <Button type="submit" value="가입" disabled={loading} />
          </Form>
        </Card>
        <Card style={{ display: "flex", flexDirection: "row" }}>
          <Caption>계정이 있으신가요?</Caption>
          <Caption>
            <StyledLink to={path.login}>로그인</StyledLink>
          </Caption>
        </Card>
      </ContentWrapper>
    </Container>
  );
}

export default Join;
