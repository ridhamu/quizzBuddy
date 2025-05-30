import { useQuiz } from '../Contexts/QuizContext';
import ErrorQuiz from './ErrorQuiz';
import Loading from './Loading';
import Question from './Question';
import Ready from './Ready';
import Result from './Result';

export default function Quiz() {
  const { status } = useQuiz();
  return (
    // here is the layout for all quizz thinggy
    <div className="w-full h-dvh bg-bgall overflow-y-auto">
      {status === 'loading' && <Loading />}
      {status === 'ready' && <Ready />}
      {status === 'active' && <Question />}
      {status === 'finish' && <Result />}
      {status === 'error' && <ErrorQuiz />}
    </div>
  );
}
