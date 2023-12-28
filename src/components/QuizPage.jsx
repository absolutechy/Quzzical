import { useState ,useEffect } from "react"
import Questions from "./Questions"

function QuizPage() {

    const [quiz, setQuiz] = useState([])

    useEffect(() => {

        if(quiz.length === 0) { // develpoment only: To make sure not to call api too often which would result in an api error
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuiz(data.results))
        }

    }, [])

    console.log(quiz)

    const quizArray =  quiz?.map(item => {
        return <Questions  
        question={item.question} 
        options={[item.correct_answer, ...item.incorrect_answers]} 
        />
    })
  return (
    <div className="quiz-container">
        <form>
            {quizArray && quizArray.length > 0 ? quizArray : <p>loading..</p>}
        </form>
    </div>
  )
}

export default QuizPage