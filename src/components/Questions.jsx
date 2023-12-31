import {useId} from "react"

function Questions(props) {
    const id = useId()
    const answersArray = props.options
  return (
        <div id="question1">
            <p className="question">{props.question}</p>
            <input type="radio" name="q1" className="option-input radio" id={`${id} + q1a`} />
            <label htmlFor={`${id} + q1a`} className="option">{answersArray[Math.floor(Math.random() * 4 + 1)]}</label>
            <input type="radio" name="q1" className="option-input radio" id={`${id} + q1b`} />
            <label htmlFor={`${id} + q1b`} className="option">{answersArray[Math.floor(Math.random() * 4 + 1)]}</label>
            <input type="radio" name="q1" className="option-input radio" id={`${id} + q1c`} />
            <label htmlFor={`${id} + q1c`} className="option">{answersArray[Math.floor(Math.random() * 4 + 1)]}</label>
            <input type="radio" name="q1" className="option-input radio" id={`${id} + q1d`} />
            <label htmlFor={`${id} + q1d`} className="option">{answersArray[Math.floor(Math.random() * 4 + 1)]}</label>
            <div className="line"></div>
        </div>
  )
}

export default Questions