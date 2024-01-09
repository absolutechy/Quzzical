import { useId, useEffect, useState } from 'react';
import '../App.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Questions(props) {
  const id = useId();
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setShuffledAnswers(shuffleArray([...props.options]));
  }, []);

  function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    props.handleOptionChange(event.target.value);
  };

  const answerOptions = shuffledAnswers.map((answer, index) => (
    <div key={index} className="option-div">
      <input
        type="radio"
        name={`${id}q`}
        className="option-input radio correct"
        id={`${id} + q1${String.fromCharCode(97 + index)}`}
        value={answer}
        checked={selectedOption === answer}
        onChange={handleOptionChange}
      />
      <label
        htmlFor={`${id} + q1${String.fromCharCode(97 + index)}`}
        className={`
                            option 
                            ${selectedOption === answer && 'selected'}
                            ${
                              props.correctAnswer === answer &&
                              props.checkAnswer &&
                              'correct'
                            }
                            ${
                              props.correctAnswer !== answer &&
                              props.checkAnswer &&
                              selectedOption === answer &&
                              'incorrect'
                            }
                            ${props.checkAnswer && 'all-options'} 
                            `}
      >
        {decodeHTMLEntities(answer)}
      </label>
    </div>
  ));
  return (
    <div id="question1">
      <p className="question">{decodeHTMLEntities(props.question)}</p>
      <div className="optionsContainer">{answerOptions}</div>
      <div className="line"></div>
    </div>
  );
}

export default Questions;
