import client from "../../client.js";
import { protectUserResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    deleteStandBy: protectUserResolver(
      async (_, { storeId }, { loggedInUser, token }) => {
        try {
          const searchStandBy = await client.standBy.findFirst({
            where: {
              store: {
                id: storeId,
              },
              user: {
                id: loggedInUser.id,
              },
              token: token,
            },
            select: {
              id: true,
            },
          });

          if (!searchStandBy)
            throw new Error(
              "대기열 삭제 불가 (대기열 삭제는 해당 대기열 등록 디바이스에서만 가능)"
            );

          await client.standBy.delete({
            where: { id: searchStandBy.id },
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
      }
    ),
  },
};
