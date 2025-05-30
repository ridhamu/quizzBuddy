import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from 'react';

// available status: loading, ready, active, finish, erro
type StatusQuiz = 'loading' | 'ready' | 'active' | 'finish' | 'error';
// availabel questions type and difficulty
type QuestionType = 'multiple' | 'boolean';
type Difficulty = 'easy' | 'medium' | 'hard';

// type for quiz action
type QuizAction =
  | { type: 'questions/loaded'; payload: { questions: QuizQuestion[] } }
  | { type: 'questions/started' }
  | { type: 'questions/answered'; payload: { isRight: boolean } }
  | { type: 'questions/next' }
  | { type: 'questions/finish' }
  | { type: 'questions/end' }
  | { type: 'error'; payload: { errorMessage: string } };

// this is for side effect purpose
export interface OpenTDBResponse {
  response_code: number;
  results: QuizQuestion[];
}

// interface type for questions as per-one object of it (to see what it consist of)
export interface QuizQuestion {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// interface for state quiz type
interface QuizStateTypes {
  status: StatusQuiz;
  questions: QuizQuestion[];
  currentNumber: number | null;
  totalCorrect: number;
  errorMessage: string;
}

// interface types for the context props to to pass down to the child element
interface QuizContextPropsTypes extends QuizStateTypes {
  dispatch: (action: QuizAction) => void;
}

const initialState: QuizStateTypes = {
  // available status: loading, ready, active, finish, error
  status: 'loading',
  questions: [],
  currentNumber: null,
  totalCorrect: 0,
  errorMessage: '',
};

const QuizContext = createContext<QuizContextPropsTypes | undefined>(undefined);

function reducer(state: QuizStateTypes, action: QuizAction): QuizStateTypes {
  switch (action.type) {
    case 'questions/loaded':
      return { ...state, questions: action.payload.questions, status: 'ready' };
    case 'questions/started':
      return { ...state, status: 'active', currentNumber: 0 };
    case 'questions/answered':
      return {
        ...state,
        totalCorrect: action.payload.isRight
          ? state.totalCorrect + 1
          : state.totalCorrect,
      };
    case 'questions/next':
      return {
        ...state,
        currentNumber:
          state.currentNumber === null ? 0 : state.currentNumber + 1,
      };
    case 'questions/finish':
      return { ...state, status: 'finish', currentNumber: null };
    case 'questions/end':
      return initialState;
    case 'error':
      return { ...state, errorMessage: action.payload.errorMessage };
    default:
      throw new Error('Unknown actions types');
  }
}

// api url
const API_URL = 'https://opentdb.com/api.php?amount=10';

export function QuizProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch TDBResponse
  // only use builtin useeffect, because no need to refect, simple enough lah
  useEffect(() => {
    async function fetchTDBAPI() {
      try {
        // fetch the data
        const { data } = await axios.get<OpenTDBResponse>(API_URL);

        // check the response code from OpenTDB then do dispatch accordingly
        if (data.response_code === 0) {
          dispatch({
            type: 'questions/loaded',
            payload: { questions: data.results },
          });
        } else if (data.response_code === 1) {
          dispatch({
            type: 'error',
            payload: {
              errorMessage:
                "Sorry, there aren't enough questions available for your selected category or settings.",
            },
          });
        } else if (data.response_code === 2) {
          dispatch({
            type: 'error',
            payload: {
              errorMessage:
                'Something went wrong with the quiz setup. Please try again with different settings.',
            },
          });
        } else if (data.response_code === 3) {
          dispatch({
            type: 'error',
            payload: {
              errorMessage:
                'Session expired or not found. Please refresh the page to start a new quiz.',
            },
          });
        } else if (data.response_code === 4) {
          dispatch({
            type: 'error',
            payload: {
              errorMessage:
                "You've completed all available questions for this quiz. Please try a different category or reset your session.",
            },
          });
        } else if (data.response_code === 5) {
          // "You're going too fast! Please wait a few seconds and try again."
          dispatch({
            type: 'error',
            payload: {
              errorMessage:
                "You're going too fast! Please wait a few seconds and try again.",
            },
          });
        }
      } catch (error) {
        dispatch({
          type: 'error',
          payload: {
            errorMessage:
              error instanceof Error
                ? error.message
                : 'An unknown error occurred.',
          },
        });
      }
    }

    if (API_URL) {
      // call the fetching function here
      fetchTDBAPI();
    } // here also can create multiple fetch function based on user preference,
    // e.g number of questions, etc
  }, [dispatch]);

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

// custom hook useQuiz()
export function useQuiz() {
  const provider = useContext(QuizContext);
  if (!provider) {
    throw new Error('Quizzes Provider use outside the quizcontext');
  }

  return provider;
}
