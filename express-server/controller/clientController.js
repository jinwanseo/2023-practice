import Manager from "../models/manager.js";
import Client from "../models/client.js";
import * as Auth from "../utils/auth.js";

const getManager = async (req, res, next) => {
  const { managerPk } = req.query;
  // QUERY 없을시
  if (!managerPk)
    return res.status(404).json({
      message: "QR 코드를 다시 스캔해주세요",
      code: "NOT_MANAGERPK_IN_URL",
    });
  try {
    const manager = await Manager.findById(managerPk);
    req.manager = manager;
    next();
  } catch {
    // DB 없을시
    return res.status(404).json({
      message: "QR 코드를 다시 스캔해주세요",
      code: "NOT_MANAGER",
    });
  }
};

const resManager = (req, res, next) => {
  const manager = req.manager;
  return res.status(200).json({
    message: "매니저 조회 성공",
    manager,
  });
};

const hasToken = (req, res, next) => {
  const token = Auth.getToken(req.headers.authorization);
  // 토큰 없을시
  if (!token) {
    if (req.path.indexOf("login") > -1) return next("route");
    else if (req.path.indexOf("my") > -1) {
      return res.status(200).json({
        status: "before",
        totalCnt: req.manager.clients.filter(
          (c) => c.status === "wait" || c.status === "call"
        ).length,
      });
    } else
      return res.status(404).json({
        message: "토큰 없음",
        code: "NOT_TOKEN",
      });
  }

  req.token = token;
  return next();
};

// 토큰 정보 검사
const checkToken = async (req, res, next) => {
  // 스토어 정보
  const manager = req.manager;
  // 토큰 데이터 검사
  const { clientPk, managerPk } = Auth.getTokenData(req.token);
  // 토큰 내 정보 저장
  req.clientPk = clientPk;
  req.managerPk = managerPk;
  // 로그인 통해 접속한 경우, 로그인 라우터로 이동
  if (req.path.indexOf("login") > -1) return next("route");
  // 토큰 삭제 통해 접속한 경우, 토큰 삭제로 이동
  else if (req.path.indexOf("token/remove") > -1) next();

  // 로그인 안된 경우
  if (!clientPk) {
    return res.status(200).json({
      status: "before",
      totalCnt: manager.clients.filter(
        (c) => c.status === "wait" || c.status === "call"
      ).length,
    });
  }

  return next();
};

// 유저 정보 조회
const checkClient = async (req, res, next) => {
  const client = await Client.findById(req.clientPk);
  // DB 없는 경우
  if (!client) {
    return res.status(404).json({
      message: "토큰 내 클라이언트 정보 오류, 토큰 remove 함수 호출 요망",
      code: "NOT_CLIENT_INFO_TOKEN",
    });
  }

  req.client = client;
  return next();
};

// 유저 정보 전송
const resClient = async (req, res, next) => {
  const client = req.client;
  const manager = req.manager;

  // 대기열 (대기 / 호출 상태) 리스트
  const waitingList = manager.clients.filter(
    (c) => c.status === "wait" || c.status === "call"
  );
  // 대기열 중 본인 순서
  const waitingIdx = waitingList.findIndex(
    (w) => w.clientPk === String(client._id)
  );

  // 모든 대기열 중 본인 인덱스 (상태값 전송을 위한)
  const clientIdx = manager.clients.findIndex(
    (w) => w.clientPk === String(client._id)
  );

  return res.status(200).json({
    status: manager.clients[clientIdx].status,
    client: client,
    totalCnt: waitingList?.length ?? 0,
    count: waitingIdx === -1 ? null : waitingIdx + 1,
  });
};

// 유저 대기 등록
const loginClient = async (req, res, next) => {
  const { name, phone } = req.body;
  const manager = req.manager;
  const managerPkObj = req.managerPk ? { managerPk: req.managerPk } : {};

  // DB 등록
  const newClient = new Client({
    managers: [],
  });
  const client = await newClient.save();

  // 대기열 기본 정보 SET
  const standbyInfo = {
    clientPk: String(client._id),
    managerPk: String(manager._id),
    name,
    phone,
    created: new Date(),
    status: "wait",
  };

  client.managers.push(standbyInfo);
  manager.clients.push(standbyInfo);
  await Client.findByIdAndUpdate(client._id, client);
  await Manager.findByIdAndUpdate(manager._id, manager);

  // 응답
  return res.status(200).json({
    accessToken: Auth.createToken({
      clientPk: String(client._id),
      ...managerPkObj,
    }),
    totalCnt: manager.clients.filter(
      (c) => c.status === "wait" || c.status === "call"
    ).length,
    count: manager.clients.filter(
      (c) => c.status === "wait" || c.status === "call"
    ).length,
  });
};

// 대기 등록 취소
const cancelClient = async (req, res, next) => {
  const client = req.client;
  const manager = req.manager;

  // 대기열 내 status 변경 (cancel)
  const clientIdx = client.managers.findIndex(
    (i) => i.clientPk === String(client._id)
  );
  const managerIdx = manager.clients.findIndex(
    (i) => i.clientPk === String(client._id)
  );

  client.managers[clientIdx].status = "cancel";
  manager.clients[managerIdx].status = "cancel";

  await Client.findByIdAndUpdate(client._id, client);
  await Manager.findByIdAndUpdate(manager._id, manager);

  // 응답
  return res.status(200).json({
    message: "대기 등록 취소 완료, 토큰 remove 함수 호출 요망",
    result: "OK",
    totalCnt: manager.clients.filter(
      (c) => c.status === "wait" || c.status === "call"
    ).length,
  });
};

// 클라이언트 토큰 삭제
const removeToken = async (req, res, next) => {
  if (!req.managerPk)
    return res.status(200).json({
      message: "로컬 스토리지 내 토큰을 삭제 해주세요",
    });

  return res.status(200).json({
    accessToken: Auth.createToken({ managerPk: req.managerPk }),
  });
};

export {
  getManager,
  resManager,
  hasToken,
  checkToken,
  checkClient,
  resClient,
  loginClient,
  cancelClient,
  removeToken,
};
