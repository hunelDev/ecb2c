import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Model: FC = ({ children }) => {
  const [container, setContainer] = useState<Element | null>(null);
  useEffect(() => {
    setContainer(document.querySelector('#portal'));
  }, [container]);
  const model = (
    <div>
      <div className="fixed bg-[rgba(43,43,43,0.6)] w-full h-full top-0 left-0"></div>
      <div className="z-100 absolute top-[100px] left-1/2 bg-white font-exo2 min-w-[15rem] animate-fromTopShow">
        <div role="document">
          <header className="border-b border-b-gray-500 flex p-4">
            <h1 className="text-xl font-bold mr-auto">Adres Ekle</h1>
            <button
              type="button"
              aria-label="Close"
              className="text-2xl"
              title="Kapat"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </header>
          <div className="py-6 px-4">{children}</div>
        </div>
      </div>
    </div>
  );

  return container ? ReactDOM.createPortal(model, container) : null;
};

export default Model;
