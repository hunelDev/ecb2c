import { FC } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

type TableHeadArowProps = {
    order: 'asc' | 'desc';
};

const TableHeadArow: FC<TableHeadArowProps> = ({ order }) => {
    if (order === 'asc')
        return <IoMdArrowDropup className="inline mr-0.5 mt-1" />;

    return <IoMdArrowDropdown className="inline mr-0.5 mt-1" />;
};

export default TableHeadArow;
