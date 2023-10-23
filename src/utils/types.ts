import { FileData } from 'aws-multipart-parser/dist/models';

export type valueof<T> = T[keyof T];

export type ResponseSchema = {
  type: object,
  properties: {
    name: { type: string }
  },
  required: ['name'],
};

type Definition = {
  Comment?: string;
  StartAt: string;
  States: {
    [state: string]: {
      Catch?: Catcher[];
      Type: 'Map' | 'Task' | 'Choice' | 'Pass';
      End?: boolean;
      Next?: string;
      ItemsPath?: string;
      ResultPath?: string;
      Resource?: string | { 'Fn::GetAtt': string[] };
      Iterator?: Definition;
    };
  };
};

type Catcher = {
  ErrorEquals: ErrorName[];
  Next: string;
  ResultPath?: string;
};

type ErrorName =
  | 'States.ALL'
  | 'States.DataLimitExceeded'
  | 'States.Runtime'
  | 'States.Timeout'
  | 'States.TaskFailed'
  | 'States.Permissions'
  | string;

export type DateInfoType = {
  year: number,
  month: number,
  day: number,
};

export type FileType = { file?: FileData };

export type RequiredFieldsType<I, T extends keyof I> = Pick<I, T> & Partial<Omit<I, T>>;

// TODO: implement type for requests where params
// export type WhereData<T> = {
//   [key in keyof T]: T[keyof T] | T[keyof T][]
// };
