import { FaFireFlameCurved } from 'react-icons/fa6';
import ResultImage from '../assets/result.png';
import { FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useQuiz } from '../Contexts/QuizContext';

export default function Result() {
  const { dispatch, totalCorrect, questions } = useQuiz();
  const navigate = useNavigate();

  function handleEnd() {
    // dispatch here
    dispatch({ type: 'questions/end' });

    // then redirect here
    navigate('/');
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-between pt-12 md:pt-24">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {/* image */}
        <div className="">
          <img
            src={ResultImage}
            alt="result image"
            className="object-cover size-32 md:size-48"
          />
        </div>

        {/* caption */}
        <div className="w-full  flex items-center justify-center max-w-xl overflow-hidden">
          <h2 className="text-xl md:text-3xl text-black font-semibold capitalize line-clamp-2">
            Result of Fantasy Quiz <span className="underline">#156</span>
          </h2>
        </div>

        {/* summary */}
        <div className="w-full  max-w-lg flex flex-col p-2 gap-0.5 items-center justify-center">
          <div className="w-full bg-soft rounded-t-xl flex justify-between items-center p-4">
            {/* icon and label */}
            <div className=" flex items-center gap-8">
              <div className="rounded-full p-2 size-10 flex items-center justify-center bg-bgall shrink-0">
                <FaFireFlameCurved className="size-10 text-cgreen2" />
              </div>
              <span className="uppercase font-semibold text-xl">
                Your Score
              </span>
            </div>
            {/* score */}
            <span className="font-semibold text-xl">
              {(totalCorrect / questions.length) * 100}
            </span>
          </div>
          <div className="w-full bg-soft rounded-b-xl flex justify-between items-center p-4">
            {/* icon and label */}
            <div className=" flex items-center gap-8">
              <div className="rounded-full p-2 size-10 flex items-center justify-center bg-bgall shrink-0">
                <FaCheck className="size-10 text-cgreen2" />
              </div>
              <span className="uppercase font-semibold text-xl">
                Total Correct Number
              </span>
            </div>
            {/* score */}
            <span className="font-semibold text-xl">{totalCorrect}</span>
          </div>
        </div>
      </div>

      {/* okay button */}
      <div className="w-full  p-2 max-w-lg">
        <button
          onClick={handleEnd}
          className={`bg-btnDefault text-bgall font-normal sm:text-xl text-lg capitalize text-center py-2 px-8 h-16 w-full rounded-lg transition duration-200 ease-in-out hover:shadow-lg hover:-translate-y-2 hover:font-bold hover:bg-cgreen cursor-pointer`}
        >
          OK!
        </button>
      </div>
    </div>
  );
}
