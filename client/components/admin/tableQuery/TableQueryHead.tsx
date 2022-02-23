import { FC } from 'react';
import { checkForExcludeProps } from '../../../utils/general';
import { TableActionProps, TableItemsListState } from '../../../utils/types';
import TableQueryActionsHead from './TableQueryActionsHead';
import TableHeadTh from './TableQueryHeadTh';

type TableHeadProps = {
    tableHeadList: string[];
    hasCounter?: boolean;
    tableItemsListState: TableItemsListState;
    actions?: TableActionProps;
    excludeProps?: string[];
};

const TableHead: FC<TableHeadProps> = ({
    tableHeadList,
    hasCounter = true,
    tableItemsListState,
    actions,
    excludeProps,
}) => {
    const tableHeadElements = tableHeadList.map((th) => {
        if (!checkForExcludeProps(th, excludeProps))
            return (
                <TableHeadTh
                    index={th}
                    TableItemsListState={tableItemsListState}
                    key={th}
                />
            );
    });

    return (
        <thead>
            <tr className="capitalize bg-blue-500 text-white text-left">
                {hasCounter && (
                    <th scope="col" className="p-4">
                        <span>#</span>
                    </th>
                )}
                {tableHeadElements}
                <TableQueryActionsHead actions={actions} />
            </tr>
        </thead>
    );
};

export default TableHead;
