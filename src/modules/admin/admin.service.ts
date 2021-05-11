import { SodaCollection } from "oracledb";
import { IBaseOptions, oracleDB } from "../../commons";
import { IAdmin, IAdminDocument, IAdminFilter } from "./admin.interface";

class AdminService {
  private adminModel: SodaCollection;

  init = async () => {
    const model = await oracleDB.soda.createCollection("admin");
    this.adminModel = model;
    return true;
  };
  insertOne = async (data: IAdmin): Promise<IAdminDocument<IAdmin>> => {
    const document = await this.adminModel.insertOneAndGet(data);
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
  insertMany = async (
    dataList: IAdmin[]
  ): Promise<IAdminDocument<IAdmin>[]> => {
    const documentList = await this.adminModel.insertManyAndGet(dataList);
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
  findById = async (id: string): Promise<IAdminDocument<IAdmin>> => {
    const document = await this.adminModel.find().key(id).getOne();
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
  findOne = async (query: IAdminFilter): Promise<IAdminDocument<IAdmin>> => {
    const document = await this.adminModel.find().filter(query).getOne();
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
  deleteById = async (id: string) => {
    return await this.adminModel.find().key(id).remove();
  };
  find = async (
    query: IAdmin,
    options: IBaseOptions
  ): Promise<IAdminDocument<IAdmin>[]> => {
    const { limit, skip } = options;
    const documentList = await this.adminModel
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
  count = async (query: IAdmin) => {
    return this.adminModel
      .find()
      .filter({ ...query })
      .count();
  };
  findByIdAndUpdate = async (
    id: string,
    docs: IAdmin
  ): Promise<IAdminDocument<IAdmin>> => {
    const document = await this.adminModel
      .find()
      .key(id)
      .replaceOneAndGet(docs);
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: document.getContent(),
    };
  };
}

export const adminService = new AdminService();
