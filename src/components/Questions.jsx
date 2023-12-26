function Questions(props) {
    const answersArray = props.options
    const randomNumber = Math.floor(Math.random() * 4 + 1)
  return (
        <div id="question1">
            <p className="question">{props.question}</p>
            <input type="radio" name="q1" className="option-input radio" id="q1a" />
            <label htmlFor="q1a" className="option">{answersArray[randomNumber]}</label>
            <input type="radio" name="q1" className="option-input radio" id="q1b" />
            <label htmlFor="q1b" className="option">{answersArray[randomNumber]}</label>
            <input type="radio" name="q1" className="option-input radio" id="q1c" />
            <label htmlFor="q1c" className="option">{answersArray[randomNumber]}</label>
            <input type="radio" name="q1" className="option-input radio" id="q1d" />
            <label htmlFor="q1d" className="option">{answersArray[randomNumber]}</label>
            <div className="line"></div>
        </div>
  )
}

export default Questions