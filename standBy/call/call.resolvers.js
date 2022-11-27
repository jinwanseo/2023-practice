import client from "../../client.js";
import { protectManagerResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    call: protectManagerResolver(async (_, { userId }, { loggedInManager }) => {
      try {
        const searchedStandBy = await client.standBy.findUnique({
          where: {
            userId_storeId: {
              userId: userId,
              storeId: loggedInManager.storeId,
            },
          },
        });

        if (!searchedStandBy) throw new Error("대기 리스트 내 유저 정보 없음");

        await client.standBy.update({
          where: {
            userId_storeId: {
              userId: userId,
              storeId: loggedInManager.storeId,
            },
          },
          data: {
            state: "call",
          },
        });

        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    }),
  },
};
