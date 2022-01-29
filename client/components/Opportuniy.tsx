import FC from 'react';
import ListItem from './ListItem';

const Opportunity = () => {
  return (
    <div className="w-4/5">
      <div className="pt-8 pb-4 px-6">
        <h2 className="flex before:grow before:h-[1px] before:bg-gray-400 before:self-end after:grow after:h-[1px] after:bg-gray-400 after:self-end after:ml-12 before:mr-12 text-gray-600 font-bold mb-6 text-2xl font-openSans">
          Bugüne Özel İndirim
        </h2>
      </div>
      <div className="px-6 font-openSans">
        <ul className="grid grid-cols-6 gap-4">
          <ListItem imgSrc="1.webp" content="New World Gold" />
          <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
          <ListItem imgSrc="2.jpeg" content="WOW Gold" />
          <ListItem imgSrc="1.webp" content="Poe Exalted Orb" />
          <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
          <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
          <ListItem imgSrc="1.webp" content="New World Gold" />
          <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
          <ListItem imgSrc="2.jpeg" content="WOW Gold" />
          <ListItem imgSrc="1.webp" content="Poe Exalted Orb" />
          <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
          <ListItem imgSrc="7.jpeg" content="Poe Exalted Orb" />
        </ul>
      </div>
      <div className="w-full h-[1px] bg-gray-400 mt-12"></div>
    </div>
  );
};

export default Opportunity;
