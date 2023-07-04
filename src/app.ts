import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/index";
import { AppDataSource } from "./data-source";
import { PORT } from "./config/config";
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

export const main = () => {
  AppDataSource.initialize().then(console.log).catch(console.log);
  app.listen(PORT);
};
