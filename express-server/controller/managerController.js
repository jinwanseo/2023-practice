import Manager from "../models/manager.js";
import Client from "../models/client.js";

import * as Auth from "../utils/auth.js";

// 중복 조회 (아이디)
const duplicateUserId = async (req, res) => {
  const { userId } = req.query;
  // 유저 아이디 검사
  if (!userId || userId.length < 5)
    return res.status(404).json({
      msg: "아이디는 5글자 이상 15글자 미만",
      code: "FAILED_USERID",
    });

  const selectedManager = await Manager.findOne({ userId: userId });
  if (selectedManager)
    return res.status(404).json({
      msg: "이미 사용중인 아이디 입니다",
      code: "FAILD_USERID",
    });

  return res.status(200).json({
    msg: "사용 가능한 아이디",
    code: "OK",
  });
};

// 회원 가입
const registerUser = async (req, res) => {
  const {
    userId,
    userPw,
    name,
    phone,
    storeName,
    storeAddress,
    storeNumber,
    blogUrl,
  } = req.body;

  const newUser = new Manager({
    userId,
    userPw: Auth.createPw(userPw),
    name,
    phone,
    storeName,
    storeAddress,
    storeNumber,
    blogUrl,
  });
  try {
    const user = await newUser.save();
    return res.status(200).json({
      msg: "회원 가입 완료",
      code: "OK",
      manager: user,
    });
  } catch (err) {
    return res.status(404).json({
      msg: "회원가입 불가",
      code: "FAILED_REGISTER",
      err: err,
    });
  }
};

// 토큰
const hasToken = async (req, res, next) => {
  const token = Auth.getToken(req.headers.authorization);
  // 토큰 없을시 다음 라우터로 이동
  if (!token)
    return res.status(404).json({
      msg: "토큰 없음",
      code: "NOT_TOKEN",
    });

  req.token = token;
  return next();
};

// 토큰 정보 검사
const checkToken = async (req, res, next) => {
  // 토큰 데이터 검사
  const { managerPk } = Auth.getTokenData(req.token);
  if (!managerPk)
    return res.status(404).json({
      msg: "스토어 관리자 아이디로 로그인 필요",
      code: "FAILED__CHECK_ROLE",
    });

  req.managerPk = managerPk;
  return next();
};

// 매니저 정보 검사
const checkManager = async (req, res, next) => {
  try {
    const manager = await Manager.findById(req.managerPk);
    if (!manager)
      return res.status(404).json({
        msg: "스토어 관리자 아이디 확인 불가",
        code: "NOT_CHECK_MANAGER_INFO",
      });

    req.manager = manager;
    return next();
  } catch (err) {
    return res.status(404).json({
      msg: "매니저 정보 확인 불가",
      code: "NOT_MANAGER_INFO",
      err,
    });
  }
};

// 매니저 정보 변경
const changeManager = async (req, res, next) => {
  const manager = req.manager;
  try {
    const changedManager = await Manager.findByIdAndUpdate(
      manager._id,
      req.body
    );

    return res.status(200).json({
      msg: "매니저 정보 변경 완료",
      code: "OK",
      manager: changedManager,
    });
  } catch (err) {
    return res.status(400).json({
      msg: "매니저 정보 변경 실패",
      code: "FAILED_CHANGE_MANAGER",
      err,
    });
  }
};

// 매니저 로그인
const loginManager = async (req, res, next) => {
  const { userId, userPw } = req.body;

  try {
    const manager = await Manager.findOne({
      userId: userId,
    });
    if (!manager || !Auth.comparePw(manager.userPw, userPw)) {
      return res.status(400).json({
        msg: "아이디 또는 비밀번호를 확인해 주세요",
        code: "FAILED_LOGIN",
      });
    }

    // // 1. 토큰 정보 GET
    let clientObj = {};
    const token = Auth.getToken(req.headers.authorization);
    if (token) {
      const { clientPk } = Auth.getTokenData(token);
      // 2. 있다면 토큰 발급시 추가
      clientObj = clientPk ? { clientPk: clientPk } : {};
    }

    return res.status(200).json({
      msg: "로그인 성공",
      accessToken: Auth.createToken({
        managerPk: String(manager._id),
        ...clientObj,
      }),
    });
  } catch (err) {
    return res.status(400).json({
      msg: "아이디 또는 비밀번호를 확인해 주세요",
      code: "FAILED_LOGIN",
      err,
    });
  }
};

// 매니저 정보 GET
const getManager = async (req, res) => {
  const manager = req.manager;
  return res.status(200).json({
    manager: manager,
  });
};

// 대기열 정보 GET
const checkStandByStatus = (req, res) => {
  const manager = req.manager;
  return res.status(200).json({
    clients: manager.clients,
  });
};

// 클라이언트 정보 조회
const checkClient = async (req, res, next) => {
  const manager = req.manager;
  const { clientPk } = req.body;
  if (!clientPk)
    return res.status(404).json({
      msg: "대기 고객 정보가 요청 정보 내 없음",
      code: "NOT_CLIENTPK",
    });

  try {
    const client = await Client.findById(clientPk);
    if (!client)
      return res.status(404).json({
        msg: "대기 고객 정보 조회 불가",
        code: "NOT_CLIENT",
      });

    req.user = client;

    const selectManager = await Manager.findById(manager._id).find({
      "clients.clientPk": client._id,
    });

    if (!selectManager)
      return res.status(404).json({
        msg: "스토어 대기열 내 대기 고객 정보 조회 불가",
        code: "NOT_CLIENT_IN_STANDBYLIST",
      });

    return next();
  } catch (err) {
    return res.status(404).json({
      msg: "대기 고객 정보 조회 불가",
      code: "NOT_CLIENT",
      err,
    });
  }
};

// 클라이언트 <> 매니저 연결 여부 확인
const isLinkClient = async (req, res, next) => {
  const client = req.user;
  const manager = req.manager;

  const selectedManagerIdx = client.managers.findIndex(
    (item) => String(item.managerPk) === String(manager._id)
  );

  const selectedClientIdx = manager.clients.findIndex(
    (item) => String(item.clientPk) === String(client._id)
  );

  if (selectedManagerIdx === -1)
    return res.status(404).json({
      msg: "유저 정보 대기 리스트에 스토어 정보가 포함되어있지 않음",
      code: "NOT_MANAGERPK_IN_CLIENT_INFO",
    });
  if (selectedClientIdx === -1)
    return res.status(404).json({
      msg: "스토어 대기 리스트에 유저 정보가 포함되어있지 않음",
      code: "NOT_CLIENTPK_IN_STORE_STANDBYLIST",
    });

  req.selectedManagerIdx = selectedManagerIdx;
  req.selectedClientIdx = selectedClientIdx;

  return next();
};

//
const updateManagerAndClient = async (req, res) => {
  const manager = req.manager;
  const client = req.user;

  try {
    await Manager.findByIdAndUpdate(manager._id, manager);
  } catch (err) {
    return res.status(400).json({
      msg: "대기 리스트 내 유저 처리 도중 에러 발생",
      code: "FAILED_CLIENT_IN_STANDBYLIST",
    });
  }
  try {
    await Client.findByIdAndUpdate(client._id, client);
  } catch (err) {
    return res.status(400).json({
      msg: "유저 처리 도중 에러 발생",
      code: "FAILED_CLIENT",
    });
  }
};

// 유저 호출
const callClient = async (req, res) => {
  const manager = req.manager;
  const client = req.user;

  client.managers[req.selectedManagerIdx].status = "call";
  manager.clients[req.selectedClientIdx].status = "call";

  await updateManagerAndClient(req, res);

  return res.status(200).json({
    msg: "호출 완료",
    code: "OK",
  });
};

// 유저 입장
const enterClient = async (req, res) => {
  const manager = req.manager;
  const client = req.user;

  // 입장 처리, 취소 처리는 manager.clients 내 유저정보 삭제
  client.managers[req.selectedManagerIdx].status = "enter";
  manager.clients[req.selectedClientIdx].status = "enter";

  await updateManagerAndClient(req, res);

  return res.status(200).json({
    msg: "입장 완료",
    code: "OK",
  });
};

// 유저 대기 취소 처리
const cancelClient = async (req, res) => {
  const manager = req.manager;
  const client = req.user;

  // 입장 처리, 취소 처리는 manager.clients 내 유저정보 삭제
  client.managers[req.selectedManagerIdx].status = "cancel";
  manager.clients[req.selectedClientIdx].status = "cancel";

  await updateManagerAndClient(req, res);

  return res.status(200).json({
    msg: "취소 완료",
    code: "OK",
  });
};

// 비밀 번호 검사
const checkPw = async (req, res, next) => {
  const { userPw } = req.body;
  const manager = req.manager;

  if (!Auth.comparePw(manager.userPw, userPw))
    return res.status(401).json({
      msg: "비밀번호 다름",
      code: "NOT_USERPW",
    });

  return next();
};

// 비밀 번호 변경
const changePw = async (req, res, next) => {
  const { changePw } = req.body;
  const manager = req.manager;

  manager.userPw = Auth.createPw(changePw);
  try {
    await Manager.findByIdAndUpdate(manager._id, manager);
    return res.status(200).json({
      msg: "비밀번호 변경 완료",
      code: "OK",
    });
  } catch (err) {
    return res.status(404).json({
      msg: "",
      code: "FAILED_CHANGE_PW",
      err,
    });
  }
};

export {
  duplicateUserId,
  registerUser,
  hasToken,
  checkToken,
  checkManager,
  changeManager,
  loginManager,
  getManager,
  checkStandByStatus,
  checkClient,
  isLinkClient,
  callClient,
  enterClient,
  cancelClient,
  checkPw,
  changePw,
};
