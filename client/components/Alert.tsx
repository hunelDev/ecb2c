import {
  AnimationEventHandler,
  createElement,
  FC,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

type AlertAttributes = {
  show: boolean;
  relativeFn: (value: boolean) => void;
  containerId?: string;
  duration?: string;
  timer?: boolean;
};
const Alert: FC<AlertAttributes> = ({
  children,
  show,
  relativeFn,
  containerId = '#portal',
  duration = '1s',
  timer = true,
}) => {
  const [container, setContainer] = useState<Element | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!container) setContainer(document.querySelector(containerId));
  }, [container, show]);

  const animationEndHandler: AnimationEventHandler<HTMLDivElement> = ({
    animationName,
    currentTarget,
  }) => {
    switch (animationName) {
      case 'fromTopHide':
        relativeFn(false);
        setIsClosing(false);
        break;
      case 'fromTopShow':
        if (timer) {
          //currentTarget.style.animationDelay = duration;
          currentTarget.classList.add('duration-counter');
        }
        break;
      case 'durationCounter':
        currentTarget.classList.toggle('duration-counter');
        currentTarget.classList.add('from-top-hide');
        break;
    }
  };

  const model = show && (
    <div className="alert w-full" role="alert">
      <div
        className={`z-200 absolute bg-red-200 font-exo2 w-full left-0 min-h-[4rem] top-0 border-t border-b border-red-300  from-top-show`}
        onAnimationEnd={animationEndHandler}
      >
        <div className="flex px-2">
          <div className="py-6 px-4 text-red-500 mr-auto" role="alertdialog">
            {children}
          </div>
          <button
            type="button"
            aria-label="Close"
            className="text-3xl mr-5 text-red-700"
            title="Kapat"
            onClick={(e) => {
              const { parentElement } = e.currentTarget.parentElement!;
              parentElement!.classList.add('from-top-hide');
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (show) return container ? ReactDOM.createPortal(model, container) : null;

  return null;
};

export default Alert;
