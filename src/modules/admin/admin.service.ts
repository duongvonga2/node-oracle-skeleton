import { SodaCollection } from "oracledb";
import { IBaseOptions, IBaseOracleDocument, oracleDB } from "../../commons";
import { IAdmin, IAdminCreate, IAdminUpdate } from "./admin.interface";
import bcrypt from "bcrypt";

class AdminService {
  private adminModel: SodaCollection;

  init = async () => {
    const model = await oracleDB.soda.createCollection("admin");
    this.adminModel = model;
    return true;
  };
  insertOne = async (
    data: IAdminCreate
  ): Promise<IBaseOracleDocument<IAdmin>> => {
    const date = new Date().toISOString();
    data.createdAt = date;
    data.updatedAt = date;
    data.password = bcrypt.hashSync(data.password, 10);
    const document = await this.adminModel.insertOneAndGet(data); // by oracle, method document.getContent() in this api will return null because performance reason
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: { id: document.key, ...data },
    };
  };
  insertMany = async (
    dataList: IAdminCreate[]
  ): Promise<IBaseOracleDocument<IAdmin>[]> => {
    const date = new Date().toISOString();
    dataList.forEach((item) => {
      item.password = bcrypt.hashSync(item.password, 10);
      item.createdAt = date;
      item.updatedAt = date;
    });
    const documentList = await this.adminModel.insertManyAndGet(dataList);
    const result = documentList.map((document, index) => {
      return {
        id: document.key,
        createdOn: document.createdOn,
        lastModified: document.lastModified,
        document: {
          id: document.key,
          ...dataList[index],
        },
      };
    });
    return result;
  };
  findById = async (id: string): Promise<IBaseOracleDocument<IAdmin>> => {
    console.log("id", id);
    const document = await this.adminModel.find().key(id).getOne();
    if (!document) {
      return null;
    }
    const data: IAdmin = document.getContent() as IAdmin;
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: { ...data, id: document.key },
    };
  };
  findOne = async (
    query: Record<string, any>
  ): Promise<IBaseOracleDocument<IAdmin>> => {
    const document = await this.adminModel.find().filter(query).getOne();
    if (!document) {
      return null;
    }
    const data = document.getContent() as IAdmin;
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: { ...data, id: document.key },
    };
  };
  deleteById = async (id: string) => {
    return await this.adminModel.find().key(id).remove();
  };
  find = async (
    query: Record<string, any>,
    options: IBaseOptions
  ): Promise<IBaseOracleDocument<IAdmin>[]> => {
    const { limit, skip } = options;

    const documentList = await this.adminModel
      .find()
      .filter({ ...query })
      .skip(skip)
      .limit(limit)
      .getDocuments();
    return documentList.map((document) => {
      const data = document.getContent() as IAdmin;
      return {
        id: document.key,
        createdOn: document.createdOn,
        lastModified: document.lastModified,
        document: { ...data, id: document.key },
      };
    });
  };
  count = async (query: Record<string, any>) => {
    const total = await this.adminModel
      .find()
      .filter({ ...query })
      .count();
    return total.count;
  };
  findByIdAndUpdate = async (
    id: string,
    docs: IAdminUpdate
  ): Promise<IBaseOracleDocument<IAdmin>> => {
    docs.updatedAt = new Date().toISOString();
    const document = await this.adminModel // by oracle, method document.getContent() in this api will return null because performance reason
      .find()
      .key(id)
      .replaceOneAndGet(docs);
    if (!document) {
      return null;
    }
    const data = document.getContent() as IAdmin;
    return {
      id: document.key,
      createdOn: document.createdOn,
      lastModified: document.lastModified,
      document: { ...data, id: document.key },
    };
  };
}

export const adminService = new AdminService();
