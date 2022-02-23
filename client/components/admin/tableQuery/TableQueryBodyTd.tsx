import { FC } from 'react';

type TableBodyTdProps = {
    listRowProps: string | number | null;
};

const TableBodyTd: FC<TableBodyTdProps> = ({ listRowProps }) => {
    if (listRowProps == null || listRowProps!.toString().length <= 40)
        return <td className="py-2 px-4 whitespace-nowrap">{listRowProps}</td>;

    return (
        <td className="py-2 px-4 whitespace-nowrap">{`${listRowProps
            ?.toString()
            .slice(0, 41)}...`}</td>
    );
};

export default TableBodyTd;
