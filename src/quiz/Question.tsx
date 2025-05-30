import scoreImage from '../assets/points.png';
import { Progress } from 'flowbite-react';
import { BiExit } from 'react-icons/bi';
import { useQuiz } from '../Contexts/QuizContext';
import { decode } from 'he';
import { useState } from 'react';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getTheOptionAlpha(index: number): string {
  return ['A', 'B', 'C', 'D'][index] ?? 'O';
}

export default function Question() {
  // const [selected, setSelected] = useState('');
  const [selected, setSelected] = useState<number | null>(null); 
  const { currentNumber, questions } = useQuiz();

  const options = [
    questions[currentNumber!].correct_answer,
    ...questions[currentNumber!].incorrect_answers,
  ];
  const shuffledOptions = shuffleArray(options);

  console.log(selected); 

  // console.log(`before shuffle: ${options}`);
  // console.log(`after shuffle: ${shuffledOptions}`);

  // console.log(questions[currentNumber!].question);

  return (
    <div className="w-full h-full font-main">
      {/* top menu: total points, quiz name + id and exit button */}
      <div className="w-full py-2 flex items-center justify-between mb-4 md:mb-36">
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
      <div className="md:hidden w-full py-2 mx-auto flex items-center justify-center mb-4 sm:mb-8">
        <div className="w-full">
          <Progress
            progress={currentNumber === null ? 10 : currentNumber + 1 * 10}
            className="[&>div]:!bg-cgreen [&>div]:!h-3 bg-soft h-3"
          />
        </div>
        <div className="w-1/6 flex items-center justify-center">
          <span className="text-tsecondary">
            {currentNumber === null ? 0 : currentNumber}/{questions.length}
          </span>
        </div>
      </div>

      {/* questions box */}
      <div className="w-full border border-black md:max-w-3xl mx-auto flex flex-col gap-20 justify-center items-center">
        {/* questions */}
        <h2 className="text-center text-dblue text-2xl font-semibold">
          {decode(questions[currentNumber!].question)}
        </h2>
        {/* options box */}
        <div className="flex flex-col gap-4 items-center justify-center overflow-hidden md:overflow-visible py-2 w-full md:max-w-xl border border-black">
          {/* button */}
          {shuffledOptions.map((option, index) => (
            <button key={index} onClick={() => setSelected(index)} className={`cursor-pointer w-full rounded-md bg-soft flex justify-start items-center gap-4 py-3 px-2 group hover:shadow-lg hover:outline-2 hover:outline-dblue hover:bg-bgall hover:translate-x-4 transition duration-300 ease-in-out `}>
              <div className="rounded-full p-2 size-10 flex items-center justify-center bg-bgall shrink-0">
                <span className="font-semibold text-cblack group-hover:font-bold group-hover:text-dblue">
                  {getTheOptionAlpha(index)}
                </span>
              </div>
              <span className="text-cblack font-semibold text-lg text-start group-hover:text-dblue group-hover:font-bold">
                {decode(option)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
