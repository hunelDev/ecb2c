import { FC, FormEventHandler, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { checkForSomeChanged } from '../utils/general';

type ContactInfoAttributes = {
  dataInit: {
    email: string;
    phone: string;
  };
  updateFn: () => void;
};

const ContactInfo: FC<ContactInfoAttributes> = ({ dataInit, updateFn }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdatable, setIsUpdateable] = useState(false);

  useEffect(() => {
    if (dataInit) {
      if (email == '') {
        setPhone(dataInit.phone ?? '');
        setEmail(dataInit.email ?? '');
      }

      setIsUpdateable(
        checkForSomeChanged(
          {
            email,
            phone,
          },
          dataInit
        )
      );
    }
  }, [dataInit, email, phone]);

  const handlerSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isUpdatable) {
      api()
        .patch('/user', {
          email,
          phone,
        })
        .then(({ data }) => {
          if (data) updateFn();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form action="" method="post" onSubmit={handlerSubmit}>
        <div className="my-8">
          <label htmlFor="" className="block text-md mb-2 mx-2">
            Cep Telefonu Numaram
          </label>
          <div className="border-2 border-gray-300 px-4 py-2 rounded-md w-[calc(50%-0.5rem)] flex">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-2 w-full"
            />
          </div>
        </div>
        <div className="my-8">
          <label htmlFor="" className="block text-md mb-2 mx-2">
            Email Adresim
          </label>
          <div className="border-2 border-gray-300 px-4 py-2 rounded-md w-[calc(50%-0.5rem)] flex">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="px-2 w-full"
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

export default ContactInfo;
