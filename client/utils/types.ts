import { Dispatch, SetStateAction } from 'react';

export type User = {
  name: string;
  lastname: string;
  birthday: string;
  phone: string;
  email: string;
};

export type Category = {
  name: string;
  id: number;
  parentId: number;
  uuid: string;
};

export type TableItemListProps = { [prop: string]: number | string | null }[];

export type TableItemsListState = {
  tableItems: TableItemListProps;
  setTableItems: Dispatch<SetStateAction<TableItemListProps>>;
};

export type TablePaginationCurrentState = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export type TableActionProps = {
  attribute: string;
  operations: ('DELETE' | 'UPDATE')[];
};

export type ContentsType = {
  [prop: string]: {
    title: string;
    explanation: string;
  };
};

export type ImageObjectType = {
  src: string;
  id: string;
  status: 'pending' | 'success' | 'unsuccess';
  file: File;
  foreignSrc?: string;
  public_id?: string;
};
