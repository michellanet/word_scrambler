//split sentence to array of words
const customSplitWordArray = (sentence) => {
  const wordArray = sentence.match(/\w+|\s+/g);
  const wordArrayCount = wordArray.length;
  let newWordArray = [];

  for (let i = 0; i < wordArrayCount; i++) {
    if (!(i % 2) && i < wordArrayCount - 1) {
      newWordArray.push(wordArray[i].concat(wordArray[i + 1]));
    } else if (i === wordArrayCount - 1) {
      newWordArray.push(wordArray[i]);
    }
  }
  return newWordArray;
};

//focus siblin button by direction and position
const focusSibling = (wordArray, charIndex, wordIndex, e, linkNode) => {
  let focusedElement = null;
  if (linkNode === "next") {
    if (
      wordArray[wordIndex].length - 1 === charIndex &&
      wordArray.length - 1 !== wordIndex
    ) {
      focusedElement = e.target.parentNode.nextSibling.childNodes[0];
      focusedElement.focus();
    } else if (wordArray[wordIndex].length - 1 > charIndex) {
      focusedElement = e.target.nextSibling;
      focusedElement.focus();
    }
  }

  if (linkNode === "previous") {
    if (wordIndex !== 0 && charIndex === 0) {
      const element = e.target.parentNode.previousSibling;
      focusedElement = element.childNodes[element.childNodes.length - 1];
      const elementFirstChild =
        element.childNodes[element.childNodes.length - 1].firstChild;
      if (elementFirstChild !== null) {
        elementFirstChild.nodeValue = null;
      }
      element.childNodes[element.childNodes.length - 1].focus();
    } else if (charIndex > 0) {
      focusedElement = e.target.previousSibling;
      const elementFirstChild = focusedElement.firstChild;
      if (elementFirstChild !== null) {
        elementFirstChild.nodeValue = null;
      }
      focusedElement.focus();
    }
  }
  return focusedElement;
};

//switch button background color
const toggleBackgroundColor = (id, linkNode) => {
  const element = document.getElementById(id);
  if (element.classList.contains("background-gray") && linkNode === "next") {
    element.classList.remove("background-gray");
    element.classList.add("correct-green");
  } else if (
    element.classList.contains("space-yellow") &&
    linkNode === "next"
  ) {
    element.classList.remove("space-yellow");
    element.classList.add("correct-green");
  } else {
    element.classList.remove("correct-green");
    element.classList.add("background-gray");
  }
};

//scramble characters of a word
const scrambleCharacters = (word) => {
  //return if word is only one or two characters
  if (word.length <= 2) {
    return word;
  }

  const midString = word.substr(1, word.length - 2);
  const scrambledMidString = midString
    .split("")
    .sort(() => Math.random() - 0.5);

  const firstChar = word.charAt(0);
  const lastChar = word.charAt(word.length - 1);

  return `${firstChar}${scrambledMidString.join("")}${lastChar}`;
};

export {
  customSplitWordArray,
  focusSibling,
  toggleBackgroundColor,
  scrambleCharacters,
};
