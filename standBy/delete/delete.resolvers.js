import client from "../../client.js";
import { UPDATE_STANDBYLIST } from "../../constants.js";
import pubsub from "../../pubsub.js";
import {
  protectManagerResolver,
  protectUserResolver,
} from "../../user/user.utils.js";

export default {
  Mutation: {
    // 대기 취소 (유저)
    deleteStandByFromUser: protectUserResolver(
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
            include: { user: true },
            // select: {
            //   id: true,
            // },
          });

          if (!searchStandBy)
            throw new Error(
              "대기열 삭제 불가 (대기열 삭제는 해당 대기열 등록 디바이스에서만 가능)"
            );

          // 대기 정보 삭제
          await client.standBy.delete({
            where: { id: searchStandBy.id },
          });

          // 유저 내 대기 리스트 없을시 유저도 삭제
          const standByCount = await client.standBy.count({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (!standByCount)
            await client.user.delete({ where: { id: loggedInUser.id } });

          // TODO: 대기 취소 처리 스토어 소켓 알림
          pubsub.publish(UPDATE_STANDBYLIST, {
            updateStandBy: { ...searchStandBy, ...{ state: "cacel" } },
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
    deleteStandByFromManager: protectManagerResolver(
      async (_, { userId }, { loggedInManager }) => {
        try {
          // 1. Search StandBy
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

          // 2. Delete StandBy
          await client.standBy.delete({
            where: {
              id: searchedStandBy.id,
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
      }
    ),
  },
};
