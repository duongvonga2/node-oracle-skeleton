export interface IBaseOptions {
  limit?: number;
  skip?: number;
}

export interface IBaseOracleDocument<T> {
  id: string;
  createdOn: string;
  lastModified: string;
  document: Record<keyof T, any>;
}
export interface IBaseQuery {
  pageSize: number;
  page: number;
}
