import { FC, MouseEventHandler } from 'react';
import { MdNavigateBefore } from 'react-icons/md';
import { BiFirstPage } from 'react-icons/bi';
import { TablePaginationCurrentState } from '../../../utils/types';

type TablePaginationBeforeProps = {
    TablePaginationCurrentState: TablePaginationCurrentState;
};
const TablePaginationBefore: FC<TablePaginationBeforeProps> = ({
    TablePaginationCurrentState,
}) => {
    const { currentPage, setCurrentPage } = TablePaginationCurrentState;

    const HandleClickFirst: MouseEventHandler<HTMLLIElement> = () => {
        setCurrentPage(1);
    };

    const HandleClickPrevious: MouseEventHandler<HTMLLIElement> = () => {
        if (currentPage - 1 <= 0) return;
        setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <li
                className="hover:text-blue-300 transition-colors ease-linear delay-75 flex items-center px-1"
                onClick={HandleClickFirst}
            >
                <BiFirstPage title="ilk sayfa" />
            </li>
            <li
                className="hover:text-blue-300 transition-colors ease-linear delay-75 flex items-center px-1"
                onClick={HandleClickPrevious}
            >
                <MdNavigateBefore title="önceki sayfa" />
            </li>
        </>
    );
};

export default TablePaginationBefore;
