import { Card, Label, Select } from "flowbite-react";
import logo from "../../assets/logo-unhan.png";
const ProctorFragment = () => {
  return (
    <>
      <div className="m-10 ">
        <div className="max-w-md m-5">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Pilih Grup    " />
          </div>
          <Select id="countries" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <Card href="#" className="max-w-xs">
          <img src={logo} className="h-[150px] w-auto object-contain" />
          <img src={logo} alt="" className="h-[150px] w-auto object-contain" />
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rahmatul Fajri
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            WA : 082170533541
          </p>
        </Card>
      </div>
    </>
  );
};
export default ProctorFragment;
