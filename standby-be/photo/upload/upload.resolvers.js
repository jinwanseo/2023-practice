import { protectManagerResolver } from "../../user/user.utils.js";
import client from "../../client.js";
import { deletePhoto, uploadPhoto } from "../../shared/shared.utils.js";

export default {
  Mutation: {
    uploadPhoto: protectManagerResolver(
      async (_, { file }, { loggedInManager }) => {
        try {
          const { fileUrl, fileName } = await uploadPhoto(
            file,
            loggedInManager.storeId
          );

          await client.photo.create({
            data: {
              fileUrl,
              fileName,
              store: {
                connect: {
                  id: loggedInManager.storeId,
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
      }
    ),
    deletePhoto: protectManagerResolver(
      async (_, { id }, { loggedInManager }) => {
        try {
          const searchedPhoto = await client.photo.findUnique({
            where: { id },
          });
          if (!searchedPhoto) throw new Error("사진 정보 없음");
          // AWS Photo 삭제
          await deletePhoto(searchedPhoto.fileName);

          // Photo 삭제
          await client.photo.delete({
            where: { id },
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
