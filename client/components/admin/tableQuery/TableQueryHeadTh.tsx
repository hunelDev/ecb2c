import { FC, useState, MouseEventHandler } from 'react';
import { TableItemsListState } from '../../../utils/types';
import TableQueryHeadArow from './TableQueryHeadArow';

type TableHeadThProps = {
    index: string;
    TableItemsListState: TableItemsListState;
};

const TableHeadTh: FC<TableHeadThProps> = ({ index, TableItemsListState }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const { tableItems, setTableItems } = TableItemsListState;

    const clickHandler: MouseEventHandler<HTMLTableHeaderCellElement> = (e) => {
        const listItems = tableItems.concat();
        if (order === 'asc') {
            listItems.sort((a, b) => {
                let firstValue = a[index];
                let secondValue = b[index];
                if (
                    typeof firstValue === 'number' &&
                    typeof secondValue === 'number'
                ) {
                    return firstValue - secondValue;
                }

                return (a[index] ?? '')
                    .toString()
                    .localeCompare((b[index] ?? '').toString());
            });
            setTableItems(listItems);
            setOrder('desc');
        }

        if (order === 'desc') {
            listItems.sort((a, b) => {
                let firstValue = a[index];
                let secondValue = b[index];
                if (
                    typeof firstValue === 'number' &&
                    typeof secondValue === 'number'
                ) {
                    return secondValue - firstValue;
                }

                return (b[index] ?? '')
                    .toString()
                    .concat()
                    .localeCompare((a[index] ?? '').toString());
            });
            setTableItems(listItems);
            setOrder('asc');
        }
    };

    return (
        <th
            scope="col"
            className="p-4 hover:opacity-90"
            data-order={order}
            data-index={index}
            onClick={clickHandler}
        >
            <span className="flex flex-shrink-0">
                <span>{index}</span>
                <TableQueryHeadArow order={order} />
            </span>
        </th>
    );
};

export default TableHeadTh;
