import { useState ,useEffect } from "react"
import Questions from "./Questions"

function QuizPage() {
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
            const data = (await response).json()
            setQuiz(data.results)
        }
        fetchData()
    }, [])

    console.log(quiz)

    // const quizArray =  quiz.map(item => {
    //     return <Questions  
    //     question={item.question} 
    //     options={[item.correct_answer, ...item.incorrect_answers]} 
    //     />
    // })

  return (
    <div className="quiz-container">
        <form>
            {/* {quizArray} */}
        </form>
    </div>
  )
}

export default QuizPage