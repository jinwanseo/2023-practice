import client from "../client.js";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await client.user.findUnique({
      where: { id },
    });
    return user ?? null;
  } catch (err) {
    return null;
  }
};

export const protectResolver = (resolver) => (root, args, context, info) => {
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
