/* eslint-disable react/prop-types */
import '../App.css';

function StartingPage(props) {
  return (
    // added class name to make it easeier to id in CSS
    <div className='start-page'>
      <h1>Quizzical</h1>
      <h2>Some description if needed</h2>
      {/* gave button classname to target in css */}
      <button className='btn start-btn' onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}

export default StartingPage;
