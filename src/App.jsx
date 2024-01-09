import { useState, useEffect } from 'react';
import Questions from './components/Questions.jsx';
import StartingPage from './components/StartingPage.jsx';
import topBlob from './assets/blob5.svg';
import bottomBlob from './assets/blobs.svg';
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
        'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'
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
    <div>
      {/* removed svg and turned them into images - easier to work with and a lot less code - resized w/ css.  */}
      <img className='top-blob' src={topBlob} alt='' />
      <img className='bottom-blob' src={bottomBlob} alt='' />
      {quiz ? (
        // added div around you form to more easly select it w/ class name - could have added class name directly to form I suppose
        <div className='quiz-container'>
          <form>
            {quizArray}
            {game && (
              <p className='score'>{`You scored ${points()}/5 correct answers`}</p>
            )}
            {/* added class name to button */}
            <button className='btn submit-btn' onClick={handleClick}>
              {game ? 'Play Again' : 'Check Answers'}
            </button>
          </form>
        </div>
      ) : (
        <StartingPage startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default App;
