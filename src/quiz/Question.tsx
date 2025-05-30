import scoreImage from '../assets/points.png';
import { Progress } from 'flowbite-react';
import { BiExit } from 'react-icons/bi';
import { useQuiz } from '../Contexts/QuizContext';
import { decode } from 'he';
import { useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { Link } from 'react-router';
import { useTimer } from '../hooks/useTimer';

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
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const { currentNumber, questions, dispatch, totalCorrect } = useQuiz();
  const { timeLeft } = useTimer(
    status === 'active',
    () => dispatch({ type: 'questions/finish' }),
    300 // 5 menit
  );

  // debuggg
  // console.log(
  //   `current number:  ${currentNumber}\n n-1: ${
  //     questions.length - 1
  //   }\n is it same: ${currentNumber === questions.length - 1}`
  // );

  const options = useMemo(() => {
    const opts = [
      questions[currentNumber!].correct_answer,
      ...questions[currentNumber!].incorrect_answers,
    ];
    return shuffleArray(opts);
  }, [currentNumber, questions]);

  // select first and then answe
  // answer trigger when there is a selected option
  // after selected options button become disabled and button select become next

  function handleSelect(value: string) {
    if (selected === null || selected !== value) {
      setSelected(value);
      // console.log(`${value} selected`);
    } else if (selected === value) {
      setSelected(null);
      // console.log(`unselect ${value}`);
    }
  }

  // function handle answer questions
  function handleAnswer() {
    setIsAnswered(true);
    // alert(questions[currentNumber!].correct_answer === selected ? 'Benar' : 'salah');
    // console.log(`correct_answer: ${questions[currentNumber!].correct_answer}\nselected: ${selected}\nresult: ${questions[currentNumber!].correct_answer === selected ? "benar" : 'salah'}`);

    dispatch({
      type: 'questions/answered',
      payload: {
        isRight: questions[currentNumber!].correct_answer === selected,
      },
    });
  }

  function handleNext() {
    setSelected(null);
    setIsAnswered(false);
    dispatch({ type: 'questions/next' });
  }

  function handleFinish() {
    //clean up local state
    setIsAnswered(false);
    setSelected(null);

    //dispatch here
    dispatch({ type: 'questions/finish' });
  }

  // console.log(questions[currentNumber!].question);

  return (
    <div className="min-h-full flex flex-col items-center justify-between font-main">
      {/* top menu: total points, quiz name + id and exit button */}
      <div className="w-full px-4 md:px-8 flex items-center justify-between  py-6 md:py-8">
        {/* total points */}
        <div className="bg-white px-2 py-1 flex items-center justify-between rounded-lg gap-2">
          <img
            src={scoreImage}
            alt="score image"
            className="size-6 md:size-8"
          />
          <span className="text-dblue md:text-lg">
            {(totalCorrect / questions.length) * 100}
          </span>
        </div>

        {/* quiz name */}
        <div className=" flex justify-center items-center">
          <h1 className="text-xl md:text-3xl text-black font-semibold capitalize line-clamp-2">
            Fantasy Quiz <span className="underline">#156</span>
          </h1>
        </div>

        {/* exit button */}
        <Link
          to="/"
          className="bg-white flex items-center justify-center rounded-full p-2 hover:shadow-lg transition ease-in-out cursor-pointer"
        >
          <BiExit className="text-dblue size-5 md:size-8" />
        </Link>
      </div>


      {/* progres bar mobile */}
      <div className="md:hidden w-full py-2 mx-auto flex items-center justify-center ">
        <div className="w-full">
          <Progress
            progress={(currentNumber! + 1) * 10}
            className="[&>div]:!bg-cgreen [&>div]:!h-3 bg-soft h-3"
          />
        </div>
        <div className="w-1/6 flex items-center justify-center">
          <span className="text-tsecondary">
            {currentNumber! + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* timer */}
      <div className="bg-white px-4 py-1 rounded-lg text-dblue text-md font-semibold">
        ⏳ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>

      {/* questions box */}
      <div className="w-full  md:max-w-3xl mx-auto flex flex-col gap-20 justify-center items-center">
        {/* questions */}
        <h2 className="text-center text-dblue text-2xl font-semibold">
          {decode(questions[currentNumber!].question)}
        </h2>
        {/* options box */}
        <div className="flex flex-col gap-4 items-center justify-center overflow-hidden md:overflow-visible py-2 w-full md:max-w-xl ">
          {/* button */}
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={isAnswered}
              className={`cursor-pointer w-full rounded-md flex justify-start items-center gap-4 py-3 px-2 
                ${
                  isAnswered
                    ? questions[currentNumber!].correct_answer === option
                      ? `${
                          selected === option ? 'translate-x-4' : ''
                        } bg-cgreen text-bgall`
                      : `${
                          selected === option ? 'translate-x-4' : ''
                        } text-bgall bg-cred2`
                    : selected === option
                    ? 'bg-bgall translate-x-4 outline-2 outline-dblue text-dblue font-bold'
                    : 'bg-soft hover:shadow-lg hover:outline-2 hover:outline-dblue hover:bg-bgall hover:translate-x-4 hover:text-dblue hover:font-bold transition duration-300 ease-in-out active:animate-pulse'
                }
                `}
            >
              <div className="rounded-full p-2 size-10 flex items-center justify-center bg-bgall shrink-0">
                {isAnswered ? (
                  option === questions[currentNumber!].correct_answer ? (
                    <FaCheck className="size-4 text-cgreen2" />
                  ) : (
                    <FaTimes className="size-4 text-cred" />
                  )
                ) : (
                  <span className="">{`${getTheOptionAlpha(index)}.`}</span>
                )}
              </div>
              <span className="text-lg text-start">{decode(option)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* button for answer and progress bar lg */}
      <div className="w-full min-h-16 bg-soft  p-4">
        {/* box */}
        <div className="mx-auto flex justify-center md:justify-between md:gap-4 lg:gap-12 items-center w-full md:max-w-4xl py-4">
          {/* progress bar here */}
          <div className="hidden w-1/2 py-2 mx-auto md:flex items-center justify-center ">
            <div className="w-full">
              <Progress
                progress={(currentNumber! + 1) * 10}
                className="[&>div]:!bg-cgreen [&>div]:!h-3 bg-bgall h-3 transition duration-300"
              />
            </div>
            <div className="w-1/6 flex items-center justify-center">
              <span className="text-tsecondary">
                {currentNumber! + 1}/{questions.length}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            {/* for answer */}
            {!isAnswered && (
              <button
                disabled={selected === null}
                onClick={handleAnswer}
                className={`bg-btnDefault text-bgall font-normal sm:text-xl text-lg capitalize text-center py-2 px-8 h-16 w-full rounded-lg transition duration-200 ease-in-out ${
                  selected !== null
                    ? 'hover:shadow-lg hover:-translate-y-2 hover:font-bold hover:bg-tsecondary cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                Answer
              </button>
            )}

            {/* for next */}
            {isAnswered && currentNumber !== questions.length - 1 && (
              <button
                onClick={handleNext}
                className={`bg-btnDefault flex gap-4 items-center justify-center text-bgall font-normal sm:text-xl text-lg capitalize text-center py-2 px-8 h-16 w-full rounded-lg transition duration-200 ease-in-out ${
                  isAnswered
                    ? 'hover:shadow-lg hover:-translate-y-2 hover:font-bold hover:bg-cgreen cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                <span>Next</span>
                <MdOutlineNavigateNext className="size-6 md:size-8" />
              </button>
            )}

            {/* for finish */}
            {isAnswered && currentNumber === questions.length - 1 && (
              <button
                onClick={handleFinish}
                className={`bg-btnDefault flex gap-4 items-center justify-center text-bgall font-normal sm:text-xl text-lg capitalize text-center py-2 px-8 h-16 w-full rounded-lg transition duration-200 ease-in-out ${
                  isAnswered
                    ? 'hover:shadow-lg hover:-translate-y-2 hover:font-bold hover:bg-cgreen cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                <span>Finish</span>
                <MdOutlineNavigateNext className="size-6 md:size-8" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
