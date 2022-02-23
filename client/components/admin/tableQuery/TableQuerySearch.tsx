import { ChangeEventHandler, FC } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { TableItemsListState } from '../../../utils/types';
import { checkForExcludeProps } from '../../../utils/general';

type TableSearchProps = {
  tableItemsListState: TableItemsListState;
  handleSearchingTextChange: ChangeEventHandler;
  handleSearchingPropChange: ChangeEventHandler;
  searchText: string;
  searchProp: string;
  excludeProps?: string[];
};

const TableSearch: FC<TableSearchProps> = ({
  tableItemsListState,
  handleSearchingTextChange,
  handleSearchingPropChange,
  searchText,
  searchProp,
  excludeProps,
}) => {
  const { tableItems } = tableItemsListState;
  const props = Object.keys(tableItems[0] ?? {});
  const menuItems = props.map((prop) => {
    if (!checkForExcludeProps(prop, excludeProps))
      return (
        <option value={prop} key={prop}>
          {prop}
        </option>
      );
  });

  return (
    <div className="flex my-2 rounded-l-full justify-end items-center">
      <button className="p-5 bg-blue-500 inline-block rounded-full focus:outline-none">
        <BiSearchAlt className="text-white text-xl" />
      </button>
      <div className="py-1.5 px-3 left-14 top-0">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <select
            id="column"
            onChange={handleSearchingPropChange}
            value={searchProp}
            className="border-gray-300 border"
          >
            <option value=""></option>
            {menuItems}
          </select>
          <input
            onChange={handleSearchingTextChange}
            value={searchText}
            placeholder="Ne aransın ?"
            type="text"
            id="search"
            className="my-0 p-0 w-full relative border border-gray-300 px-1 py-0.5"
          />
        </div>
      </div>
    </div>
  );
};

export default TableSearch;
