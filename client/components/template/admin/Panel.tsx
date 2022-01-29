import { FC } from 'react';

const Panel: FC = ({ children }) => {
  return (
    <div className="flex w-full">
      <nav className="bg-[#0071bc] w-56 min-h-screen shrink-0"></nav>
      <div className="w-full">
        <header className="px-2 py-8 bg-white mb-4 shadow"></header>
        <main className="bg-white min-h-[30rem] p-4 my-4 shadow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Panel;
