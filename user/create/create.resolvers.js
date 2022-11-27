import client from "../../client.js";
import jwt from "jsonwebtoken";
export default {
  Mutation: {
    createUser: async (
      _,
      { name, phone, storeId },
      { loggedInUser, token }
    ) => {
      // 1. 스토어 확인
      const { id: stId } = await client.store.findUnique({
        where: { id: storeId },
        select: { id: true },
      });
      if (!stId)
        return {
          ok: false,
          error: "스토어 정보 확인 불가",
        };

      // 토큰이 있는 상태
      if (loggedInUser) {
        // 토큰내 유저 정보 검사
        let user = await client.user.findUnique({
          where: { id: loggedInUser.id },
          select: { id: true },
        });

        // 유저 유효한 경우
        if (user) {
          // 대기열 정보 검사
          const standBy = await client.standBy.findFirst({
            where: {
              userId: user.id,
              storeId: storeId,
            },
            select: {
              id: true,
            },
          });

          // 대기열 없을시 대기열 생성 + 토큰 저장 + ok
          if (!standBy) {
            await client.standBy.create({
              data: {
                store: {
                  connect: {
                    id: storeId,
                  },
                },
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                token,
              },
            });
          }

          return {
            ok: true,
          };
        }
        // 유저 유효하지 않는 경우
        else {
          return {
            ok: false,
            error: "토큰 재발급 요망",
          };
        }
      }

      // 토큰 없을시
      try {
        // 1. 유저 체크
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
        // 2-1. 기존 유저 있을시
        if (user) {
          userId = user.id;
          // 대기 리스트 검색
          const standBy = await client.standBy.findFirst({
            where: {
              userId,
            },
            select: {
              id: true,
            },
          });

          // 이미 대기 고객일시
          if (standBy) {
            return {
              ok: true,
              // 토큰 새로 발급 (대기 열 삭제 불가)
              token: jwt.sign({ id: userId }, process.env.JWT_SECRET),
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
          // UserId 저장
          userId = newUser.id;
        }
        // 토큰 발급
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
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
            token,
          },
        });

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
