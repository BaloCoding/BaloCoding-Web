// global
let windowWidth = null
let windowHeight = null
let correctScore = 100
let sumOfScore = 0
let remainedTime = 0
let activityNum = 1
let numOfCombo = 1
let acceleration = 1
let maximumTime = 10000
let changeActivityTime = maximumTime
let isGameOver = false
let isCorrectPose = 0

/**
 * activity
 */
// variables

// dom elements
const activity = document.querySelector('.activity')
const remainTime = document.querySelector('.activity .remain-time')
const totalScore = document.querySelector('.activity .total-score')
const tryItImg = document.querySelector('.activity .try-it')

startGame()

/**
 * effect
 */
// variables

// dom elements
const effect = document.querySelector('.effect')

// // temp btn
const changeBtn = document.querySelector('#change')
changeBtn.addEventListener('click', changeActivityImg)

const effectBtn = document.querySelector('#effect')
effectBtn.addEventListener('click', addComboAnimation)
// // temp btn

/**
 * webcam
 */
// variables

// dom elements
const webcam = document.querySelector('.webcam')

/**
 * game-over
 */
const gameOver = document.querySelector('.game-over')
const myScore = document.querySelector('.my-score')
const share = document.querySelector('.share')
share.addEventListener('click', shareKakaoTalk)
const sceneImg = document.querySelector('.scene')

// event listeners
window.addEventListener('DOMContentLoaded', DOMContentLoadedEventListener)
window.addEventListener('load', loadEventListener)
window.addEventListener('resize', resizeEventListener)


// functions
function DOMContentLoadedEventListener() {
  remainTime.innerText = `${remainedTime}초`

  const remainInterval = setInterval(() => {
    changeActivityTime -= 1000
    if (changeActivityTime === 0) {
      changeActivityTime = maximumTime
      changeActivityImg(null, 'fail')
    }

    remainedTime -= 1
    remainTime.innerText = `${remainedTime}초`

    // 게임 오버
    if (remainedTime <= 0) {
      clearInterval(remainInterval)
      isGameOver = true
      
      gameOver.classList.remove('hide')
      setTimeout(() => {
        raiseTotalScore(myScore)
      }, 2000)
    }
  }, 1000)
}

function loadEventListener() {
  windowWidth = window.innerWidth
  windowHeight = window.outerHeight

  totalScore.innerText = `${sumOfScore}점`
  webcam.style.width = `${windowWidth / 5}px`
  webcam.style.height = `${windowHeight / 3}px`
}

function resizeEventListener() {
  windowWidth = window.innerWidth
  windowHeight = window.outerHeight

  totalScore.innerText = `${sumOfScore}점`
  webcam.style.width = `${windowWidth / 5}px`
  webcam.style.height = `${windowHeight / 3}px`
}

function startGame() {
  tryItImg.src = `https://picsum.photos/${getRandomArbitrary(1000, 2000)}`
}

function changeActivityImg(e, mode = 'default') {
  changeActivityTime = maximumTime
  tryItImg.src = `https://picsum.photos/${getRandomArbitrary(1000, 2000)}`

  if (mode === 'default') {
    // 웹캠으로 측정한 값
    isCorrectPose = getRandomArbitrary(0, 2)
    if (isCorrectPose === 0) {
      remainedTime += getRandomArbitrary(2, 6)
      maximumTime -= 1000
      if (maximumTime < 6000) {
        maximumTime = 6000
      }
      addComboAnimation()
    }
  } else {
    addFailAnimation()
  }
}

function addFailAnimation() {
  const rx = getRandomArbitrary(150, windowWidth - 400)
  const ry = getRandomArbitrary(150, windowHeight - 400)

  const scoreTable = makeScoreFailureTable(rx, ry)
  effect.appendChild(scoreTable)
  setTimeout(() => {
    fire(scoreTable.querySelector('.particletext.fire'))

    setTimeout(() => {
      scoreTable.parentNode.removeChild(scoreTable)
    }, 3000)
  }, 10)
}

function addComboAnimation() {
  const rx = getRandomArbitrary(150, windowWidth - 400)
  const ry = getRandomArbitrary(150, windowHeight - 400)

  const scoreTable = makeScoreSuccessTable(rx, ry)
  effect.appendChild(scoreTable)
  setTimeout(() => {
    confetti(scoreTable.querySelector('.particletext.confetti'))

    setTimeout(() => {
      scoreTable.parentNode.removeChild(scoreTable)
    }, 3000)
  }, 10)

  raiseTotalScore(totalScore)
}

function makeScoreSuccessTable(xPos, yPos) {
  const scoreTable = document.createElement('div')
  scoreTable.className = 'score-table'
  scoreTable.style.top = `${yPos}px`
  scoreTable.style.left = `${xPos}px`
  scoreTable.style.transform = `rotateZ(${getRandomArbitrary(-45,45)}deg)`

  const textContainer = document.createElement('div')
  textContainer.className = 'textcontainer'

  const paticle = document.createElement('span')
  paticle.className = 'particletext confetti'
  paticle.innerText = `${numOfCombo} Combo !`
  numOfCombo += 1

  const score = document.createElement('div')
  score.className = 'score'
  score.innerText = `+ ${correctScore}`

  textContainer.appendChild(paticle)

  scoreTable.appendChild(textContainer)
  scoreTable.appendChild(score)

  return scoreTable
}

function makeScoreFailureTable(xPos, yPos) {
  const scoreTable = document.createElement('div')
  scoreTable.className = 'score-table fail'
  scoreTable.style.top = `${yPos}px`
  scoreTable.style.left = `${xPos}px`
  scoreTable.style.transform = `rotateZ(${getRandomArbitrary(-45,45)}deg)`

  const textContainer = document.createElement('div')
  textContainer.className = 'textcontainer'

  const paticle = document.createElement('span')
  paticle.className = 'particletext fire'
  paticle.innerText = `Failure !`

  textContainer.appendChild(paticle)

  scoreTable.appendChild(textContainer)

  return scoreTable
}

function shareKakaoTalk() {
  console.log('태민아 만들어')
}

// util functions
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

function fire(elem) {
  const firecount = parseInt((elem.getBoundingClientRect().width / 50) * 20);

  for(let i = 0; i <= firecount; i++) {
    const size = getRandomArbitrary(8,12);
    const span = document.createElement('span')
    span.className = 'particle'
    span.style.top = `${getRandomArbitrary(40,70)}%`
    span.style.left = `${getRandomArbitrary(-10,100)}%`
    span.style.width = `${size}px`
    span.style.height = `${size}px`
    span.style.animationDelay = `${(getRandomArbitrary(0,20)/10)}s`

    elem.appendChild(span)
  }
}

function confetti(elem) {
  const confetticount = parseInt((elem.getBoundingClientRect().width / 50) * 10);
  
  for(let i = 0; i <= confetticount; i++) {
    const span = document.createElement('span')
    span.className = `particle c${getRandomArbitrary(1,2)}`
    span.style.top = `${getRandomArbitrary(10,50)}%`
    span.style.left = `${getRandomArbitrary(0,100)}%`
    span.style.width = `${getRandomArbitrary(6,8)}px`
    span.style.height = `${getRandomArbitrary(3,4)}px`
    span.style.animationDelay = `${(getRandomArbitrary(0,30)/10)}s`

    elem.appendChild(span)
  }
}

function raiseTotalScore(elem) {
  const curScore = parseInt(elem.innerText)
  sumOfScore += correctScore

  let cnt = 0
  const plusInterval = setInterval(() => {
    if (cnt >= correctScore) {
      clearInterval(plusInterval)
    }
    elem.innerHTML = `${curScore + cnt}점`
    cnt += 1
  }, 1)
}
