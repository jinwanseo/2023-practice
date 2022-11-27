import client from "../../client.js";
import { protectManagerResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    deleteManager: protectManagerResolver(
      async (_, __, { loggedInManager }) => {
        try {
          // 1. 스토어 내 매니저 연결 계정 리스트 확인
          const managerCount = await client.manager.count({
            where: {
              storeId: loggedInManager.storeId,
            },
          });

          // 2. 스토어 삭제 마지막 매니저 일시 스토어 삭제
          if (managerCount === 1) {
            // 대기 리스트 삭제
            await client.standBy.deleteMany({
              where: {
                storeId: loggedInManager.storeId,
              },
            });

            // 매니저 삭제
            await client.manager.delete({
              where: { id: loggedInManager.id },
            });

            // 스토어 삭제
            await client.store.delete({
              where: { id: loggedInManager.storeId },
            });
          } else {
            // 3. 매니저 삭제
            await client.manager.delete({
              where: { id: loggedInManager.id },
            });
          }

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
