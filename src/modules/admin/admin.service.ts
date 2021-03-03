import { FilterQuery, QueryOptions, SaveOptions, UpdateQuery } from "mongoose";
import { IAdmin } from "./admin.interface";
import adminModel from "./admin.model";

const find = async (
  query: FilterQuery<IAdmin>,
  select?: any,
  options?: QueryOptions
) => {
  return await adminModel.find(query, select, options);
};

const findOne = async (
  query: FilterQuery<IAdmin>,
  select?: any,
  options?: QueryOptions
) => {
  return await adminModel.findOne(query, select, options);
};

const findOneAndUpdate = async (
  filter: FilterQuery<IAdmin>,
  doc: UpdateQuery<IAdmin>,
  options?: QueryOptions
) => {
  return adminModel.findOneAndUpdate(filter, doc, {
    new: true,
    ...options,
  });
};

const create = async (data: IAdmin, options?: SaveOptions) => {
  const user = new adminModel(data);
  await user.save(options);
  return user;
};

export const adminService = {
  find,
  findOne,
  findOneAndUpdate,
  create,
};
