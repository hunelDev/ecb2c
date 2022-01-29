import { FormEventHandler, useEffect } from 'react';
import { FC, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { checkForSomeChanged, dateFormat } from '../utils/general';

type MembershipInfoAttributes = {
  dataInit: {
    name: string;
    lastname: string;
    birthday: string;
  };
  updateFn: () => void;
};
const MembershipInfo: FC<MembershipInfoAttributes> = ({
  dataInit,
  updateFn,
}) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isUpdatable, setIsUpdateable] = useState(false);

  const dateMax = useMemo(() => {
    return dateFormat(Date.now(), 18);
  }, []);

  useEffect(() => {
    if (dataInit) {
      if (name == '') {
        setName(dataInit.name ?? '');
        setLastname(dataInit.lastname ?? '');
        setBirthday(
          dataInit.birthday ? dateFormat(new Date(dataInit.birthday)) : ''
        );
      }

      setIsUpdateable(
        checkForSomeChanged(
          {
            name,
            lastname,
            birthday: birthday ? new Date(birthday).toISOString() : '',
          },
          dataInit
        )
      );
    }
  }, [dataInit, name, lastname, birthday]);

  const handlerSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isUpdatable) {
      api()
        .patch('/user', {
          name,
          lastname,
          birthday,
        })
        .then(({ data }) => {
          if (data) updateFn();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="my-8">
      <form action="" method="post" onSubmit={handlerSubmit}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-0 lg:gap-4">
          <div className="my-8 lg:my-0">
            <label htmlFor="" className="block text-md mb-2 mx-2">
              Ad
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 rounded-md w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="block text-md mb-2 mx-2">
              Soyad
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 rounded-md w-full"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div className="my-8">
          <label htmlFor="" className="block text-md mb-2 mx-2">
            Doğum tarihi
          </label>
          <div className="border-2 border-gray-300 px-4 py-2 rounded-md lg:w-[calc(50%-0.5rem)] w-full flex">
            <input
              type="date"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              className="px-2 w-full"
              min="1901-01-01"
              max={dateMax}
            />
          </div>
        </div>
        <div className="my-8">
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-300"
            disabled={!isUpdatable}
          >
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default MembershipInfo;
