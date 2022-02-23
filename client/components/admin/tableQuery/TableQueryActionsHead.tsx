import { FC } from 'react';
import { TableActionProps } from '../../../utils/types';
type TableQueryActionsHeadProps = {
    actions?: TableActionProps;
};
const TableQueryActionsHead: FC<TableQueryActionsHeadProps> = ({ actions }) => {
    if (typeof actions !== 'undefined') {
        return <th>İşlemler</th>;
    }

    return <></>;
};

export default TableQueryActionsHead;
