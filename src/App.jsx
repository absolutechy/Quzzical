import {useState, useEffect} from "react"
import Questions from "./components/Questions.jsx"
import StartingPage from './components/StartingPage.jsx'
import './App.css'

function App() {
    const [quiz, setQuiz] = useState(null)
    const [start, setStart] = useState(false) 
    const [correctAnswers, setCorrectAnswers] = useState([]) 
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [checkAnswer, setCheckAnswer] = useState(false)

    useEffect(() => {
        if(start) {
            fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(data => {
                    setQuiz(data.results)
                    setCorrectAnswers(data.results.map(item => item.correct_answer)) 
                })
            setStart(false) 
        }
    }, [start]) 

    const startQuiz = () => {
        setStart(true) 
    }

    const handleOptionChange = (selectedOption) => {
        setSelectedAnswers(prevSelectedAnswers => [...prevSelectedAnswers, selectedOption])
    }

    const quizArray = quiz && quiz.map(item => {
        const optionsArray = [...item.incorrect_answers, item.correct_answer]
        return <Questions
            key={item.question}
            question={item.question}
            options={optionsArray}
            correctAnswer={item.correct_answer}
            handleOptionChange={handleOptionChange}
            checkAnswer={checkAnswer}
        />
    })

    const handleClick = (event) => {
        event.preventDefault()
        setCheckAnswer(true)
        console.log("clicked")
    }

    return (
        <div className="quiz-container">
            {quiz ? (<form>
                        {quizArray}
                        <button onClick={handleClick}>Check Answers</button>
                    </form> )
            : 
            <StartingPage startQuiz = {startQuiz}/>}
        </div>
    ) 
}

export default App
