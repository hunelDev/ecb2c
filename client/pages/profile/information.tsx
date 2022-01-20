import { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GeneralContext } from '../../components/GeneralContext';
import Model from '../../components/Model';
import ProfileLayout from '../../components/template/ProfileLayout';
import { citiesDistricts } from '../../utils/citiesDistricts';

const Information: NextPage = () => {
  const context = useContext<any>(GeneralContext);
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const cities = citiesDistricts.map((city) => (
    <option value={city.plaka} key={city.il} className="">
      {city.il}
    </option>
  ));

  const districts = useMemo(() => {
    if (city != '' || city != null) {
      return citiesDistricts[1].ilceleri.map((district) => (
        <option value={district} key={district}>
          {district}
        </option>
      ));
    }

    return null;
  }, [city]);

  //   useEffect(() => {
  //     citiesDistricts[city - 1].ilceleri;
  //   }, [city]);
  return (
    <>
      <Head>
        <title>Hunel Game - Profile</title>
      </Head>
      <ProfileLayout>
        <div className="h-full">
          <Model>
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
                  >
                    <option value="">İlçe seçiniz</option>
                    {districts}
                  </select>
                </div>
              </div>
            </form>
          </Model>
        </div>
      </ProfileLayout>
    </>
  );
};

export default Information;
