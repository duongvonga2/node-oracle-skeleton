import { SodaCollection } from "oracledb";
import { IBaseOptions, IBaseOracleDocument, oracleDB } from "../../commons";
import { IUser, IUserFilter } from "./user.interface";

class UserService {
  private userModel: SodaCollection;

  init = async () => {
    const model = await oracleDB.soda.createCollection("user");
    this.userModel = model;
    return true;
  };
  insertOne = async (data: IUser): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.insertOneAndGet(data);
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
  insertMany = async (
    dataList: IUser[]
  ): Promise<IBaseOracleDocument<IUser>[]> => {
    const documentList = await this.userModel.insertManyAndGet(dataList);
    const result = await documentList.map((document) => {
      return {
        id: document.key,
        createdOn: document.createdOn,
        lastModified: document.lastModified,
        document: document.getContent(),
      };
    });
    return result;
  };
  findById = async (id: string): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.find().key(id).getOne();
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
  findOne = async (query: IUserFilter): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.find().filter(query).getOne();
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
  deleteById = async (id: string) => {
    return await this.userModel.find().key(id).remove();
  };
  find = async (
    query: IUserFilter,
    options: IBaseOptions
  ): Promise<IBaseOracleDocument<IUser>[]> => {
    const { limit, skip } = options;
    const documentList = await this.userModel
      .find()
      .filter({ ...query })
      .skip(skip)
      .limit(limit)
      .getDocuments();
    return documentList.map((document) => {
      return {
        id: document.key,
        createdOn: document.createdOn,
        lastModified: document.lastModified,
        document: document.getContent(),
      };
    });
  };
  count = async (query: IUserFilter) => {
    return this.userModel
      .find()
      .filter({ ...query })
      .count();
  };
  findByIdAndUpdate = async (
    id: string,
    docs: IUser
  ): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.find().key(id).replaceOneAndGet(docs);
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
}

export const userService = new UserService();
