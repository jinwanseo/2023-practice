import client from "../client.js";
export default {
  Query: {},
  Store: {
    standByCount: ({ id }) => {
      return client.standBy.count({
        where: {
          storeId: id,
        },
      });
    },
  },
};
