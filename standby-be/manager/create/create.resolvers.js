import client from "../../client.js";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    // CreateManager
    createManager: async (
      _,
      {
        username,
        password,
        name,
        phone,
        email,
        storeName,
        storeNumber,
        storeAddress,
      }
    ) => {
      try {
        // Manager 아이디 중복 여부 확인
        const userId = await client.manager.findUnique({
          where: { username },
          select: { id: true },
        });

        if (userId) throw new Error("이미 사용중인 아이디 입니다.");

        // 1. Store 등록
        const { id: storeId } = await client.store.create({
          data: {
            name: storeName,
            number: storeNumber,
            address: storeAddress,
          },
          select: {
            id: true,
          },
        });

        // 2. Manager 등록
        // 비번 Hash
        const bcrypted = await bcrypt.hash(password, 10);
        await client.manager.create({
          data: {
            username,
            password: bcrypted,
            name,
            phone,
            email,
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
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};
