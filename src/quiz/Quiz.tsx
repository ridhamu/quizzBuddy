import { useQuiz } from '../Contexts/QuizContext';
import ErrorQuiz from './ErrorQuiz';
import Loading from './Loading';
import Question from './Question';
import Ready from './Ready';

export default function Quiz() {
  const { status } = useQuiz();
  return (
    // here is the layout for all quizz thinggy
    <div className="w-full min-h-dvh bg-bgall flex items-center justify-center px-2 py-12 sm:px-4 md:px-6 overflow-y-auto">
      {status === 'loading' && <Loading />}
      {status === 'ready' && <Ready />}
      {status === 'active' && <Question />}
      {status === 'finish' && (
        <p className="text-white">This is Finish State</p>
      )}
      {status === 'error' && <ErrorQuiz />}
    </div>
  );
}
