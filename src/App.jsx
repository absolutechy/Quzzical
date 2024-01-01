import {useState, useEffect} from "react"
import Questions from "./components/Questions.jsx"
import StartingPage from './components/StartingPage.jsx'
import './App.css'

function App() {
    const [quiz, setQuiz] = useState(null)
    const [start, setStart] = useState(false) // New state variable

    useEffect(() => {
        if(start) {
            fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(data => setQuiz(data.results))
            setStart(false) // Reset the start state after fetching the data
        }
    }, [start]) // Add start to the dependency array

    const startQuiz = () => {
        setStart(true) // Change the start state to true when the button is clicked
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
