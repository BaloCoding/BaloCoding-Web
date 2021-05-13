// global
let windowWidth = null
let windowHeight = null

let tempNum = 1

/**
 * canvas
 */
// variables
const numOfGrid = 4
// dom elements
const canvas = document.querySelector('.canvas')

/**
 * game
 */
// variables

// dom elements
const game = document.querySelector('.game')

// temp btn
const btn = document.createElement('div')
btn.className = 'btn'
btn.innerText = '<make img>'
btn.style.width = 'fit-content'
btn.addEventListener('click', btnClickListener)
game.appendChild(btn)
// temp btn


// event listeners
window.addEventListener('load', loadEventListener)
window.addEventListener('resize', resizeEventListener)


// functions
function loadEventListener() {
  canvas.innerHTML = ''
  windowWidth = window.innerWidth
  windowHeight = window.outerHeight

  drawGridLine()
}

function resizeEventListener() {
  canvas.innerHTML = ''
  windowWidth = window.innerWidth
  windowHeight = window.outerHeight

  drawGridLine()
}

function drawGridLine() {
  {[...Array(numOfGrid)].forEach((n, idx) => {
    const gridLine = document.createElement('div')
    gridLine.className = 'line'
    gridLine.style.left = `${(windowWidth / numOfGrid) * (idx)}px`
    canvas.appendChild(gridLine)
  })}
}

function btnClickListener() {
  const randInt = getRandomArbitrary(0, numOfGrid)

  const activity = document.createElement('div')
  activity.className = 'activity'
  activity.style.top = '20px'
  activity.style.left = `${randInt * (windowWidth / numOfGrid)}px`

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

function imgLoadListener(e, idx) {
  const velocity = 8
  const target = e.target.parentNode
  let firstY = e.target.y
  let downInterval = null

  downInterval = setInterval(() => {
    if (firstY > windowHeight) {
      clearInterval(downInterval)
      target.parentElement.removeChild(target)
    }
    firstY += 1
    target.style.top = `${firstY}px`
    target.style.left = `${idx * (windowWidth / numOfGrid)}px`
  }, velocity)
}

// util functions
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}