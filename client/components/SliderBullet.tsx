import { BulletComponentType } from '@farbenmeer/react-spring-slider/dist/components/bullet';

const bullet: BulletComponentType = ({ isActive, ...others }) => (
  <button
    className={`px-5 py-1 rounded-full mx-2 ${
      isActive ? 'bg-blue-600' : 'bg-gray-600'
    }`}
    {...others}
  ></button>
);

export default bullet;
