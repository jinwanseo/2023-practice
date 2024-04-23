import { Router } from "express";

import * as clientController from "../controller/clientController.js";

const router = Router();

// 스토어 정보 조회
router.get(`/store`, [
  // 1. 접속 스토어 조회
  clientController.getManager,
  // 2. 스토어 정보 전송
  clientController.resManager,
]);

// 내 정보 조회
router.get(`/my`, [
  // 1. 접속 스토어 조회
  clientController.getManager,

  // 2. 토큰 유무
  clientController.hasToken,

  // 3. 토큰 조회
  clientController.checkToken,

  // 4. 유저 정보 조회
  clientController.checkClient,

  // 5. 유저 정보 전송
  clientController.resClient,
]);

// 대기 등록
router.post(`/login`, [
  // 1. 접속 스토어 조회
  clientController.getManager,

  // 2. 토큰 유무
  clientController.hasToken,

  // 3. 토큰 조회
  clientController.checkToken,

  // 4. 유저 대기 등록
  clientController.loginClient,
]);
// 대기 등록 (토큰 없을때 로그인 처리)
router.post("/login", [clientController.loginClient]);

// 대기 취소
router.delete(`/cancel`, [
  // 1. 접속 스토어 조회
  clientController.getManager,

  // 2. 토큰 유무
  clientController.hasToken,

  // 3. 토큰 조회
  clientController.checkToken,

  // 4. 유저 정보 조회
  clientController.checkClient,

  // 5. 유저 정보 전송 (대기 취소)
  clientController.cancelClient,
]);

// 토큰 삭제
router.delete(`/token/remove`, [
  // 1. 토큰 유무
  clientController.hasToken,
  // 2. 토큰 조회
  clientController.checkToken,
  // 3. 토큰 삭제
  clientController.removeToken,
]);

export default router;
