const express = require("express");
const cors = require("cors");
const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers");
const { Server } = require("socket.io");
require("dotenv").config();

const port = process.env.PORT || 5050;

startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    context: ({ req }) => ({ req })
    });
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(expressMiddleware(server, {
    context: ({ req }) => ({ req })
  }));

     // Connect Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Handle socket connections
  io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);


    // Disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
    });
  });


 
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
