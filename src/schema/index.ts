import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GREETING } from "./Queries/Greeting";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "./Mutations/User";
import { FIND_ALL_USERS, FIND_USER_BY_ID } from "./Queries/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    greeting: GREETING,
    findAllUsers: FIND_ALL_USERS,
    findUser: FIND_USER_BY_ID,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
