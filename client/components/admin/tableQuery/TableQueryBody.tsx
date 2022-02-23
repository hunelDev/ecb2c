import { FC, MouseEventHandler } from 'react';
import { checkForExcludeProps } from '../../../utils/general';
import { TableActionProps } from '../../../utils/types';
import TableQueryActionsBody from './TableQueryActionsBody';
import TableQueryBodyTd from './TableQueryBodyTd';

type TableBodyProps = {
    tableBodyList: {
        [prop: string]: number | string | null;
    }[];

    hasCounter?: boolean;
    actions?: TableActionProps;
    rowClicK?: MouseEventHandler<HTMLTableRowElement>;
    excludeProps?: string[];
    rowIndexDescriptor: string;
};

const TableBody: FC<TableBodyProps> = ({
    tableBodyList,
    hasCounter,
    actions,
    rowClicK,
    excludeProps,
    rowIndexDescriptor,
}) => {
    let count = 0;
    const tableRowElements = tableBodyList.map((row) => {
        const tr = Object.keys(row).map((prop) => {
            if (!checkForExcludeProps(prop, excludeProps))
                return <TableQueryBodyTd listRowProps={row[prop]} key={prop} />;
        });

        return (
            <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={count}
                onClick={rowClicK}
                data-index={row[rowIndexDescriptor]}
            >
                <td scope="col" className="py-2 px-4 font-semibold">
                    {++count}
                </td>
                {tr}
                <TableQueryActionsBody actions={actions} />
            </tr>
        );
    });
    return <tbody>{tableRowElements}</tbody>;
};

export default TableBody;
