import client from "../../client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    loginManager: async (_, { username, password }) => {
      try {
        const searchManager = await client.manager.findUnique({
          where: { username },
          select: {
            id: true,
            username: true,
            password: true,
          },
        });

        if (!searchManager)
          throw new Error("아이디 또는 비밀번호가 잘못되었습니다");

        if (!bcrypt.compareSync(password, searchManager.password))
          throw new Error("아이디 또는 비밀번호가 잘못되었습니다");

        console.log(searchManager);

        const token = jwt.sign(
          { managerId: searchManager.id },
          process.env.JWT_SECRET
        );
        return {
          ok: true,
          token,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};
