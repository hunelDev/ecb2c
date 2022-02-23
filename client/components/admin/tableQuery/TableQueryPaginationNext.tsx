import { FC, MouseEventHandler } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { BiLastPage } from 'react-icons/bi';
import { TablePaginationCurrentState } from '../../../utils/types';

type TablePaginationNextProps = {
    TablePaginationCurrentState: TablePaginationCurrentState;
    lastPage: number;
};
const TablePaginationNext: FC<TablePaginationNextProps> = ({
    TablePaginationCurrentState,
    lastPage,
}) => {
    const { currentPage, setCurrentPage } = TablePaginationCurrentState;

    const HandleClickLast: MouseEventHandler<HTMLLIElement> = () => {
        setCurrentPage(lastPage);
    };

    const HandleClickNext: MouseEventHandler<HTMLLIElement> = () => {
        if (currentPage >= lastPage) return;
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <li
                className="hover:text-blue-300 transition-colors ease-linear delay-75 flex items-center px-1"
                onClick={HandleClickNext}
            >
                <MdNavigateNext title="sonraki sayfa" />
            </li>
            <li
                className="hover:text-blue-300 transition-colors ease-linear delay-75 flex items-center px-1"
                onClick={HandleClickLast}
            >
                <BiLastPage title="son sayfa" />
            </li>
        </>
    );
};

export default TablePaginationNext;
