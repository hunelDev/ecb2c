import {
  AnimationEventHandler,
  createElement,
  FC,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

type ModelAttribtues = {
  show: boolean;
  relativeFn: (value: boolean) => void;
  containerId?: string;
  heading: string;
};
const Model: FC<ModelAttribtues> = ({
  children,
  show,
  relativeFn,
  containerId = '#portal',
  heading,
}) => {
  const [container, setContainer] = useState<Element | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!container) setContainer(document.querySelector(containerId));
  }, [container, show]);

  const animationEndHandler: AnimationEventHandler<HTMLDivElement> = ({
    animationName,
  }) => {
    if (animationName === 'cey') {
      relativeFn(false);
      setIsClosing(false);
    }
  };

  const model = show && (
    <div className="model">
      <div className="fixed bg-[rgba(43,43,43,0.6)] w-full h-full top-0 left-0"></div>
      <div
        className={`z-100 absolute top-[100px] left-1/2 bg-white font-exo2 min-w-[15rem] animate-fromTopLeftShow${
          isClosing ? ' cey' : ''
        }`}
        onAnimationEnd={animationEndHandler}
      >
        <div role="document">
          <header className="border-b border-b-gray-500 flex p-4 items-center">
            <h1 className="text-xl font-bold mr-auto">{heading}</h1>
            <button
              type="button"
              aria-label="Close"
              className="text-2xl px-2 py-1"
              title="Kapat"
              onClick={() => setIsClosing(true)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </header>
          <div className="py-6 px-4">{children}</div>
        </div>
      </div>
    </div>
  );

  if (show) return container ? ReactDOM.createPortal(model, container) : null;

  return null;
};

export default Model;
