import client from "../client.js";
export default {
  Query: {
    seeUser: (_, { id }) =>
      client.user.findUnique({
        where: { id },
        select: {
          name: true,
          phone: true,
          standByList: true,
        },
      }),
  },
};
