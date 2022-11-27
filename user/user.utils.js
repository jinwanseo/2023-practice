import client from "../client.js";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const tokenUser = jwt.verify(token, process.env.JWT_SECRET);
    // 유저 id 있을시에만 검색
    if (tokenUser.id) {
      const user = await client.user.findUnique({
        where: { id: tokenUser.id },
      });
      return user ?? null;
    } else return null;
  } catch (err) {
    return null;
  }
};

export const getManager = async (token) => {
  try {
    if (!token) return null;
    const tokenManager = jwt.verify(token, process.env.JWT_SECRET);
    // 매니저 id 있을시에만 검색
    if (tokenManager.managerId) {
      const user = await client.manager.findUnique({
        where: { id: tokenManager.managerId },
      });
      return user ?? null;
    } else return null;
  } catch (err) {
    return null;
  }
};

export const protectUserResolver =
  (resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info?.operation?.operation === "query";
      if (query) return null;
      return {
        ok: false,
        error: "토큰 정보 확인 불가",
      };
    }
    return resolver(root, args, context, info);
  };
export const protectManagerResolver =
  (resolver) => (root, args, context, info) => {
    if (!context.loggedInManager) {
      const query = info?.operation?.operation === "query";
      if (query) return null;
      return {
        ok: false,
        error: "토큰 정보 확인 불가",
      };
    }
    return resolver(root, args, context, info);
  };
