import { MouseEventHandler } from 'react';
import { FC, useMemo } from 'react';
import {
  TableActionProps,
  TableItemListProps,
  TableItemsListState,
} from '../../../utils/types';
import TableBody from './TableQueryBody';
import TableHead from './TableQueryHead';

type TableMainProps = {
  tableItemsListState: TableItemsListState;
  tableItemsPure: TableItemListProps;
  currentPage: number;
  limit?: number;
  actions?: TableActionProps;
  rowClick?: MouseEventHandler<HTMLTableRowElement>;
  excludeProps?: string[];
  rowIndexDescriptor: string;
};

const TableMain: FC<TableMainProps> = ({
  tableItemsListState,
  tableItemsPure,
  currentPage,
  actions,
  rowClick,
  limit = 10,
  excludeProps,
  rowIndexDescriptor,
}) => {
  const { tableItems } = tableItemsListState;

  const pagedTableItems = useMemo(
    () => tableItems.slice((currentPage - 1) * limit, currentPage * limit),
    [tableItems, currentPage]
  );

  const tableHeadList = useMemo(() => {
    if (tableItemsPure.length > 0) return Object.keys(tableItemsPure[0]);
    return [];
  }, [tableItemsPure]);

  return (
    <table className="table-auto w-full">
      <TableHead
        tableHeadList={tableHeadList}
        hasCounter={true}
        tableItemsListState={tableItemsListState}
        actions={actions}
        excludeProps={excludeProps}
      />
      <TableBody
        tableBodyList={pagedTableItems}
        actions={actions}
        rowClicK={rowClick}
        excludeProps={excludeProps}
        rowIndexDescriptor={rowIndexDescriptor}
      />
    </table>
  );
};

export default TableMain;
