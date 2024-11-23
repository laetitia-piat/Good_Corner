import { ApolloServer } from "apollo-server-micro";
import { send } from "micro";
import Cors from "micro-cors";
import { typeDefs } from "../backend/schema"; // Assurez-vous que ce chemin est correct
import AdResolver from "../backend/src/resolvers/AdResolver";
import CategoryResolver from "../backend/src/resolvers/CategoryResolver";
import TagResolver from "../backend/src/resolvers/TagResolver";

const cors = Cors(); // Activer CORS pour éviter les problèmes cross-origin

// Fusionner tous les resolvers en un seul objet
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

// Créer une instance Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Exporter le gestionnaire Micro
export default async function start(req, res) {
  // Attendre le démarrage du serveur Apollo
  await apolloServer.start();

  // Créer un gestionnaire pour les requêtes GraphQL
  const handler = apolloServer.createHandler({ path: "/api/graphql" });

  // Appliquer CORS et gérer les requêtes
  return cors((req, res) => {
    if (req.method === "OPTIONS") {
      send(res, 200, "ok"); // Répondre aux requêtes OPTIONS pour CORS
    } else {
      return handler(req, res); // Déléguer le reste à Apollo Server
    }
  })(req, res);
}
