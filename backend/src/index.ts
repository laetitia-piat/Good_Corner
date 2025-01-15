import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import jwt, { Secret } from "jsonwebtoken";

const start = async () => {
  if (
    process.env.JWT_SECRET_KEY === null ||
    process.env.JWT_SECRET_KEY === undefined
  ) {
    throw Error("no secret key!");
  }
  await dataSourceGoodCorner.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }) => {
      if (context.email) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (token !== undefined) {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);
        if (payload) {
          console.log("payload was found and returned to resolver");
          return payload;
        }
      }
      return {};
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");
};
start();
