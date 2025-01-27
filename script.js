function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(number) {
  let r = 1 * number;
  let g = 5 * number;
  let b = 5 * number;
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomElement() {
  let randomNumber = getRandomNumber(20, 51);
  return {
    "class": "block",
    "number": randomNumber,
    "color": getRandomColor(randomNumber)
  }
}

function generateRandom10Elements() {
  let elements = [];
  for (var i = 0; i < 10; i++) {
    let element = generateRandomElement()
    elements.push(element);
  }
  return elements;
}

let clicked = false;
let elements = generateRandom10Elements()
addNumbersToHTML(elements, "num-list");

function addNumbersToHTML(elements, target) {

  if (target == "answer" && !clicked) {
    clicked = true;
  } else if (target == "answer" && clicked) {
    return;
  }

  let numList = document.getElementById(target);

  for (let i = 0; i < elements.length; i++) {
    let numberBlock = document.createElement('div');

    numberBlock.classList.add(elements[i].class);
    numberBlock.style.backgroundColor = elements[i].color;
    numberBlock.textContent = elements[i].number;

    numList.appendChild(numberBlock);
  }
}

function handleSortButtonClick() {
  let sortedElements = sortElements(elements);
  addNumbersToHTML(sortedElements, "answer");
}

function handleRefreshButtonClick() {
  clicked = false;
  elements = generateRandom10Elements();
  document.getElementById('num-list').innerHTML = "";
  document.getElementById('answer').innerHTML = "";
  addNumbersToHTML(elements, "num-list");
}

let sortButton = document.getElementById('sort');
let refreshButton = document.getElementById('refresh');
sortButton.addEventListener('click', handleSortButtonClick);
refreshButton.addEventListener('click', handleRefreshButtonClick);

function sortElements(elements) {
  let len = elements.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (elements[j].number > elements[j + 1].number) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
      }
    }
  }
  return elements;
}

