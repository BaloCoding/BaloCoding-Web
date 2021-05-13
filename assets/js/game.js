// global
let windowWidth = null;
let windowHeight = null;
let correctScore = 100;
let sumOfScore = 0;
let remainedTime = 10000;
let activityNum = 1;
let numOfCombo = 1;
let acceleration = 1;
let maximumTime = 100000;
let changeActivityTime = maximumTime;
let isGameOver = false;
let isCorrectPose = 0;
let shareLink =
  "https://balocoding-ftvlg.run.goorm.io/BaloCoding/pages/home.html";

let status = "ignore";
let answerFlag = false;
let startFlag = false;
let currentPose;

// 웹캠이 켜지면 true로 ~
let webcamIsLoaded = false;

const poseTypes = [
  "buddha",
  "front_squart",
  "left_squart",
  "right_squart",
  "left_lunge",
  "right_lunge",
];

const modelClassTypes = {
  left_squart: 0,
  standing: 1,
  right_squart: 2,
  front_squart: 3,
  left_lunge: 4,
  right_lunge: 5,
  buddha: 6,
  ignore: 7,
};

// 현재 해야할 동작
/**
 * activity
 */
// variables

// dom elements
const gameOver = document.querySelector(".game-over");
const activity = document.querySelector(".activity");
const remainTime = document.querySelector(".activity .remain-time");
const totalScore = document.querySelector(".activity .total-score");
const tryItImg = document.querySelector(".activity .try-it");

startGame();

/**
 * effect
 */
// variables

// dom elements
const effect = document.querySelector(".effect");

// temp btn
const changeBtn = document.querySelector("#change");
changeBtn.addEventListener("click", changeActivityImg);

const effectBtn = document.querySelector("#effect");
effectBtn.addEventListener("click", addComboAnimation);
// temp btn

/**
 * webcam
 */
// variables

// dom elements
const webcamContainer = document.querySelector(".webcamContainer");
const myScore = document.querySelector(".my-score");
const share = document.querySelector(".share");
share.addEventListener("click", shareKakaoTalk);
const sceneImg = document.querySelector(".scene");

// event listeners
window.addEventListener("DOMContentLoaded", DOMContentLoadedEventListener);
window.addEventListener("load", loadEventListener);
window.addEventListener("resize", resizeEventListener);

// functions
function DOMContentLoadedEventListener() {
  remainTime.innerText = `${remainedTime}초`;

  const remainInterval = setInterval(() => {
    changeActivityTime -= 1000;
    if (changeActivityTime === 0) {
      changeActivityTime = maximumTime;
      changeActivityImg(null, "fail");
    }

    remainedTime -= 1;
    remainTime.innerText = `${remainedTime}초`;

    // 게임 오버
    if (remainedTime <= 0) {
      console.log("끝났다~!");
      clearInterval(remainInterval);
      isGameOver = true;
      gameOver.classList.remove("hide");
      setTimeout(() => {
        raiseTotalScore(myScore);
      }, 2000);
    }
  }, 1000);
}

function startGame() {
  // tryItImg.src = `https://picsum.photos/${getRandomArbitrary(1000, 2000)}`;
  currentPose = poseTypes[getRandomArbitrary(0, 5)];
  let currentPoseImageURL = `../../assets/img/${currentPose}.png`;
  tryItImg.src = currentPoseImageURL;
}

function loadEventListener() {
  windowWidth = window.innerWidth;
  windowHeight = window.outerHeight;

  totalScore.innerText = `${sumOfScore}점`;
  webcamContainer.style.width = `${windowWidth / 5}px`;
  webcamContainer.style.height = `${windowHeight / 3}px`;
}

function resizeEventListener() {
  windowWidth = window.innerWidth;
  windowHeight = window.outerHeight;

  totalScore.innerText = `${sumOfScore}점`;
  webcamContainer.style.width = `${windowWidth / 5}px`;
  webcamContainer.style.height = `${windowHeight / 3}px`;
}

function shareKakaoTalk() {
  if (!Kakao.isInitialized()) {
    Kakao.init("059b8395c3ec1d738338b2900b32bb1c");
  }

  Kakao.Link.createDefaultButton({
    container: ".share",
    objectType: "feed",
    content: {
      title: "내 점수는??!!",
      description: myScore.innerText + " 입니다! 나랑 점수 대결할 사람!",
      imageUrl: sceneImg.getAttribute("src"),
      link: {
        webUrl: shareLink,
        mobileWebUrl: shareLink,
      },
    },
    buttons: [
      {
        title: "나도 하러가기",
        link: {
          webUrl: shareLink,
          mobileWebUrl: shareLink,
        },
      },
    ],
  });
}

function temp() {
  remainedTime += getRandomArbitrary(2, 6);
  maximumTime -= 1000;
  if (maximumTime < 6000) {
    maximumTime = 6000;
  }
  addComboAnimation();
}

function changeActivityImg(e, mode = "default") {
  changeActivityTime = maximumTime;
  // tryItImg.src = `https://picsum.photos/${getRandomArbitrary(1000, 2000)}`;
  currentPose = poseTypes[getRandomArbitrary(0, 5)];
  let currentPoseImageURL = `../../assets/img/${currentPose}.png`;
  let labelContainer = document.getElementById("label");
  tryItImg.src = currentPoseImageURL;

  if (mode === "default") {
    // 웹캠으로 측정한 값
    isCorrectPose = getRandomArbitrary(0, 2);
    if (isCorrectPose === 0) {
      temp();
      // remainedTime += getRandomArbitrary(2, 6);
      // maximumTime -= 1000;
      // if (maximumTime < 6000) {
      //   maximumTime = 6000;
      // }
      // addComboAnimation();
    }
  } else {
    addFailAnimation();
  }
}

function addFailAnimation() {
  const rx = getRandomArbitrary(150, windowWidth - 400);
  const ry = getRandomArbitrary(150, windowHeight - 400);

  const scoreTable = makeScoreFailureTable(rx, ry);
  effect.appendChild(scoreTable);
  setTimeout(() => {
    fire(scoreTable.querySelector(".particletext.fire"));

    setTimeout(() => {
      scoreTable.parentNode.removeChild(scoreTable);
    }, 3000);
  }, 10);
}

function addComboAnimation() {
  const rx = getRandomArbitrary(150, windowWidth - 400);
  const ry = getRandomArbitrary(150, windowHeight - 400);

  const scoreTable = makeScoreSuccessTable(rx, ry);
  effect.appendChild(scoreTable);
  setTimeout(() => {
    confetti(scoreTable.querySelector(".particletext.confetti"));

    setTimeout(() => {
      scoreTable.parentNode.removeChild(scoreTable);
    }, 3000);
  }, 10);

  raiseTotalScore(totalScore);
}

function makeScoreSuccessTable(xPos, yPos) {
  const scoreTable = document.createElement("div");
  scoreTable.className = "score-table";
  scoreTable.style.top = `${yPos}px`;
  scoreTable.style.left = `${xPos}px`;
  scoreTable.style.transform = `rotateZ(${getRandomArbitrary(-45, 45)}deg)`;

  const textContainer = document.createElement("div");
  textContainer.className = "textcontainer";

  const paticle = document.createElement("span");
  paticle.className = "particletext confetti";
  paticle.innerText = `${numOfCombo} Combo !`;
  numOfCombo += 1;

  const score = document.createElement("div");
  score.className = "score";
  score.innerText = `+ ${correctScore}`;

  textContainer.appendChild(paticle);

  scoreTable.appendChild(textContainer);
  scoreTable.appendChild(score);

  return scoreTable;
}

// function makeFaster() {
//   acceleration *= 1.1
// }

function makeScoreFailureTable(xPos, yPos) {
  const scoreTable = document.createElement("div");
  scoreTable.className = "score-table fail";
  scoreTable.style.top = `${yPos}px`;
  scoreTable.style.left = `${xPos}px`;
  scoreTable.style.transform = `rotateZ(${getRandomArbitrary(-45, 45)}deg)`;

  const textContainer = document.createElement("div");
  textContainer.className = "textcontainer";

  const paticle = document.createElement("span");
  paticle.className = "particletext fire";
  paticle.innerText = `Failure !`;

  textContainer.appendChild(paticle);

  scoreTable.appendChild(textContainer);

  return scoreTable;
}

function fire(elem) {
  const firecount = parseInt((elem.getBoundingClientRect().width / 50) * 20);

  for (let i = 0; i <= firecount; i++) {
    const size = getRandomArbitrary(8, 12);
    const span = document.createElement("span");
    span.className = "particle";
    span.style.top = `${getRandomArbitrary(40, 70)}%`;
    span.style.left = `${getRandomArbitrary(-10, 100)}%`;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.animationDelay = `${getRandomArbitrary(0, 20) / 10}s`;

    elem.appendChild(span);
  }
}

function confetti(elem) {
  const confetticount = parseInt(
    (elem.getBoundingClientRect().width / 50) * 10
  );

  for (let i = 0; i <= confetticount; i++) {
    const span = document.createElement("span");
    span.className = `particle c${getRandomArbitrary(1, 2)}`;
    span.style.top = `${getRandomArbitrary(10, 50)}%`;
    span.style.left = `${getRandomArbitrary(0, 100)}%`;
    span.style.width = `${getRandomArbitrary(6, 8)}px`;
    span.style.height = `${getRandomArbitrary(3, 4)}px`;
    span.style.animationDelay = `${getRandomArbitrary(0, 30) / 10}s`;

    elem.appendChild(span);
  }
}

function makeScoreTable(xPos, yPos) {
  const scoreTable = document.createElement("div");
  scoreTable.className = "score-table";
  scoreTable.style.top = `${yPos}px`;
  scoreTable.style.left = `${xPos}px`;
  scoreTable.style.transform = `rotateZ(${getRandomArbitrary(-45, 45)}deg)`;

  const textContainer = document.createElement("div");
  textContainer.className = "textcontainer";

  const paticle = document.createElement("span");
  paticle.className = "particletext confetti";
  paticle.innerText = `${numOfCombo} Combo !`;
  numOfCombo += 1;

  const score = document.createElement("div");
  score.className = "score";
  score.innerText = `+ ${correctScore}`;

  textContainer.appendChild(paticle);

  scoreTable.appendChild(textContainer);
  scoreTable.appendChild(score);

  return scoreTable;
}

// util functions
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

function raiseTotalScore(elem) {
  const curScore = parseInt(elem.innerText);
  sumOfScore += correctScore;

  let cnt = 0;
  const plusInterval = setInterval(() => {
    if (cnt >= correctScore) {
      clearInterval(plusInterval);
    }
    elem.innerHTML = `${curScore + cnt}점`;
    cnt += 1;
  }, 1);
}

//
//
//  AI Functions
//
//

const URL = "../my_model/";
let model, webcam, ctx, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  const size = 500;
  const flip = true; // whether to flip the webcam

  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);
  webcamIsLoaded = true;

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");
  probabilityContainer = document.getElementById("probabilityContainer");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    probabilityContainer.appendChild(document.createElement("div"));
  }
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}
let labelContainer2 = document.getElementById("label2");
let labelContainer3 = document.getElementById("label3");
let name_ = "";
let probability_ = -1;

let poseCount = 0;

async function predict() {
  // console.log("currentPose : ", currentPose);
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const threshold = 0.8;
  const prediction = await model.predict(posenetOutput);
  let modelClassTypeIndex = modelClassTypes[currentPose];
  // labelContainer2.innerText = status;

  for (let i = 0; i < prediction.length; i++) {
    if (probability_ < prediction[i].probability.toFixed(2)) {
      probability_ = prediction[i].probability.toFixed(2);
      name_ = prediction[i].className;
    }
  }
  // labelContainer3.innerText = name_;
  probability_ = -1;
  //status 가 ignore면 return
  if (prediction[7].probability.toFixed(2) > threshold) {
    return;
  }

  if (!startFlag) {
    // 처음 제대로 화면에 들어왔는지 확인해야함 ㅋ
    if (prediction[1].probability.toFixed(2) > threshold) {
      startFlag = !startFlag;
      status = "stand";
    }
  } else {
    let currentPoseProbability = prediction[modelClassTypeIndex].probability;
    if (answerFlag) {
      // X => STAND : 운동을 마무리
      if (prediction[1].probability.toFixed(2) > threshold) {
        status = "stand";
        answerFlag = !answerFlag;
        // 운동을 마무리해서, currentPose를 변경해줘야함
        changeActivityImg();
        temp();
        //
        // success
        //
      }
    } else {
      // STAND => X : 운동을 시작
      if (currentPoseProbability.toFixed(2) > threshold) {
        poseCount += 1;
        if (poseCount > 5) {
          status = currentPose;
          answerFlag = !answerFlag;
          poseCount = 0;
        }
      }
    }
  }

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    // probabilityContainer.childNodes[i].innerHTML = classPrediction;
  }

  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}

init();
