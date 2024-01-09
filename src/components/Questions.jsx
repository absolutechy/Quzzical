/* eslint-disable react/prop-types */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div key={index} className='option-div'>
      <input
        type='radio'
        name={`${id}q`}
        // moved class name down to the label since the input is hidden
        id={`${id} + q1${String.fromCharCode(97 + index)}`}
        value={answer}
        checked={selectedOption === answer}
        onChange={handleOptionChange}
      />
      <label
        htmlFor={`${id} + q1${String.fromCharCode(97 + index)}`}
        // added class name to select in css -
        className={`
        question-card--answer--options__option
        ${selectedOption === answer && 'selected'}
        ${props.correctAnswer === answer && props.checkAnswer && 'correct'}
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
    // changed id to class name so that you couls select easier w css
    <div className='question-card'>
      {/* gave more descriptive class names */}
      <p className='question-card--title'>
        {decodeHTMLEntities(props.question)}
      </p>
      <div className='question-card--answer-options'>{answerOptions}</div>
      {/* removed line at bottom and just added border to bottom of card */}
    </div>
  );
}

export default Questions;
