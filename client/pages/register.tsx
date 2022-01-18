import { NextPage } from 'next';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '../utils/general';

const Register: NextPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [process, setProcess] = useState(0);

  useEffect(() => {
    if (ref?.current !== undefined) {
      ref.current?.focus();
    }
  }, [ref]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'lastname':
        setLastname(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
    }
  };

  const sumbitHandle: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (process === 1) return;
    if (name == '' || lastname == '' || email == '' || password == '') return;
    setProcess(1);
    api
      .post('/register', {
        name,
        lastname,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setProcess(0);
      })
      .catch((rej) => {
        console.log(rej);
        setProcess(0);
      });
  };

  return (
    <div>
      <div className="bg-white p-12 shadow mb-8 flex justify-end">
        <div>
          <Link href="/login">
            <a
              className={`${
                router.route === '/login' ? 'bg-indigo-200' : 'bg-white'
              } hover:bg-indigo-100 border border-indigo-400 px-2 py-2 text text-indigo-400 rounded-sm mx-1`}
            >
              Giriş Yap
            </a>
          </Link>
          <Link href="/register">
            <a
              className={`hover:bg-green-200 ${
                router.route === '/register' ? 'bg-green-200' : 'bg-white'
              } duration-300 border border-green-500 px-2 py-2 text text-green-500 rounded-sm mx-1`}
            >
              Kayıt Ol
            </a>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="shadow bg-white px-8 pb-16 pt-16">
          <h2 className="flex before:grow before:h-[1px] before:bg-green-500 before:self-end after:grow after:h-[1px] after:bg-green-500 after:self-end after:ml-6 before:mr-6 text-green-500 font-semibold mb-12 text-lg">
            Kayıt Ol
          </h2>
          <form action="" method="post" onSubmit={sumbitHandle}>
            <div className="grid grid-cols-2 gap-y-0 gap-x-6">
              <div>
                <input
                  type="text"
                  className="py-2.5 px-3 w-72 border border-gray-300 outline-none rounded-md"
                  placeholder="Ad"
                  ref={ref}
                  value={name}
                  name="name"
                  onChange={changeHandler}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="py-2.5 px-3 w-72 border border-gray-300 outline-none rounded-md"
                  placeholder="Soyad"
                  name="lastname"
                  value={lastname}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="my-6">
              <input
                type="text"
                className="py-2.5 px-3 w-full border border-gray-300 outline-none rounded-md"
                placeholder="E-posta"
                name="email"
                value={email}
                onChange={changeHandler}
              />
            </div>
            <div className="my-6">
              <input
                type="password"
                className="py-2.5 px-3 w-full border border-gray-300 outline-none rounded-md"
                placeholder="Şifre"
                name="password"
                value={password}
                onChange={changeHandler}
              />
            </div>
            <div className="my-6">
              <button
                className="w-full py-3.5 bg-green-500 text-white font-semibold disabled:bg-green-200"
                disabled={process === 1}
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
