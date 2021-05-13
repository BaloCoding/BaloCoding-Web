// global
let windowWidth = null
let windowHeight = null
let sumOfScore = 0
let remainedTime = 60
let tempNum = 1

/**
 * canvas
 */
// variables
const numOfGrid = 4
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
makeBtn.addEventListener('click', makeBtnClickListener)

const removeBtn = document.querySelector('#remove')
removeBtn.addEventListener('click', removeBtnClickListener)
// temp btn


// event listeners
window.addEventListener('DOMContentLoaded', DOMContentLoadedEventListener)
window.addEventListener('load', loadEventListener)
window.addEventListener('resize', resizeEventListener)


// functions
function DOMContentLoadedEventListener() {
  remainTime.innerText = `${remainedTime} 초`

  let remainInterval = setInterval(() => {
    remainedTime -= 1
    remainTime.innerText = `${remainedTime} 초`

    // 게임 오버
    if (remainedTime <= 0) {
      clearInterval(remainInterval)
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

function makeBtnClickListener() {
  const randInt = getRandomArbitrary(0, numOfGrid)

  const activity = document.createElement('div')
  activity.className = `activity ${tempNum}`
  activity.style.top = '20px'
  activity.style.left = `${(randInt * (windowWidth / numOfGrid)) + 2}px`

  const img = document.createElement('img')
  img.className = 'img'
  img.src = 'https://picsum.photos/200'
  img.addEventListener('load', (e) => imgLoadListener(e, randInt))

  const content = document.createElement('div')
  content.className = 'content'
  content.innerText = `${tempNum} 번 동작`

  activity.appendChild(img)
  activity.appendChild(content)

  game.appendChild(activity)

  tempNum += 1
}

function removeBtnClickListener() {
  const activities = document.querySelectorAll('.activity')
  if (activities.length > 0) {
    activities[0].parentElement.removeChild(activities[0])

    sumOfScore += 10
    totalScore.innerText = `${sumOfScore} 점`
  }
}

function imgLoadListener(e, idx) {
  const velocity = 10
  const target = e.target.parentNode
  let firstY = e.target.y
  let downInterval = null
  let a = 1

  downInterval = setInterval(() => {
    const parentElement = target.parentElement

    if (firstY > windowHeight) {
      clearInterval(downInterval)
      if (parentElement) {
        target.parentElement.removeChild(target)
      }
    }
    firstY += a
    target.style.top = `${firstY}px`
    target.style.left = `${(idx * (windowWidth / numOfGrid)) + 2}px`
  }, velocity)
}

// util functions
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}