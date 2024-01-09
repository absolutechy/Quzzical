import { useState, useEffect } from 'react';
import Questions from './components/Questions.jsx';
import StartingPage from './components/StartingPage.jsx';
import './App.css';

function App() {
  const [game, setGame] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [start, setStart] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    if (start) {
      fetch(
        'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
      )
        .then((res) => res.json())
        .then((data) => {
          setQuiz(data.results);
          setCorrectAnswers(data.results.map((item) => item.correct_answer));
        });
      setStart(false);
    }
  }, [start]);

  const startQuiz = () => {
    setStart(true);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers,
      selectedOption,
    ]);
  };

  const quizArray =
    quiz &&
    quiz.map((item) => {
      const optionsArray = [...item.incorrect_answers, item.correct_answer];
      return (
        <Questions
          key={item.question}
          question={item.question}
          options={optionsArray}
          correctAnswer={item.correct_answer}
          handleOptionChange={handleOptionChange}
          checkAnswer={game}
        />
      );
    });

  const points = () => {
    const numCorrect = selectedAnswers.filter((answer) =>
      correctAnswers.includes(answer)
    ).length;
    return numCorrect;
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (!game) {
      setGame(true);
    } else {
      setGame(false);
      location.reload();
    }
  };

  return (
    <div className="quiz-container">
      <div className="top-blob">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="158"
          height="141"
          viewBox="0 0 158 141"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z"
            fill="#FFFAD1"
          />
        </svg>
      </div>
      <div className="bottom-blob">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="148"
          height="118"
          viewBox="0 0 148 118"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
            fill="#DEEBF8"
          />
        </svg>
      </div>
      {quiz ? (
        <form>
          {quizArray}
          {game && <p>{`You scored ${points()}/5 correct answers`}</p>}
          <button onClick={handleClick}>
            {game ? 'Play Again' : 'Check Answers'}
          </button>
        </form>
      ) : (
        <StartingPage startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default App;
