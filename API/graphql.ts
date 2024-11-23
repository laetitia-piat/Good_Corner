import { ApolloServer } from "apollo-server-micro";
import { send } from "micro";
import Cors from "micro-cors";
import { typeDefs } from "../backend/schema";
import AdResolver from "../backend/src/resolvers/AdResolver";
import CategoryResolver from "../backend/src/resolvers/CategoryResolver";
import TagResolver from "../backend/src/resolvers/TagResolver";

const cors = Cors();

const resolvers = {
  Query: {
    ...AdResolver.Query,
    ...CategoryResolver.Query,
    ...TagResolver.Query,
  },
  Mutation: {
    ...AdResolver.Mutation,
    ...CategoryResolver.Mutation,
    ...TagResolver.Mutation,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({ path: "/api/graphql" });

  return cors((req, res) => {
    return req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res);
  });
});
