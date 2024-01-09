import '../App.css';

function StartingPage(props) {
  return (
    <>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={props.startQuiz}>Start quiz</button>
    </>
  );
}

export default StartingPage;
