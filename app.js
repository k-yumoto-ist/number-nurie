const SVG_NS = "http://www.w3.org/2000/svg";

function withNumbers(parts) {
  return parts.map((part, index) => ({ ...part, number: index + 1 }));
}

const stages = [
  {
    id: "bouquet",
    name: "はなたば",
    parts: withNumbers([
      { kind: "circle", cx: 450, cy: 230, r: 52, label: [450, 230], color: "#ffe57b" },
      { kind: "ellipse", cx: 450, cy: 132, rx: 52, ry: 76, label: [450, 132], color: "#ff9fc2" },
      { kind: "ellipse", cx: 526, cy: 162, rx: 48, ry: 72, rotate: 42, label: [526, 162], color: "#ffc2d7" },
      { kind: "ellipse", cx: 555, cy: 238, rx: 50, ry: 74, rotate: 86, label: [555, 238], color: "#ff8db6" },
      { kind: "ellipse", cx: 512, cy: 308, rx: 48, ry: 72, rotate: 132, label: [512, 308], color: "#ffaecb" },
      { kind: "ellipse", cx: 430, cy: 326, rx: 50, ry: 74, rotate: 174, label: [430, 326], color: "#ff9fc2" },
      { kind: "ellipse", cx: 362, cy: 280, rx: 48, ry: 72, rotate: 224, label: [362, 280], color: "#ffc2d7" },
      { kind: "ellipse", cx: 344, cy: 198, rx: 50, ry: 74, rotate: 268, label: [344, 198], color: "#ff8db6" },
      { kind: "ellipse", cx: 382, cy: 142, rx: 48, ry: 72, rotate: 316, label: [382, 142], color: "#ffaecb" },
      { kind: "circle", cx: 244, cy: 254, r: 35, label: [244, 254], color: "#ffe57b" },
      { kind: "ellipse", cx: 244, cy: 190, rx: 35, ry: 52, label: [244, 190], color: "#ffb0cb" },
      { kind: "ellipse", cx: 294, cy: 230, rx: 34, ry: 50, rotate: 72, label: [294, 230], color: "#fca3c3" },
      { kind: "ellipse", cx: 276, cy: 292, rx: 34, ry: 50, rotate: 144, label: [276, 292], color: "#ffc7dc" },
      { kind: "ellipse", cx: 212, cy: 292, rx: 34, ry: 50, rotate: 216, label: [212, 292], color: "#fca3c3" },
      { kind: "ellipse", cx: 194, cy: 230, rx: 34, ry: 50, rotate: 288, label: [194, 230], color: "#ffc7dc" },
      { kind: "circle", cx: 660, cy: 284, r: 35, label: [660, 284], color: "#ffe57b" },
      { kind: "ellipse", cx: 660, cy: 220, rx: 35, ry: 52, label: [660, 220], color: "#ffd36b" },
      { kind: "ellipse", cx: 710, cy: 260, rx: 34, ry: 50, rotate: 72, label: [710, 260], color: "#fff099" },
      { kind: "ellipse", cx: 692, cy: 322, rx: 34, ry: 50, rotate: 144, label: [692, 322], color: "#ffd36b" },
      { kind: "ellipse", cx: 628, cy: 322, rx: 34, ry: 50, rotate: 216, label: [628, 322], color: "#fff099" },
      { kind: "ellipse", cx: 610, cy: 260, rx: 34, ry: 50, rotate: 288, label: [610, 260], color: "#ffd36b" },
      { kind: "path", d: "M450 362 C438 438 422 500 406 590", label: [428, 468], color: "#a6dc6e", strokeOnly: true, width: 18 },
      { kind: "path", d: "M250 335 C310 405 362 482 402 590", label: [292, 456], color: "#b9e983", strokeOnly: true, width: 18 },
      { kind: "path", d: "M655 365 C585 432 505 512 420 590", label: [598, 492], color: "#93d967", strokeOnly: true, width: 18 },
      { kind: "ellipse", cx: 326, cy: 412, rx: 42, ry: 78, rotate: 122, label: [326, 412], color: "#b9e983" },
      { kind: "ellipse", cx: 486, cy: 430, rx: 42, ry: 82, rotate: 38, label: [486, 430], color: "#a6dc6e" },
      { kind: "ellipse", cx: 585, cy: 440, rx: 40, ry: 76, rotate: 118, label: [585, 440], color: "#c7f08f" },
      { kind: "ellipse", cx: 390, cy: 508, rx: 38, ry: 74, rotate: 58, label: [390, 508], color: "#9fdd71" },
      { kind: "ellipse", cx: 540, cy: 535, rx: 38, ry: 72, rotate: 126, label: [540, 535], color: "#b9e983" },
      { kind: "path", d: "M356 588 C390 552 444 550 484 588 C446 622 391 624 356 588Z", label: [420, 584], color: "#c7f08f" },
      { kind: "circle", cx: 140, cy: 118, r: 42, label: [140, 118], color: "#c9f2fb" },
      { kind: "star", cx: 745, cy: 115, r1: 43, r2: 21, points: 5, label: [745, 115], color: "#ffe57b" },
      { kind: "path", d: "M760 450 C800 405 840 452 807 505 C792 530 764 551 760 552 C756 551 728 530 713 505 C680 452 720 405 760 450Z", label: [760, 486], color: "#c9f2fb" },
      { kind: "circle", cx: 132, cy: 462, r: 36, label: [132, 462], color: "#ffc2d7" },
      { kind: "star", cx: 190, cy: 560, r1: 37, r2: 18, points: 5, label: [190, 560], color: "#fff099" }
    ])
  },
  {
    id: "fish",
    name: "おさかな",
    parts: withNumbers([
      { kind: "ellipse", cx: 420, cy: 318, rx: 95, ry: 82, label: [420, 318], color: "#c9f2fb" },
      { kind: "ellipse", cx: 520, cy: 305, rx: 88, ry: 78, rotate: -10, label: [520, 305], color: "#9be8f5" },
      { kind: "ellipse", cx: 615, cy: 290, rx: 78, ry: 66, rotate: -8, label: [615, 290], color: "#c9f2fb" },
      { kind: "circle", cx: 682, cy: 276, r: 42, label: [665, 296], color: "#ffe57b" },
      { kind: "circle", cx: 698, cy: 262, r: 19, label: [704, 220], color: "#ffffff" },
      { kind: "circle", cx: 703, cy: 260, r: 9, label: [744, 272], color: "#527585" },
      { kind: "path", d: "M324 302 L214 222 C224 296 224 338 214 414 Z", label: [254, 316], color: "#ff9fc2" },
      { kind: "path", d: "M324 302 C295 275 258 247 214 222 C224 296 260 320 324 302Z", label: [266, 265], color: "#ffc2d7" },
      { kind: "path", d: "M324 338 C292 365 258 392 214 414 C225 344 262 322 324 338Z", label: [266, 374], color: "#ffaecb" },
      { kind: "path", d: "M486 236 C438 160 560 162 548 242Z", label: [512, 205], color: "#ffe57b" },
      { kind: "path", d: "M520 392 C465 456 600 465 588 374Z", label: [548, 420], color: "#fff099" },
      { kind: "ellipse", cx: 462, cy: 306, rx: 20, ry: 72, rotate: -8, label: [458, 366], color: "#ffb7d0" },
      { kind: "ellipse", cx: 532, cy: 300, rx: 19, ry: 70, rotate: -8, label: [532, 356], color: "#ffcfe0" },
      { kind: "ellipse", cx: 602, cy: 292, rx: 18, ry: 62, rotate: -8, label: [606, 346], color: "#ffb7d0" },
      { kind: "path", d: "M725 318 C746 310 762 294 772 270", label: [778, 326], color: "#ff9fc2", strokeOnly: true, width: 12 },
      { kind: "circle", cx: 160, cy: 140, r: 35, label: [160, 140], color: "#c9f2fb" },
      { kind: "circle", cx: 235, cy: 120, r: 25, label: [235, 120], color: "#e9fbff" },
      { kind: "circle", cx: 745, cy: 145, r: 31, label: [745, 145], color: "#c9f2fb" },
      { kind: "circle", cx: 795, cy: 215, r: 24, label: [795, 215], color: "#e9fbff" },
      { kind: "path", d: "M122 590 C150 520 112 455 140 390", label: [102, 540], color: "#b9e983", strokeOnly: true, width: 19 },
      { kind: "ellipse", cx: 118, cy: 456, rx: 28, ry: 58, rotate: -28, label: [92, 440], color: "#a6dc6e" },
      { kind: "ellipse", cx: 158, cy: 514, rx: 26, ry: 58, rotate: 32, label: [182, 508], color: "#c7f08f" },
      { kind: "path", d: "M750 600 C730 526 772 456 744 390", label: [724, 558], color: "#9fdd71", strokeOnly: true, width: 18 },
      { kind: "ellipse", cx: 716, cy: 472, rx: 26, ry: 56, rotate: 30, label: [694, 440], color: "#b9e983" },
      { kind: "ellipse", cx: 776, cy: 528, rx: 25, ry: 55, rotate: -32, label: [806, 522], color: "#c7f08f" },
      { kind: "star", cx: 360, cy: 110, r1: 38, r2: 18, points: 5, label: [360, 110], color: "#ffe57b" },
      { kind: "circle", cx: 470, cy: 112, r: 28, label: [470, 112], color: "#ffc2d7" },
      { kind: "star", cx: 600, cy: 122, r1: 34, r2: 16, points: 5, label: [600, 122], color: "#fff099" },
      { kind: "circle", cx: 258, cy: 550, r: 31, label: [258, 550], color: "#c9f2fb" },
      { kind: "circle", cx: 640, cy: 560, r: 34, label: [640, 560], color: "#ffc2d7" },
      { kind: "path", d: "M360 505 C430 535 520 534 600 500", label: [480, 520], color: "#ffe57b", strokeOnly: true, width: 16 },
      { kind: "circle", cx: 438, cy: 510, r: 22, label: [420, 558], color: "#fff099" }
    ])
  },
  {
    id: "rocket",
    name: "ロケット",
    parts: withNumbers([
      { kind: "path", d: "M450 78 C520 140 550 238 538 352 L362 352 C350 238 380 140 450 78Z", label: [412, 178], color: "#c9f2fb" },
      { kind: "path", d: "M450 78 C482 122 500 170 506 224 L394 224 C400 170 418 122 450 78Z", label: [482, 132], color: "#ff9fc2" },
      { kind: "circle", cx: 450, cy: 258, r: 52, label: [420, 262], color: "#ffe57b" },
      { kind: "circle", cx: 450, cy: 258, r: 28, label: [482, 252], color: "#e9fbff" },
      { kind: "path", d: "M362 352 L278 462 L362 432Z", label: [326, 410], color: "#ffb7d0" },
      { kind: "path", d: "M538 352 L622 462 L538 432Z", label: [574, 410], color: "#ffb7d0" },
      { kind: "path", d: "M392 352 L508 352 L492 430 L408 430Z", label: [450, 390], color: "#b9e983" },
      { kind: "path", d: "M408 430 L492 430 L450 540Z", label: [450, 460], color: "#ffe57b" },
      { kind: "path", d: "M430 430 L450 590 L470 430Z", label: [450, 540], color: "#ff9fc2" },
      { kind: "path", d: "M398 446 C352 496 372 560 428 598 C414 540 426 492 450 446Z", label: [388, 512], color: "#ffc2d7" },
      { kind: "path", d: "M502 446 C548 496 528 560 472 598 C486 540 474 492 450 446Z", label: [512, 512], color: "#ffd36b" },
      { kind: "ellipse", cx: 384, cy: 292, rx: 20, ry: 62, label: [372, 236], color: "#ffffff" },
      { kind: "ellipse", cx: 516, cy: 292, rx: 20, ry: 62, label: [516, 292], color: "#ffffff" },
      { kind: "circle", cx: 182, cy: 112, r: 39, label: [182, 112], color: "#ffe57b" },
      { kind: "star", cx: 286, cy: 166, r1: 32, r2: 15, points: 5, label: [286, 166], color: "#fff099" },
      { kind: "star", cx: 655, cy: 118, r1: 38, r2: 18, points: 5, label: [655, 118], color: "#ffe57b" },
      { kind: "circle", cx: 735, cy: 205, r: 33, label: [735, 205], color: "#c9f2fb" },
      { kind: "circle", cx: 160, cy: 290, r: 28, label: [160, 290], color: "#ffc2d7" },
      { kind: "star", cx: 244, cy: 360, r1: 35, r2: 17, points: 5, label: [244, 360], color: "#fff099" },
      { kind: "circle", cx: 705, cy: 364, r: 30, label: [705, 364], color: "#ffc2d7" },
      { kind: "circle", cx: 780, cy: 464, r: 35, label: [780, 464], color: "#c9f2fb" },
      { kind: "star", cx: 175, cy: 505, r1: 36, r2: 17, points: 5, label: [175, 505], color: "#ffe57b" },
      { kind: "path", d: "M312 606 C374 574 526 574 588 606", label: [450, 626], color: "#c9f2fb", strokeOnly: true, width: 18 },
      { kind: "circle", cx: 320, cy: 602, r: 25, label: [320, 602], color: "#e9fbff" },
      { kind: "circle", cx: 382, cy: 584, r: 29, label: [382, 584], color: "#ffc2d7" },
      { kind: "circle", cx: 518, cy: 584, r: 29, label: [518, 584], color: "#ffc2d7" },
      { kind: "circle", cx: 580, cy: 602, r: 25, label: [580, 602], color: "#e9fbff" },
      { kind: "path", d: "M112 404 C160 384 202 385 246 410", label: [178, 400], color: "#b9e983", strokeOnly: true, width: 15 },
      { kind: "path", d: "M652 528 C698 500 744 500 790 528", label: [720, 518], color: "#b9e983", strokeOnly: true, width: 15 },
      { kind: "circle", cx: 612, cy: 250, r: 24, label: [612, 250], color: "#fff099" },
      { kind: "circle", cx: 290, cy: 250, r: 24, label: [290, 250], color: "#fff099" },
      { kind: "star", cx: 624, cy: 608, r1: 30, r2: 14, points: 5, label: [658, 620], color: "#ffe57b" }
    ])
  }
];

const bouquet50ExtraParts = [
  { kind: "circle", cx: 82, cy: 82, r: 28, label: [82, 82], color: "#c9f2fb" },
  { kind: "star", cx: 260, cy: 70, r1: 30, r2: 14, points: 5, label: [260, 70], color: "#fff099" },
  { kind: "circle", cx: 612, cy: 58, r: 28, label: [612, 58], color: "#ffc2d7" },
  { kind: "star", cx: 820, cy: 92, r1: 32, r2: 15, points: 5, label: [820, 92], color: "#ffe57b" },
  { kind: "path", d: "M88 205 C118 236 102 280 88 294 C74 280 58 236 88 205Z", label: [88, 235], color: "#e9fbff" },
  { kind: "circle", cx: 95, cy: 360, r: 30, label: [95, 360], color: "#fff099" },
  { kind: "star", cx: 82, cy: 600, r1: 32, r2: 15, points: 5, label: [82, 600], color: "#ffe57b" },
  { kind: "circle", cx: 302, cy: 628, r: 29, label: [302, 628], color: "#c9f2fb" },
  { kind: "star", cx: 570, cy: 622, r1: 31, r2: 15, points: 5, label: [570, 622], color: "#fff099" },
  { kind: "path", d: "M728 590 C758 620 742 646 728 656 C714 646 698 620 728 590Z", label: [728, 620], color: "#ffc2d7" },
  { kind: "circle", cx: 824, cy: 572, r: 30, label: [824, 572], color: "#c9f2fb" },
  { kind: "star", cx: 824, cy: 350, r1: 31, r2: 15, points: 5, label: [824, 350], color: "#ffe57b" },
  { kind: "circle", cx: 820, cy: 210, r: 29, label: [820, 210], color: "#e9fbff" },
  { kind: "path", d: "M700 14 C730 44 714 72 700 84 C686 72 670 44 700 14Z", label: [700, 36], color: "#ffc2d7" },
  { kind: "circle", cx: 450, cy: 44, r: 29, label: [450, 44], color: "#fff099" }
];

stages.push({
  id: "bouquet50",
  name: "50まで",
  parts: withNumbers([
    ...stages[0].parts.map(({ number, ...part }) => part),
    ...bouquet50ExtraParts
  ])
});

let currentStageIndex = 0;
let parts = stages[currentStageIndex].parts;
let nextNumber = 1;

const partsLayer = document.querySelector("#partsLayer");
const labelsLayer = document.querySelector("#labelsLayer");
const sparklesLayer = document.querySelector("#sparkles");
const stagePicker = document.querySelector("#stagePicker");
const nextLabelEl = document.querySelector("#nextLabel");
const nextNumberEl = document.querySelector("#nextNumber");
const messageEl = document.querySelector("#message");
const resetButton = document.querySelector("#resetButton");

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function starPoints(cx, cy, outerRadius, innerRadius, points) {
  const result = [];
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    result.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return result.join(" ");
}

function buildShape(part) {
  if (part.kind === "circle") {
    return createSvgElement("circle", { cx: part.cx, cy: part.cy, r: part.r });
  }
  if (part.kind === "ellipse") {
    const shape = createSvgElement("ellipse", {
      cx: part.cx,
      cy: part.cy,
      rx: part.rx,
      ry: part.ry
    });
    if (part.rotate) shape.setAttribute("transform", `rotate(${part.rotate} ${part.cx} ${part.cy})`);
    return shape;
  }
  if (part.kind === "star") {
    return createSvgElement("polygon", {
      points: starPoints(part.cx, part.cy, part.r1, part.r2, part.points)
    });
  }
  return createSvgElement("path", { d: part.d });
}

function renderStageButtons() {
  stagePicker.replaceChildren();
  stages.forEach((stage, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `stage-button${index === currentStageIndex ? " is-active" : ""}`;
    button.textContent = stage.name;
    button.setAttribute("aria-pressed", index === currentStageIndex ? "true" : "false");
    button.addEventListener("click", () => loadStage(index));
    stagePicker.append(button);
  });
}

function renderParts() {
  partsLayer.replaceChildren();
  labelsLayer.replaceChildren();
  parts.forEach((part) => {
    const group = createSvgElement("g", {
      class: "part",
      tabindex: "0",
      role: "button",
      "aria-label": `${part.number}ばん`
    });
    group.dataset.number = String(part.number);
    group.style.setProperty("--part-color", part.color);

    const shape = buildShape(part);
    shape.classList.add("part-shape");
    if (part.strokeOnly) {
      shape.classList.add("is-stroke-only");
      shape.setAttribute("stroke-width", part.width);
    }

    group.append(shape);
    group.addEventListener("click", () => handlePick(part.number, group));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handlePick(part.number, group);
      }
    });
    partsLayer.append(group);

    const [labelX, labelY] = part.label;
    const labelGroup = createSvgElement("g", {
      class: "label-group",
      role: "button",
      "data-number": part.number
    });
    const badge = createSvgElement("circle", {
      class: "number-badge",
      cx: labelX,
      cy: labelY,
      r: part.number >= 10 ? 22 : 20
    });
    const hitArea = createSvgElement("circle", {
      class: "number-hit",
      cx: labelX,
      cy: labelY,
      r: 32
    });
    const label = createSvgElement("text", {
      class: "part-label",
      x: labelX,
      y: labelY
    });
    label.textContent = part.number;
    labelGroup.append(hitArea, badge, label);
    labelGroup.addEventListener("click", () => handlePick(part.number, group));
    labelsLayer.append(labelGroup);
  });
}

function renderSparkles() {
  sparklesLayer.replaceChildren();
  const sparkleData = [
    [110, 205], [180, 88], [300, 92], [602, 92], [810, 200], [808, 370],
    [692, 570], [290, 610], [92, 350], [448, 82], [700, 185], [585, 615]
  ];
  sparkleData.forEach(([cx, cy], index) => {
    const sparkle = createSvgElement("polygon", {
      class: "sparkle",
      points: `${cx},${cy - 26} ${cx + 9},${cy - 9} ${cx + 27},${cy} ${cx + 9},${cy + 9} ${cx},${cy + 28} ${cx - 9},${cy + 9} ${cx - 27},${cy} ${cx - 9},${cy - 9}`
    });
    sparkle.setAttribute("fill", index % 2 === 0 ? "#ffe57b" : "#ff9fc2");
    sparklesLayer.append(sparkle);
  });
}

function updateStatus(text) {
  const isFinished = nextNumber > parts.length;
  nextLabelEl.textContent = isFinished ? "やったね" : "つぎは";
  nextNumberEl.textContent = isFinished ? "かんせい" : `${nextNumber}ばん`;
  messageEl.textContent = text || (isFinished ? "できた！" : `${nextNumber}ばんを さがしてね`);
  messageEl.classList.toggle("is-finished", isFinished);
  document.querySelectorAll(".part").forEach((group) => {
    const number = Number(group.dataset.number);
    group.classList.toggle("is-current", number === nextNumber);
  });
}

function replayClass(element, className) {
  element.classList.remove(className);
  void element.getBoundingClientRect();
  element.classList.add(className);
  window.setTimeout(() => element.classList.remove(className), 380);
}

function handlePick(number, group) {
  if (number < nextNumber || nextNumber > parts.length) return;

  if (number !== nextNumber) {
    replayClass(group, "is-wrong");
    updateStatus(`${nextNumber}ばんだよ`);
    return;
  }

  group.classList.add("is-done");
  document.querySelector(`.label-group[data-number="${number}"]`)?.classList.add("is-done");
  replayClass(group, "is-pop");
  nextNumber += 1;

  if (nextNumber > parts.length) {
    updateStatus("できた！");
    sparklesLayer.classList.remove("is-active");
    void sparklesLayer.getBoundingClientRect();
    sparklesLayer.classList.add("is-active");
    return;
  }

  updateStatus("ぺたっ");
  window.setTimeout(() => {
    if (nextNumber <= parts.length) updateStatus(`${nextNumber}ばんを さがしてね`);
  }, 520);
}

function resetGame() {
  nextNumber = 1;
  document.querySelectorAll(".part").forEach((group) => {
    group.classList.remove("is-done", "is-pop", "is-wrong");
  });
  document.querySelectorAll(".label-group").forEach((group) => {
    group.classList.remove("is-done");
  });
  sparklesLayer.classList.remove("is-active");
  updateStatus("1ばんを さがしてね");
}

function loadStage(index) {
  if (index === currentStageIndex) return;
  currentStageIndex = index;
  parts = stages[currentStageIndex].parts;
  renderStageButtons();
  renderParts();
  resetGame();
}

renderSparkles();
renderStageButtons();
renderParts();
updateStatus();
resetButton.addEventListener("click", resetGame);
