const express = require("express");
const cors = require("cors");
const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers");
require("dotenv").config();

const port = process.env.PORT || 5050;

startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    context: ({ req }) => ({ req }),
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    });
  await server.start();

  app.use(cors(), express.json(), expressMiddleware(server));
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  const addr = httpServer.address();
  const host = addr.address === "::" ? "localhost" : addr.address;
  const hport = addr.port;
  console.log(`SERVER RUNNING AT http://${host}:${hport}/`);
};

mongoose
  .connect(process.env.URI, {})
  .then(() => {
    console.log("\nSUCCESS: CONNECTED TO DATABASE");
    startApolloServer();
  })
  .catch((err) => {
    console.error(err);
  });
