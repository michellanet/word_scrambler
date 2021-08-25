// Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  customSplitWordArray,
  focusSibling,
  toggleBackgroundColor,
  scrambleCharacters,
} from "../helpers/helperFunctions";

// Styling
import "../styles/scramble.css";
import RunGame from "./RunGame";
import GameCompleted from "./GameCompleted";

const Scramble = () => {
  const [guessIndex, setGuessIndex] = useState(1);

  const [score, setScore] = useState(0);
  const [sentence, setSentence] = useState("");
  const [userSentence, setUserSentence] = useState("");
  const maxSentences = 10;

  const [wordArray, setWordArray] = useState([]);
  const [scrambledWordArray, setScrambledWordArray] = useState([]);
  const [isSentenceMatched, setIsSentenceMatched] = useState(false);

  useEffect(() => {
    //fetch guess
    const fetchGuess = async () => {
      try {
        if (guessIndex > maxSentences) {
          return;
        }
        const response = await axios.get(`/assessment/sentences/${guessIndex}`);
        if (response.status === 200) {
          const sentence = response.data.data.sentence.toLowerCase();
          setSentence(sentence);
          const wordArr = customSplitWordArray(sentence);
          setWordArray(wordArr);

          wordArr.length > 0 &&
            setScrambledWordArray(
              wordArr.map((word) => scrambleCharacters(word))
            );
        }
      } catch (error) {
        alert("Error fetching sentence");
      }
    };
    fetchGuess();

    //focus first input
    setTimeout(() => {
      document.getElementById("00")?.focus();
    }, 2000);
  }, [guessIndex]);

  //generate word container
  const wordContainer = (words) => {
    return words.map((word, index) => (
      <div className="row" key={word + index}>
        {charContainer(word, index)}
      </div>
    ));
  };

  //generate character container
  const charContainer = (word, wordIndex) => {
    const wordArr = word.split("");
    const charLength = 100 / wordArr.length;

    return wordArr.map((character, index) => (
      <div
        key={index + "" + wordIndex}
        id={index + "" + wordIndex}
        className={`col no-outline text-center h5 text-white w-${charLength} p-4 m-1 ${
          character === " " ? "space-yellow" : "background-gray"
        }`}
        contentEditable="true"
        onKeyUp={(e) => processUserPlay(index, wordIndex, e)}
      ></div>
    ));
  };

  //concatenate user input
  const appendInputChar = (char) => {
    setUserSentence((userSentence) => {
      return userSentence.concat(char);
    });
    return userSentence.concat(char);
  };

  //slice user input
  const removeInputChar = () => {
    if (userSentence.length < 1) {
      return;
    }
    setUserSentence((userSentence) => {
      return userSentence.slice(0, -1);
    });
  };

  //process user key event
  const processUserPlay = (charIndex, wordIndex, e) => {
    e.preventDefault();
    const charValue = e.key;

    if (charValue === "Enter") {
      if (isSentenceMatched) {
        nextGuess();
      }
      return;
    }

    const previous = "previous";
    const next = "next";
    const targetId = e.target.id;
    if (charValue === "Backspace") {
      const focusedElement = focusSibling(
        wordArray,
        charIndex,
        wordIndex,
        e,
        previous
      );
      if (wordIndex === 0 && charIndex === 0) {
        toggleBackgroundColor(targetId, previous);
      } else if (
        wordArray.length - 1 === wordIndex &&
        wordArray[wordIndex].length - 1 === charIndex
      ) {
        toggleBackgroundColor(targetId, previous);
        removeInputChar();
      } else {
        toggleBackgroundColor(targetId, previous);
        toggleBackgroundColor(focusedElement.id, previous);
      }
      removeInputChar();
      return;
    }

    if (wordArray[wordIndex].charAt(charIndex) === charValue) {
      focusSibling(wordArray, charIndex, wordIndex, e, next);
      toggleBackgroundColor(targetId, next);
      const newUserSentence = appendInputChar(charValue);
      setIsSentenceMatched(sentence === newUserSentence);
    } else {
      focusSibling(wordArray, charIndex, wordIndex, e, next);
      appendInputChar(charValue);
    }
  };

  //load next guess
  const nextGuess = () => {
    setUserSentence("");
    setScrambledWordArray([]);
    setIsSentenceMatched(false);
    setGuessIndex((guess) => {
      return ++guess;
    });
    setScore((score) => {
      return ++score;
    });
  };

  //render component
  return guessIndex <= maxSentences ? (
    <RunGame
      score={score}
      scrambledWordArray={scrambledWordArray}
      isSentenceMatched={isSentenceMatched}
      nextGuess={nextGuess}
      wordContainer={wordContainer}
    />
  ) : (
    <GameCompleted />
  );
};

export default Scramble;
