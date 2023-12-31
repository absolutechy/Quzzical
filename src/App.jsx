// App Component
import {useState, useEffect, useRef} from "react"
import Questions from "./components/Questions.jsx"
import StartingPage from './components/StartingPage.jsx'
import './App.css'

function App() {
    const [quiz, setQuiz] = useState(null)
    const firstload = useRef(true)

    useEffect(() => {
        if(firstload.current) {
            fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(data => setQuiz(data.results))
            firstload.current = false
        }
    }, [firstload])

    const startQuiz = () => {
        firstload.current = true
    }

    const quizArray = quiz && quiz.map(item => {
        const optionsArray = [...item.incorrect_answers, item.correct_answer]
        return <Questions
            key={item.question}
            question={item.question}
            options={optionsArray}
        />
    })
    return (
        <div className="quiz-container">
            {quiz ? <form>{quizArray}</form> : <StartingPage startQuiz = {startQuiz}/>}
        </div>
    )
}

export default App

