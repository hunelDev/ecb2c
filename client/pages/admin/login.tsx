import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { api } from '../../utils/api';
import { checkToken } from '../../utils/general';

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [process, setProcess] = useState(0);

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (process === 1) return;
    if (email == '' || password == '') return;

    setProcess(1);
    await api()
      .post('/admin/login', {
        email,
        password,
      })
      .then(({ data }) => {
        setProcess(0);
        if (data.admin) {
          router.push('/admin');
        }
      })
      .catch(() => setProcess(0));
  };

  return (
    <div>
      <div className="bg-white p-12 shadow mb-8 flex">
        <div>
          <Link href="/">HOME</Link>
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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//   const guess = await checkToken(req, false);

//   if (!guess)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };

//   return {
//     props: {},
//   };
// };

export default Login;
