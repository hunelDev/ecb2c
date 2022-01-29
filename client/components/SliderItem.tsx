import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { UrlObject } from 'url';

type Url = string | UrlObject;

type SliderItemAttributes = {
  ImageSrc: string;
  LinkHref: Url;
};

const SliderItem: FC<SliderItemAttributes> = ({ ImageSrc, LinkHref }) => (
  <div>
    <Link href={LinkHref}>
      <a>
        <div className="h-[26rem] relative" draggable={false}>
          <Image
            src={ImageSrc}
            layout="fill"
            draggable={false}
            loading="lazy"
            placeholder="empty"
          />
        </div>
      </a>
    </Link>
  </div>
);

export default SliderItem;
