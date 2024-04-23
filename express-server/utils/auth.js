import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

const { JWT_SECRET, BCRYPT_SALT } = process.env;
const PARSED_BCRYPT_SALT = Number(BCRYPT_SALT);

// 토큰 유무 확인
const getToken = (authorization) => {
  if (!authorization || !authorization.startsWith("Bearer")) return null;
  return authorization.split(" ")[1];
};

// 토큰 데이터 받기
const getTokenData = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw {
      msg: "토큰 만료",
      code: "EXP_TOKEN",
    };
  }
};

// 토큰 생성
const createToken = (data) => {
  return jwt.sign(JSON.stringify(data), JWT_SECRET);
};

// 비번 생성
const createPw = (pw) => {
  return bcrypt.hashSync(pw, PARSED_BCRYPT_SALT);
};

// 비번 확인
const comparePw = (originPw, inputPw) => {
  return bcrypt.compareSync(inputPw, originPw);
};

export { getToken, getTokenData, createToken, createPw, comparePw };
