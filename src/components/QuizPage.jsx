import { useState ,useEffect } from "react"
import Questions from "./Questions"

function QuizPage() {

    const [quiz, setQuiz] = useState([])


    async function getQuiz() {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple");
        const data = await response.json();
        setQuiz(data.results)
    }
    function handleClick() {
        getQuiz().then(r => {
            console.log(r)
        })
    }

    const quizArray = quiz.map(item => {
        const options=[...item.incorrect_answers]
        options.push(item.correct_answer)
        return <Questions
            key={item.question}
            question={item.question}
            options={options}
        />
    })
    return (
        <div className="quiz-container">
            <button onClick={handleClick}>Click me</button>
            {quizArray}
        </div>
    )
}

export default QuizPage