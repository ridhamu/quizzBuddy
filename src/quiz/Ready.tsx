import GreenMedal from '../assets/medal.png';
import { useQuiz } from '../Contexts/QuizContext';
export default function Ready() {
  const { questions, dispatch } = useQuiz();

  function handleStartQuiz() {
    // do any other things here
    dispatch({type: "questions/started"}); 
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <img src={GreenMedal} alt="GreenMedal" className="size-32 md:size-48" />
      <h1 className="text-center text-3xl md:text-4xl font-semibold text-dblue">
        Total questions: {questions.length}
      </h1>
      <button
        onClick={handleStartQuiz}
        className="text-center font-main text-dblue text-2xl md:text-3xl font-normal outline-2 outline-dblue py-2 px-8 rounded-lg hover:cursor-pointer hover:text-bgall hover:outline-transparent hover:bg-dblue hover:shadow-xl animate-pulse hover:animate-none"
      >
        Take Your Quiz
      </button>
    </div>
  );
}
