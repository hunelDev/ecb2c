import { useEffect } from 'react';
import { ReactElement } from 'react';
import { ChangeEventHandler, MouseEventHandler, useState, FC } from 'react';
import { checkForExcludeProps } from '../../../utils/general';
import { TableActionProps, TableItemListProps } from '../../../utils/types';
import TableEmpty from './TableEmpty';
import TableMain from './TableQueryMain';
import TablePagination from './TableQueryPagination';
import TableSearch from './TableQuerySearch';

type TableExtraProps = {
    tableItemsInit: TableItemListProps;
    actions?: TableActionProps;
    rowClick?: MouseEventHandler<HTMLTableRowElement>;
    emptyContent?: string | ReactElement;
    excludeProps?: string[];
    rowIndexDescriptor?: string;
};

const TableExtra: FC<TableExtraProps> = ({
    tableItemsInit,
    actions,
    rowClick,
    emptyContent = 'Listelenebilecek içerik bulunamadı',
    excludeProps,
    rowIndexDescriptor = 'id',
}) => {
    const [tableItems, setTableItems] =
        useState<TableItemListProps>(tableItemsInit);
    const [filteredTableItems, setFilteredTableItems] =
        useState<TableItemListProps>(tableItemsInit);

    const [searchText, setSearchText] = useState('');
    const [searchProp, setSearchProp] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchingTextChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setSearchText(e.target.value);
        if (currentPage !== 1) setCurrentPage(1);
        if (searchProp === '') {
            setFilteredTableItems(
                tableItems.filter((row) =>
                    Object.keys(row).some((key) => {
                        if (!checkForExcludeProps(key, excludeProps))
                            return new RegExp(e.target.value, 'i').test(
                                (row[key] ?? '').toString()
                            );
                    })
                )
            );

            return;
        }

        setFilteredTableItems(
            tableItems.filter((row) => {
                if (!checkForExcludeProps(searchProp, excludeProps))
                    return new RegExp(e.target.value, 'i').test(
                        (row[searchProp] ?? '').toString()
                    );
            })
        );
    };

    const handleSearchingPropChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setSearchProp(e.target.value);
        setSearchText('');
        setFilteredTableItems(tableItems);
    };

    const handlePaginationClick: MouseEventHandler<HTMLLIElement> = (e) => {
        const { index } = e.currentTarget.dataset;
        setCurrentPage(+index!);
    };

    useEffect(() => {
        setTableItems(tableItemsInit);
        setFilteredTableItems(tableItemsInit);
    }, [tableItemsInit]);

    const tableExtra = (
        <div className="xl:max-w-5xl 2xl:max-w-8xl max-w-2xl w-full">
            <div className="flex justify-between">
                <TablePagination
                    handlePaginationClick={handlePaginationClick}
                    TablePaginationCurrentState={{
                        currentPage,
                        setCurrentPage,
                    }}
                    tableItemList={filteredTableItems}
                />
                <TableSearch
                    handleSearchingTextChange={handleSearchingTextChange}
                    handleSearchingPropChange={handleSearchingPropChange}
                    tableItemsListState={{ tableItems, setTableItems }}
                    searchText={searchText}
                    searchProp={searchProp}
                    excludeProps={excludeProps}
                />
            </div>
            <div className="overflow-auto xl:max-w-5xl 2xl:max-w-8xl max-w-2xl max-h-144 cursor-pointer">
                <TableMain
                    tableItemsListState={{
                        tableItems: filteredTableItems,
                        setTableItems: setFilteredTableItems,
                    }}
                    tableItemsPure={tableItems}
                    currentPage={currentPage}
                    rowClick={rowClick}
                    excludeProps={excludeProps}
                    rowIndexDescriptor={rowIndexDescriptor}
                />
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {tableItemsInit.length < 1 ? (
                <TableEmpty content={emptyContent} />
            ) : (
                tableExtra
            )}
        </div>
    );
};

export default TableExtra;
