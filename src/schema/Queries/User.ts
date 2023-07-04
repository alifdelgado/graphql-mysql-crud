import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { User } from "../../Entities/User";
import { UserType } from "../typeDefs/User";

export const FIND_ALL_USERS = {
  type: GraphQLList(UserType),
  async resolve() {
    return await User.find();
  },
};

export const FIND_USER_BY_ID = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    return await User.findOne({ where: { id } });
  },
};
