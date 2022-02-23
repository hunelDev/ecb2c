import { FC, MouseEventHandler } from 'react';
import { getUniqeFilteredArray, iterator } from '../../../utils/general';

type TablePaginatioCounterProps = {
    pageCount: number;
    currentPage: number;
    limit?: number;
    countRange?: number;
    onClick: MouseEventHandler<HTMLLIElement>;
};

const TablePaginationCounter: FC<TablePaginatioCounterProps> = ({
    pageCount,
    currentPage,
    countRange = 5,
    onClick,
}) => {
    let pageList: number[] = [];

    let startRange = currentPage - countRange; //1-5
    let endRange = currentPage + countRange;

    if (startRange <= 0) startRange = 1;

    if (pageCount - countRange < 0) endRange = pageCount;

    if (endRange > pageCount) endRange = pageCount;

    pageList = getUniqeFilteredArray([
        ...iterator(
            startRange,
            pageCount - countRange < 0 ? pageCount : countRange
        ),
        ...iterator(currentPage, endRange - currentPage + 1),
    ]);

    const pageListElements = pageList.map((val) => (
        <li
            className={`hover:text-blue-300 transition-colors ease-linear delay-75 px-2.5 py-1 rounded-md ${
                val === currentPage ? 'bg-blue-200' : ''
            }`}
            data-index={val}
            key={`counter-${val}`}
            onClick={onClick}
        >
            {val}
        </li>
    ));

    return <>{pageListElements}</>;
};

export default TablePaginationCounter;
