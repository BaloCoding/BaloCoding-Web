// global
let windowWidth = null
let windowHeight = null
let correctScore = 10
let sumOfScore = 0
let remainedTime = 60
let activityNum = 1
let numOfCombo = 1
let acceleration = 1
let isGameOver = false

/**
 * canvas
 */
// variables
const numOfGrid = 4
const paddingOfActivity = 10
// dom elements
const gridCanvas = document.querySelector('.grid-canvas')

/**
 * game
 */
// variables

// dom elements
const game = document.querySelector('.game')
const totalScore = document.querySelector('.total-score')
const remainTime = document.querySelector('.remain-time')

// temp btn
const makeBtn = document.querySelector('#make')
makeBtn.addEventListener('click', (e) => makeBtnClickListener(e))

const removeBtn = document.querySelector('#remove')
removeBtn.addEventListener('click', removeBtnClickListener)
// temp btn


// event listeners
window.addEventListener('DOMContentLoaded', DOMContentLoadedEventListener)
window.addEventListener('load', loadEventListener)
window.addEventListener('resize', resizeEventListener)


// functions
function DOMContentLoadedEventListener() {
  let intervalCnt = 0
  remainTime.innerText = `${remainedTime} 초`

  const remainInterval = setInterval(() => {
    remainedTime -= 1
    remainTime.innerText = `${remainedTime} 초`

    intervalCnt += 1
    if (intervalCnt % 3 === 0) {
      makeFaster()
    }

    // 게임 오버
    if (remainedTime <= 0) {
      clearInterval(remainInterval)
      isGameOver = true
    }
  }, 1000)
}

function loadEventListener() {
  gridCanvas.innerHTML = ''
  windowWidth = window.innerWidth
  windowHeight = window.outerHeight
  totalScore.innerText = `${sumOfScore} 점`

  drawGridLine()
}

function resizeEventListener() {
  gridCanvas.innerHTML = ''
  windowWidth = window.innerWidth
  windowHeight = window.outerHeight
  totalScore.innerText = `${sumOfScore} 점`

  drawGridLine()
}

function drawGridLine() {
  {[...Array(numOfGrid)].forEach((n, idx) => {
    const gridLine = document.createElement('div')
    gridLine.className = 'line'
    gridLine.style.left = `${(windowWidth / numOfGrid) * (idx)}px`
    gridCanvas.appendChild(gridLine)
  })}
}

function makeBtnClickListener(e) {
  e.target.parentNode.removeChild(e.target)

  const makeActivityInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(makeActivityInterval)
    }
    const randInt = getRandomArbitrary(0, 1000) % numOfGrid

    const activity = document.createElement('div')
    activity.className = `activity ${activityNum}`
    activity.style.zIndex = 99999 - activityNum
    activity.style.width = `${(windowWidth / numOfGrid) - (paddingOfActivity * 2)}px`
    activity.style.top = '20px'
    activity.style.left = `${(randInt * (windowWidth / numOfGrid)) + paddingOfActivity}px`

    const img = document.createElement('img')
    img.className = 'img'
    img.src = 'https://picsum.photos/200'
    img.addEventListener('load', (e) => imgLoadListener(e, randInt))

    const content = document.createElement('div')
    content.className = 'content'
    content.innerText = `${activityNum} 번 동작`

    activity.appendChild(img)
    activity.appendChild(content)

    game.appendChild(activity)

    activityNum += 1
  }, getRandomArbitrary(1000, 1200))

}

function removeBtnClickListener() {
  const activities = document.querySelectorAll('.activity')
  if (activities.length > 0) {
    const ax = activities[0].getBoundingClientRect().x
    const ay = activities[0].getBoundingClientRect().y

    const rx = ax + getRandomArbitrary(0, activities[0].getBoundingClientRect().width - 30)
    const ry = ay + getRandomArbitrary(0, activities[0].getBoundingClientRect().height - 30)

    const scoreTable = makeScoreTable(rx, ry)
    game.appendChild(scoreTable)
    setTimeout(() => {
      confetti(scoreTable.querySelector('.particletext.confetti'))

      setTimeout(() => {
        scoreTable.parentNode.removeChild(scoreTable)
      }, 3000)
    }, 10)

    activities[0].parentElement.removeChild(activities[0])

    sumOfScore += correctScore
    totalScore.innerText = `${correctScore} 점`
  }
}

function makeFaster() {
  acceleration *= 1.1
}

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
  score.innerText = `+ ${sumOfScore}`

  textContainer.appendChild(paticle)

  scoreTable.appendChild(textContainer)
  scoreTable.appendChild(score)

  return scoreTable
}

function imgLoadListener(e, idx) {
  const velocity = 10
  const target = e.target.parentNode
  let firstY = e.target.y
  let downInterval = null

  downInterval = setInterval(() => {
    const parentElement = target.parentElement

    if (firstY > windowHeight - 300) {
      clearInterval(downInterval)
      if (parentElement) {
        target.parentElement.removeChild(target)
      }
    }
    firstY += acceleration
    target.style.width = `${(windowWidth / numOfGrid) - (paddingOfActivity * 2)}px`
    target.style.top = `${firstY}px`
    target.style.left = `${(idx * (windowWidth / numOfGrid)) + paddingOfActivity}px`
  }, velocity)
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
