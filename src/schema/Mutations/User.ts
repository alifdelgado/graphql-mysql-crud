import bcryptjs from "bcryptjs";
import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { User } from "../../Entities/User";
import { UserType } from "../typeDefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, { name, username, password }: any) {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.insert({
      name,
      username,
      password: hashedPassword,
    });

    return {
      id: user.identifiers[0].id,
      name,
      username,
      password: hashedPassword,
    };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const { affected } = await User.delete(id);
    return !!affected;
  },
};

export const UPDATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, { id, name, username, oldPassword, password }: any) {
    const userFound = await User.findOne({ where: { id } });
    if (!userFound) return "user not found";
    const isMatch = await bcryptjs.compare(oldPassword, userFound.password);
    if (!isMatch) return "password do not match";
    const hashedPassword = await bcryptjs.hash(password, 10);
    const { affected } = await User.update(
      { id },
      { name, username, password: hashedPassword }
    );
    return !!affected
      ? { id, name, username, password: hashedPassword }
      : userFound;
  },
};
