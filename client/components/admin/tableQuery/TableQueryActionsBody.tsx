import { FC } from 'react';
import { TableActionProps } from '../../../utils/types';
import { RiDeleteBin6Fill } from 'react-icons/Ri';
import { BsPencilSquare } from 'react-icons/Bs';
type TableQueryActionsBodyProps = {
    actions?: TableActionProps;
};
const TableQueryActionsBody: FC<TableQueryActionsBodyProps> = ({ actions }) => {
    if (typeof actions !== 'undefined') {
        const actionsSpan = actions.operations.map((operation) => (
            <span key={`action-${operation}`} className="px-1 text-xl">
                {operation === 'DELETE' ? (
                    <RiDeleteBin6Fill className="inline text-red-500" />
                ) : (
                    <BsPencilSquare className="inline text-yellow-500" />
                )}
            </span>
        ));
        return <td>{actionsSpan}</td>;
    }

    return <></>;
};

export default TableQueryActionsBody;
