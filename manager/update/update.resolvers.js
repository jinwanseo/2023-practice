import client from "../../client.js";
import { protectManagerResolver } from "../../user/user.utils.js";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    updateManager: protectManagerResolver(
      async (
        _,
        { name, phone, email, storeName, storeNumber, storeAddress },
        { loggedInManager }
      ) => {
        try {
          await client.store.update({
            where: {
              id: loggedInManager.storeId,
            },
            data: {
              name: storeName,
              number: storeNumber,
              address: storeAddress,
            },
          });

          await client.manager.update({
            where: {
              id: loggedInManager.id,
            },
            data: {
              name,
              phone,
              email,
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

    changePasswordManager: protectManagerResolver(
      async (_, { oldPassword, newPassword }, { loggedInManager }) => {
        try {
          // 1. loggedInManager pw, old password 비교
          if (!bcrypt.compareSync(oldPassword, loggedInManager.password)) {
            throw new Error("기존 비밀번호가 맞지 않음");
          }

          // 2. password 업데이트
          const password = bcrypt.hashSync(newPassword, 10);
          await client.manager.update({
            where: {
              id: loggedInManager.id,
            },
            data: {
              password,
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
