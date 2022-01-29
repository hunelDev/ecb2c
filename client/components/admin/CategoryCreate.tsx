import { FC, useEffect, useState } from 'react';
import Model from '../Model';

type CategoryCreateAttributes = {
  show: boolean;
  relativeFn: (value: boolean) => void;
};

const CategoryCreate: FC<CategoryCreateAttributes> = ({
  show = false,
  relativeFn,
}) => {
  return (
    <div>
      <Model show={show} relativeFn={relativeFn} heading="Yeni Kategori Ekle">
        <div></div>
      </Model>
    </div>
  );
};

export default CategoryCreate;
