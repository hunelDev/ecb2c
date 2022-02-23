import { FC, ReactElement } from 'react';

type TableEmptyProps = {
    content: string | ReactElement;
};
const TableEmpty: FC<TableEmptyProps> = ({ content }) => {
    if (typeof content === 'string')
        return <p className="font-semibold text-gray-400">{content}</p>;
    return content;
};

export default TableEmpty;
