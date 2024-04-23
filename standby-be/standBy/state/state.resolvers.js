import client from "../../client.js";
import { UPDATE_STANDBYLIST } from "../../constants.js";
import { protectManagerResolver } from "../../user/user.utils.js";
import pubsub from "../../pubsub.js";

export default {
  Mutation: {
    // 스토어 -> 유저 (호출)
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

        const standByInfo = await client.standBy.update({
          where: {
            userId_storeId: {
              userId: userId,
              storeId: loggedInManager.storeId,
            },
          },
          data: {
            state: "call",
          },
          include: {
            store: true,
          },
        });

        // TODO: 호출 처리 유저 소켓 알림
        pubsub.publish(UPDATE_STANDBYLIST, {
          updateStandByFromManager: { ...standByInfo },
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
    // 스토어 -> 유저 (입장)
    enter: protectManagerResolver(
      async (_, { userId }, { loggedInManager }) => {
        try {
          const searchedStandBy = await client.standBy.findUnique({
            where: {
              userId_storeId: {
                userId,
                storeId: loggedInManager.storeId,
              },
            },
          });

          if (!searchedStandBy)
            throw new Error("대기 리스트 내 유저 정보 없음");

          const standByInfo = await client.standBy.update({
            where: {
              userId_storeId: {
                userId: userId,
                storeId: loggedInManager.storeId,
              },
            },
            data: {
              state: "enter",
            },
            include: {
              store: true,
            },
          });

          // TODO: 입장 처리 유저 소켓 알림
          pubsub.publish(UPDATE_STANDBYLIST, {
            updateStandByFromManager: { ...standByInfo },
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
    // 스토어 -> 유저 (취소)
    cancel: protectManagerResolver(
      async (_, { userId }, { loggedInManager }) => {
        try {
          const searchedStandBy = await client.standBy.findUnique({
            where: {
              userId_storeId: {
                userId,
                storeId: loggedInManager.storeId,
              },
            },
          });

          if (!searchedStandBy)
            throw new Error("대기 리스트 내 유저 정보 없음");

          const standByInfo = await client.standBy.update({
            where: {
              userId_storeId: {
                userId: userId,
                storeId: loggedInManager.storeId,
              },
            },
            data: {
              state: "cancel",
            },
            include: {
              store: true,
            },
          });

          // TODO: 입장 처리 유저 소켓 알림
          pubsub.publish(UPDATE_STANDBYLIST, {
            updateStandByFromManager: { ...standByInfo },
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
