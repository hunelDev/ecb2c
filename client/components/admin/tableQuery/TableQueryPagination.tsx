import { FC, MouseEventHandler } from 'react';
import TableQueryPaginationCounter from './TableQueryPaginatioCounter';
import TableQueryPaginationBefore from './TableQueryPaginationBefore';
import TableQueryPaginationNext from './TableQueryPaginationNext';
import {
    TableItemListProps,
    TablePaginationCurrentState,
} from '../../../utils/types';

type TablePaginationProps = {
    handlePaginationClick: MouseEventHandler<HTMLLIElement>;
    TablePaginationCurrentState: TablePaginationCurrentState;
    tableItemList: TableItemListProps;
    limit?: number;
};
const TablePagination: FC<TablePaginationProps> = ({
    handlePaginationClick,
    TablePaginationCurrentState,
    tableItemList,
    limit = 10,
}) => {
    const { currentPage, setCurrentPage } = TablePaginationCurrentState;
    const pageCount = Math.ceil(tableItemList.length / limit);
    return (
        <div className="flex items-center text-2xl text-blue-500">
            {pageCount > 0 ? (
                <ul className="flex cursor-pointer">
                    <TableQueryPaginationBefore
                        TablePaginationCurrentState={
                            TablePaginationCurrentState
                        }
                    />
                    <TableQueryPaginationCounter
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onClick={handlePaginationClick}
                    />
                    <TableQueryPaginationNext
                        TablePaginationCurrentState={
                            TablePaginationCurrentState
                        }
                        lastPage={pageCount}
                    />
                </ul>
            ) : null}
        </div>
    );
};

export default TablePagination;
