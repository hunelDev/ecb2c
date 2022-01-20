import { FC, useMemo, useState } from 'react';
import { citiesDistricts } from '../utils/citiesDistricts';

const ProfileAddress: FC = () => {
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const cities = citiesDistricts.map((city) => (
    <option value={city.plaka} key={city.il} className="">
      {city.il}
    </option>
  ));

  const districts = useMemo(() => {
    if (!!city) {
      return citiesDistricts[+city - 1].ilceleri.map((district) => (
        <option value={district} key={district}>
          {district}
        </option>
      ));
    }

    return null;
  }, [city]);

  return (
    <div>
      <form action="" method="post">
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <input
              type="text"
              className="border border-gray-300 p-1"
              placeholder="Ad"
            />
          </div>
          <div>
            <input
              type="text"
              className="border border-gray-300 p-1 w-full"
              placeholder="Soyad"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <select
              name=""
              className="border border-gray-300 p-1 w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">İl seçiniz</option>
              {cities}
            </select>
          </div>
          <div>
            <select
              name=""
              className="border border-gray-300 p-1 w-full"
              disabled={city == '' || !city}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">İlçe seçiniz</option>
              {districts}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileAddress;
