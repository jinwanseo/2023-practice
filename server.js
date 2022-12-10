import { config } from "dotenv";
config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { getUser, getManager } from "./user/user.utils.js";
import schema from "./schema.js";

const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});
const serverCleanup = useServer(
  {
    schema,
    context: async (params) => ({
      loggedInUser: await getUser(params.connectionParams.token),
      loggedInManager: await getManager(params.connectionParams.token),
      token: params.connectionParams.token,
    }),
  },
  wsServer
);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use("/", cors(), morgan("tiny"), bodyParser.json());
app.use(
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.token),
      loggedInManager: await getManager(req.headers.token),
      token: req.headers.token,
    }),
  })
);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
