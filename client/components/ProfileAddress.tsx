import { FC, FormEventHandler, useMemo, useState } from 'react';
import { citiesDistricts } from '../utils/citiesDistricts';
import { countries } from '../utils/countries';
import { api } from '../utils/api';
import { useRouter } from 'next/router';

const ProfileAddress: FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [country, setCountry] = useState('Türkiye');
  const [address, setAddress] = useState('');
  const [areaCode, setAreaCode] = useState('90');
  const [phone, setPhone] = useState('');

  const countryList = useMemo(() => {
    return countries.map((c) => (
      <option value={c} key={c}>
        {c}
      </option>
    ));
  }, []);

  const cities = useMemo(() => {
    if (country !== 'Türkiye' || !country) return null;

    return citiesDistricts.map((city) => (
      <option value={city.plaka} key={city.il}>
        {city.il}
      </option>
    ));
  }, [country]);

  const districts = useMemo(() => {
    if (!city) return null;

    return citiesDistricts[+city - 1].ilceleri.map((district) => (
      <option value={district} key={district}>
        {district}
      </option>
    ));
  }, [city]);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    api()
      .post('/create-address', {
        name,
        lastname,
        areaCode,
        phone,
        country,
        city: citiesDistricts[+city - 1].il,
        district,
        address,
      })
      .then(({ data }) => {
        //if (!data.user) router.push('/login');
        console.log(data);
      });
  };

  return (
    <div>
      <form action="" method="post" onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="col-span-1">
            <input
              type="text"
              className="border border-gray-300 p-1 w-full"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="border border-gray-300 p-1 w-full"
              placeholder="Soyad"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="relative mb-8">
          <label htmlFor="phone" className="text-sm">
            Telefon
          </label>
          <div className="grid grid-cols-4 gap-4 mt-1">
            <div className="">
              <input
                className=" p-1 w-full border border-gray-300"
                placeholder="90"
                type="number"
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                className="p-1 w-full col-span-3 border border-gray-300"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="my-8">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-gray-300 p-1 w-full"
          >
            {countryList}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 my-8">
          <div>
            <select
              name=""
              className="border border-gray-300 p-1 w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={country !== 'Türkiye' || !country}
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
        <div className="my-8">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            cols={10}
            className="border border-gray-300 p-1 w-full"
            placeholder="Adres"
          />
        </div>
        <div className="w-full flex justify-end">
          <button className="bg-blue-500 px-4 py-2 rounded-sm text-white">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAddress;
