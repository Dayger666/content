export type Date = typeof Date;

export interface IError {
  status: number,
  message?: string,
}

export interface IResponseHeaders {
  [header: string]: boolean | number | string
}

export interface IFindOptions {
  page: number,
  pageSize: number,
  sort: string[],
}
