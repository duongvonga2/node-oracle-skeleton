import { SodaCollection } from "oracledb";
import { IBaseOptions, IBaseOracleDocument, oracleDB } from "../../commons";
import { IUser, IUserFilter } from "./user.interface";
import brcypt from "bcrypt";

class UserService {
  private userModel: SodaCollection;

  init = async () => {
    const model = await oracleDB.soda.createCollection("user");
    this.userModel = model;
    return true;
  };
  insertOne = async (data: IUser): Promise<IBaseOracleDocument<IUser>> => {
    data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();
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
    const date = new Date().toISOString();
    dataList.forEach((data) => {
      data.createdAt = date;
      data.updatedAt = date;
      data.password = brcypt.hashSync(data.password, 10);
    });
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
  findOne = async (
    query: Record<string, any>
  ): Promise<IBaseOracleDocument<IUser>> => {
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
    filterSpec: Record<string, any>,
    options: IBaseOptions
  ): Promise<IBaseOracleDocument<IUser>[]> => {
    const { limit, skip } = options;
    // const { createdFrom, createdTo, ...other } = query;
    // const filterSpec: Record<string, any> = {
    //   $query: other,
    // };
    // if (query.createdFrom) {
    //   filterSpec.$query.createdAt = { $gte: new Date(createdFrom) };
    // }
    // if (query.createdTo) {
    //   if (!filterSpec.$query.createdAt) {
    //     filterSpec.$query.createdAt = { $lte: new Date(createdTo) };
    //   } else {
    //     filterSpec.$query.createdAt = {
    //       ...filterSpec.$query.createdAt,
    //       $lte: new Date(createdTo),
    //     };
    //   }
    // }
    const documentList = await this.userModel
      .find()
      .filter(filterSpec)
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
  count = async (filterSpec: Record<string, any>) => {
    const total = await this.userModel
      .find()
      .filter({ ...filterSpec })
      .count();
    return total.count;
  };
  findByIdAndUpdate = async (
    id: string,
    docs: IUser
  ): Promise<IBaseOracleDocument<IUser>> => {
    docs.updatedAt = new Date().toISOString();
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
