const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //ctx=context

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

// 사각형 그리기 예시 1
// 사각형을 그리려면 기본적인 단계들을 하나씩 거쳐야 함
// - 사각형 선 그리기: ctx.rect(x, y, w, h);
// - 선의 색이 적용되지 않아서 보이지 않는다
// -> 다음 줄에 ctx.stroke() / ctx.fill() 해서 테두리만 그리거나 채울 수 있음
// - 끊어가기를 원하는 곳 맨 앞에 ctx.beginPath();추가해 새 경로 만들기.

// *요약
// - canvas에서 그림을 그릴 때는 단계별로 진행 필요
// - 그린 그림들의 경로를 나눌 수 있음
// -> 새 경로 시작하기: beginPath()
// 아래는 예시
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(200, 200, 100, 100);
// ctx.strokeStyle = "pink";
// ctx.stroke();

// ctx.beginPath();
// ctx.rect(300, 300, 100, 100);
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "black";
// ctx.fill();

// 사각형 그리기 예시 2
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();

// ctx.fillRect(200, 200, 50, 200); //왼쪽 벽
// ctx.fillRect(400, 200, 50, 200); //오른쪽 벽

// ctx.lineWidth = 2;
// ctx.fillRect(300, 300, 50, 100); //중앙 문

// ctx.fillRect(200, 200, 200, 20); //천장

// // 지붕 라인
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100); //오른쪽 라인
// ctx.lineTo(450, 200); //왼쪽 라인
// ctx.fill();

// **혼자 별 그려보기**
// ctx.moveTo(200, 600);
// ctx.lineTo(500, 600);
// ctx.lineTo(265, 450);
// ctx.lineTo(350, 700);
// ctx.lineTo(420, 450);
// ctx.lineTo(200, 600);
// ctx.stroke();

// **사람 그려보기**
// ctx.fillRect(210, 200, 15, 100);
// ctx.fillRect(350, 200, 15, 100);
// ctx.fillRect(260, 200, 60, 200);

// ctx.arc(290, 150, 50, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(270, 150, 6, 0, Math.PI, 2 * Math.PI);
// ctx.arc(310, 150, 6, 0, Math.PI, 2 * Math.PI);
// ctx.fill();

// ** 0,0에서 시작하는 라인 그리기**
// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
// ];

// function onClick(event) {
//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("mousemove", onClick);

function onMove(event) {
  if (isPainting) {
    //==isPainting : line그림
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  } //!==isPainting : line 그리지 않고 브러쉬만 조용히 움직임
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
