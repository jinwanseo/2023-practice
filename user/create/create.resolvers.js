import client from "../../client.js";
export default {
  Mutation: {
    createUser: async (_, { name, phone, storeId }) => {
      try {
        // 1. 스토어, 유저 체크
        // 1-1. 스토어 체크
        const { id: stId } = await client.store.findUnique({
          where: { id: storeId },
          select: { id: true },
        });
        if (!stId) throw new Error("스토어 정보 확인 불가");
        // 1-2. 유저 체크
        let userId = null;
        const user = await client.user.findUnique({
          where: {
            name_phone: {
              name,
              phone,
            },
          },
          select: {
            id: true,
          },
        });

        // 2. 유저 설정
        // 2-1. 유저 아이디 있을시
        if (user) {
          userId = user.id;
          // 대기 리스트 검색
          const { id: hasId } = await client.standBy.findFirst({
            where: {
              userId,
            },
            select: {
              id: true,
            },
          });

          // 이미 대기 고객일시
          if (hasId) {
            return {
              ok: true,
            };
          }
        }
        // 2-2. 유저 아이디 없을시
        else {
          // User 생성
          const newUser = await client.user.create({
            data: {
              name,
              phone,
            },
            select: {
              id: true,
            },
          });
          userId = newUser.id;
        }

        // 3. StandBy 생성 +User Connect + Store Connect
        await client.standBy.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            store: {
              connect: {
                id: storeId,
              },
            },
          },
        });

        return {
          ok: true,
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
