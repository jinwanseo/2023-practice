import client from "../../client.js";
import { protectManagerResolver } from "../../user/user.utils.js";
export default {
  Query: {
    checkStandByListFromStore: protectManagerResolver(
      async (_, { page = 1, itemCnt = 10 }, { loggedInManager }) => {
        const standByList = await client.standBy.findMany({
          where: {
            storeId: loggedInManager.storeId,
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
