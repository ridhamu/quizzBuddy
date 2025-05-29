import scoreImage from '../assets/points.png';
import { BiExit } from 'react-icons/bi';
import { Progress } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function Quiz() {
  // https://opentdb.com/api.php?amount=10
  const [questions, setQuestions] = useState([]); 

  useEffect(() => {
    async function fetchQuestions() {
      const response = await axios.get("https://opentdb.com/api.php?amount=10"); 
      if(!response.ok) {
        return; 
      }
      const data = await response.js
    }

    fetchQuestions(); 
  }); 

  return (
    <div className="w-full h-dvh bg-clip-content bg-red-200 px-2 sm:px-4 md:px-6 py-4 font-main">
      {/* top menu: total points, quiz name + id and exit button */}
      <div className="border border-black w-full py-2 flex items-center justify-between mb-4">
        {/* total points */}
        <div className="bg-white px-2 py-1 flex items-center justify-between rounded-lg gap-2 shrink-0">
          <img src={scoreImage} alt="score image" className="size-6" />
          <span className="text-dblue">100</span>
        </div>

        {/* quiz name */}
        <div className="w-1/3 lg:w-1/2 flex justify-center items-center">
          <h1 className="text-xl text-black font-semibold capitalize line-clamp-2">
            Fantasy Quiz <span className="underline">#156</span>
          </h1>
        </div>

        {/* exit button */}
        <button className="bg-white flex items-center justify-center rounded-full p-2 hover:shadow-lg transition ease-in-out">
          <BiExit className="text-dblue size-5" />
        </button>
      </div>

      {/* progres bar mobile */}
      <div className="md:hidden w-full py-2 mx-auto flex items-center justify-center mb-4">
        <div className="w-full">
          <Progress
            progress={50}
            className="[&>div]:!bg-cgreen [&>div]:!h-3 bg-soft h-3"
          />
        </div>
        <div className="w-1/6 flex items-center justify-center">
          <span className="text-tsecondary">5/10</span>
        </div>
      </div>

      {/* questions box */}
      <div className="w-full border border-black">
        {/* questions */}
        <h2 className="text-center text-dblue text-2xl font-semibold mb-4 border border-red-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
          blanditiis beatae ullam maxime vero excepturi modi praesentium unde
          rerum adipisci numquam in a ipsam dolorum similique, ipsa asperiores
          enim aperiam.
        </h2>
        {/* options box */}
        <div className="border border-red-500 flex-col gap-4 items-center justify-start overflow-hidden py-2">
          {/* button */}
          <button className="w-full rounded-md bg-soft flex justify-start items-center gap-4 py-3 px-2 group hover:shadow-lg hover:outline-2 hover:outline-dblue hover:bg-bgall hover:translate-x-4 transition duration-300 ease-in-out">
            <div className="rounded-full p-2 size-10 flex items-center justify-center bg-bgall shrink-0">
              <span className="font-semibold text-cblack group-hover:font-bold group-hover:text-dblue">A</span>
            </div>
            <span className='text-cblack font-semibold text-lg text-start group-hover:text-dblue group-hover:font-bold'>Options 1</span>
          </button>
        </div>
      </div>
    </div>
  );
}
