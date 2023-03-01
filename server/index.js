const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers');

dotenv.config();

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
