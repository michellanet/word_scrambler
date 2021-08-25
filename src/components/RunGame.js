//display user guesses in progress
const RunGame = (props) => {
  return (
    <div className="bg-white w-75 rounded">
      <div className="row">
        <div className="d-flex justify-content-center h1 p-2 text-blue">
          {props.scrambledWordArray.join(" ")}
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center h5 p-2">
          Guess the sentence! Start typing
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center h5 p-2">
          The yellow blocks are meant for spaces
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center h3 p-2">
          Score : {props.score}
        </div>
      </div>
      <div className="p-3">
        {props.scrambledWordArray.length > 0 &&
          props.wordContainer(props.scrambledWordArray)}
      </div>
      {props.isSentenceMatched && (
        <div className="d-flex justify-content-center">
          <button
            onClick={props.nextGuess}
            className="btn h5 px-3 text-white correct-green rounded-0"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RunGame;
