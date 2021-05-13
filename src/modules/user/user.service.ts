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
    const user = { id: document.key, ...data };
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: user,
    };
  };
  insertMany = async (
    dataList: IUser[]
  ): Promise<IBaseOracleDocument<IUser>[]> => {
    const documentList = await this.userModel.insertManyAndGet(dataList);
    const result = documentList.map((document, index) => {
      const user = { id: document.key, ...dataList[index] };
      return {
        id: document.key,
        createdOn: document.createdOn,
        lastModified: document.lastModified,
        document: user,
      };
    });
    return result;
  };
  findById = async (id: string): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.find().key(id).getOne();
    if (!document) {
      return null;
    }
    const userDocument = document.getContent() as IUser;
    const user = { id: document.key, ...userDocument };
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: user,
    };
  };
  findOne = async (query: IUserFilter): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.find().filter(query).getOne();
    if (!document) {
      return null;
    }
    const userDocument = document.getContent() as IUser;
    const user = { id: document.key, ...userDocument };
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: user,
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
      const userDocument = document.getContent() as IUser;
      const user = { id: document.key, ...userDocument };
      return {
        id: document.key,
        createdOn: document.createdOn,
        lastModified: document.lastModified,
        document: user,
      };
    });
  };
  count = async (query: IUserFilter) => {
    const total = await this.userModel
      .find()
      .filter({ ...query })
      .count();
    return total.count;
  };
  findByIdAndUpdate = async (
    id: string,
    docs: IUser
  ): Promise<IBaseOracleDocument<IUser>> => {
    const document = await this.userModel.find().key(id).replaceOneAndGet(docs);
    if (!document) {
      return null;
    }
    const userDocument = document.getContent() as IUser;
    const user = { id: document.key, ...userDocument };
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: user,
    };
  };
}

export const userService = new UserService();
