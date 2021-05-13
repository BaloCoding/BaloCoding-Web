// global
let windowWidth = null
let windowHeight = null
let correctScore = 100
let sumOfScore = 0
let remainedTime = 60
let activityNum = 1
let numOfCombo = 1
let acceleration = 1
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


changeActivityImg()


/**
 * effect
 */
// variables

// dom elements
const effect = document.querySelector('.effect')

// temp btn
const changeBtn = document.querySelector('#change')
changeBtn.addEventListener('click', changeActivityImg)

const effectBtn = document.querySelector('#effect')
effectBtn.addEventListener('click', addComboAnimation)
// temp btn

/**
 * webcam
 */
// variables

// dom elements
const webcam = document.querySelector('.webcam')

// event listeners
window.addEventListener('DOMContentLoaded', DOMContentLoadedEventListener)
window.addEventListener('load', loadEventListener)
window.addEventListener('resize', resizeEventListener)


// functions
function DOMContentLoadedEventListener() {
  let intervalCnt = 0
  remainTime.innerText = `${remainedTime}초`

  const remainInterval = setInterval(() => {
    remainedTime -= 1
    remainTime.innerText = `${remainedTime}초`

    intervalCnt += 1
    if (intervalCnt % 3 === 0) {
      // makeFaster()
    }

    // 게임 오버
    if (remainedTime <= 0) {
      clearInterval(remainInterval)
      isGameOver = true
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

function changeActivityImg() {
  tryItImg.src = `https://picsum.photos/${getRandomArbitrary(1000, 2000)}`

  // 웹캠으로 측정한 값
  isCorrectPose = getRandomArbitrary(0, 2)
  if (isCorrectPose === 0) {
    addComboAnimation()
  }
}

function addComboAnimation() {
  const rx = getRandomArbitrary(150, windowWidth - 400)
  const ry = getRandomArbitrary(150, windowHeight - 400)

  const scoreTable = makeScoreTable(rx, ry)
  effect.appendChild(scoreTable)
  setTimeout(() => {
    confetti(scoreTable.querySelector('.particletext.confetti'))

    setTimeout(() => {
      scoreTable.parentNode.removeChild(scoreTable)
    }, 3000)
  }, 10)

  raiseTotalScore()
  // sumOfScore += correctScore
  // totalScore.innerText = `${sumOfScore} 점`
}

// function makeFaster() {
//   acceleration *= 1.1
// }

function makeScoreTable(xPos, yPos) {
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


// util functions
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
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

function raiseTotalScore() {
  const curScore = parseInt(totalScore.innerText)
  console.log(curScore)
  
  sumOfScore += correctScore

  let cnt = 0
  const plusInterval = setInterval(() => {
    if (cnt >= correctScore) {
      clearInterval(plusInterval)
    }
    totalScore.innerHTML = `${curScore + cnt}점`
    cnt += 1
  }, 1)
}
