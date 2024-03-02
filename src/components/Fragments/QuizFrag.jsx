import { Button } from "flowbite-react";

const QuizFrag = () => {
  const data = [
    {
      id: 1,
      value: "A",
    },
    {
      id: 2,
      value: "B",
    },
    {
      id: 3,
      value: "C",
    },
    {
      id: 4,
      value: "D",
    },
    {
      id: 5,
      value: "E",
    },
    {
      id: 6,
      value: "F",
    },
  ];
  return (
    <>
      <div className="m-10 grid grid-cols-4 gap-4">
        <div className=" border">
          <div className="flex flex-col ">
            <div className="flex justify-center my-5">
              <h2 className="text-xl">Soal 1</h2>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {data.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <Button>{item.value}</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 border">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
            blanditiis doloribus quasi reiciendis dignissimos nostrum nisi
            consectetur asperiores incidunt aut provident explicabo perspiciatis
            quo, odit alias. Dolor veniam quis ut.
          </p>
        </div>
      </div>
    </>
  );
};

export default QuizFrag;
