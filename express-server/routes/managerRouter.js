import { Router } from "express";
import * as managerController from "../controller/managerController.js";

const router = Router();

// 아이디 (중복 체크)
router.get("/check/id", [
  // 1. 아이디 중복 체크
  managerController.duplicateUserId,
]);

// 회원 가입
router.post("/register", [
  // 1. 회원 가입 처리
  managerController.registerUser,
]);

// 회원 정보 변경
router.put("/register", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 회원 정보 변경 처리
  managerController.changeManager,
]);

// 로그인
router.post("/login", [
  // 1. 로그인 처리
  managerController.loginManager,
]);

// 내 정보 조회
router.get("/my", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 회원 정보 전송 처리
  managerController.getManager,
]);

// 대기 현황
router.get("/standby", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 대기 현황 전송 처리
  managerController.checkStandByStatus,
]);

// 호출
router.put("/call", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 고객 정보 검사
  managerController.checkClient,
  // 5. 스토어 < > 고객 간 정보 링크 여부 검사
  managerController.isLinkClient,
  // 6. 스토어, 고객 호출 처리 정보 저장
  managerController.callClient,
]);

// 입장
router.put("/enter", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 고객 정보 검사
  managerController.checkClient,
  // 5. 스토어 < > 고객 간 정보 링크 여부 검사
  managerController.isLinkClient,
  // 6. 스토어, 고객 입장 처리 정보 저장
  managerController.enterClient,
]);

// 대기 취소
router.put("/cancel", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 고객 정보 검사
  managerController.checkClient,
  // 5. 스토어 < > 고객 간 정보 링크 여부 검사
  managerController.isLinkClient,
  // 6. 스토어, 고객 입장 처리 정보 저장
  managerController.cancelClient,
]);

// 비밀 번호 확인
router.post("/check/pw", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 비밀 번호 검사
  managerController.checkPw,
  (req, res) => {
    return res.status(200).json({
      msg: "비밀번호 같음",
      code: "OK",
    });
  },
]);

// 비밀 번호 변경
router.put("/change/pw", [
  // 1. 토큰 검사
  managerController.hasToken,
  // 2. 토큰 유효성 검사
  managerController.checkToken,
  // 3. 회원 정보 검사
  managerController.checkManager,
  // 4. 비밀 번호 검사
  managerController.checkPw,
  // 5. 변경할 비밀번호 적용
  managerController.changePw,
]);

export default router;
