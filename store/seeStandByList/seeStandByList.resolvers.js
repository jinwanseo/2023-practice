import client from "../../client.js";
import { protectManagerResolver } from "../../user/user.utils.js";
export default {
  Query: {
    seeStandByList: protectManagerResolver(
      async (_, { page = 1, itemCnt = 10 }, { loggedInManager }) => {
        const searchManger = await client.manager.findUnique({
          where: {
            id: loggedInManager.id,
          },
          select: {
            storeId: true,
          },
        });

        if (!searchManger) throw new Error("매니저 정보 없음");

        const standByList = await client.standBy.findMany({
          where: {
            storeId: searchManger.id,
          },
          include: {
            user: {
              select: {
                name: true,
                phone: true,
              },
            },
          },

          skip: (page - 1) * itemCnt,
          take: itemCnt,
          orderBy: { createdAt: "asc" },
        });

        return standByList;
      }
    ),
  },
};
