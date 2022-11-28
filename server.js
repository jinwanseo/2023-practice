import { config } from "dotenv";
config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { typeDefs, resolvers } from "./schema.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { getUser, getManager } from "./user/user.utils.js";

const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), morgan("tiny"), bodyParser.json());
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

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at http://localhost:${PORT}`);
