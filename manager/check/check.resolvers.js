import client from "../../client.js";
import { protectManagerResolver } from "../../user/user.utils.js";
import bcrypt from "bcrypt";
export default {
  Query: {
    checkUsername: async (_, { username }) => {
      try {
        const searchedUserCnt = await client.manager.count({
          where: { username },
        });
        return {
          ok: searchedUserCnt === 0,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
    checkPassword: protectManagerResolver(
      async (_, { password }, { loggedInManager }) => {
        try {
          const result = bcrypt.compareSync(password, loggedInManager.password);
          return {
            ok: result,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
          };
        }
      }
    ),
  },
};
