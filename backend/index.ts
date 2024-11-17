import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./src/config/db";
import AdResolver from "./src/resolvers/AdResolver";
import { buildSchema } from "type-graphql";
import CategoryResolver from "./src/resolvers/CategoryResolver";
import TagResolver from "./src/resolvers/TagResolver";

const start = async () => {
  await dataSourceGoodCorner.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server listening at: ${url}`);
};
start();
