import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const beforeTypeDefs = await loadFiles(
  path.join(__dirname, "**/*.typeDefs.js")
);
const beforeResolvers = await loadFiles(
  path.join(__dirname, "**/*.resolvers.js")
);

export const typeDefs = mergeTypeDefs(beforeTypeDefs);
export const resolvers = mergeResolvers(beforeResolvers);

export default makeExecutableSchema({ typeDefs, resolvers });
