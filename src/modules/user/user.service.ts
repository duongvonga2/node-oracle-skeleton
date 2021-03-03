import { FilterQuery, QueryOptions, SaveOptions, UpdateQuery } from "mongoose";
import { IUser } from "./user.interface";
import userModel from "./user.model";

const find = async (
  query: FilterQuery<IUser>,
  select?: any,
  options?: QueryOptions
) => {
  return userModel.find(query, select, options);
};

const findOne = async (
  query: FilterQuery<IUser>,
  select?: any,
  options?: QueryOptions
) => {
  return await userModel.findOne(query, select, options);
};

const findOneAndUpdate = async (
  filter: FilterQuery<IUser>,
  doc: UpdateQuery<IUser>,
  options?: QueryOptions
) => {
  return userModel.findOneAndUpdate(filter, doc, {
    new: true,
    ...options,
  });
};

const create = async (data: IUser, options?: SaveOptions) => {
  const user = new userModel(data);
  await user.save(options);
  return user;
};

export const userService = {
  find,
  findOne,
  findOneAndUpdate,
  create,
};
