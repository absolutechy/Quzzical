import {useId} from "react"

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function Questions(props) {
    const id = useId()
    const answersArray = shuffleArray([...props.options])

    function decodeHTMLEntities(text) {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      return textArea.value;
    }

    return (
        <div id="question1">
            <p className="question">{decodeHTMLEntities(props.question)}</p>
            <input type="radio" name={`${id} + q`} className="option-input radio" id={`${id} + q1a`} />
            <label htmlFor={`${id} + q1a`} className="option">{decodeHTMLEntities(answersArray[0])}</label>
            <input type="radio" name={`${id} + q`} className="option-input radio" id={`${id} + q1b`} />
            <label htmlFor={`${id} + q1b`} className="option">{decodeHTMLEntities(answersArray[1])}</label>
            <input type="radio" name={`${id} + q`} className="option-input radio" id={`${id} + q1c`} />
            <label htmlFor={`${id} + q1c`} className="option">{decodeHTMLEntities(answersArray[2])}</label>
            <input type="radio" name={`${id} + q`} className="option-input radio" id={`${id} + q1d`} />
            <label htmlFor={`${id} + q1d`} className="option">{decodeHTMLEntities(answersArray[3])}</label>
            <div className="line"></div>
        </div>
    )
}

export default Questions
