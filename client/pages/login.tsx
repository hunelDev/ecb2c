import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useContext, useState } from 'react';
import { GeneralContext } from '../components/GeneralContext';
import { api } from '../utils/general';

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [process, setProcess] = useState<number>(0);
  const context = useContext<any>(GeneralContext);

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (process === 1) return;
    if (email == '' || password == '') return;

    setProcess(1);
    await api
      .post('/login', {
        email,
        password,
      })
      .then((res) => {
        setProcess(0);
        context.setUser(res.data.user.name);
        router.back();
      })
      .catch(() => setProcess(0));
  };

  return (
    <div>
      <div className="bg-white p-12 shadow mb-8 flex">
        <div className="mr-auto">
          <Link href="/">HOME</Link>
        </div>
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
      <div className="flex justify-center font-openSans">
        <div className="p-12 bg-white border-gray-300 border">
          <form action="" method="post" onSubmit={submitHandler}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="border border-gray-300 bg-gray-50 w-64 py-2 px-2"
                placeholder="Email Adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                className="border border-gray-300 bg-gray-50 w-64 py-2 px-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className="px-4 py-3 bg-indigo-500 text-white text-sm font-semibold w-full disabled:bg-indigo-200"
                disabled={process === 1}
              >
                Giriş
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
