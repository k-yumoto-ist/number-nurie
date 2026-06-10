const SVG_NS = "http://www.w3.org/2000/svg";

const copy = {
  appName: "\u3059\u3046\u3058\u30b7\u30fc\u30eb",
  next: "\u3064\u304e\u306f",
  doneLabel: "\u3084\u3063\u305f\u306d",
  complete: "\u3067\u304d\u305f\uff01",
  completeShort: "\u304b\u3093\u305b\u3044",
  findFirst: "1\u3070\u3093\u3092 \u3055\u304c\u3057\u3066\u306d",
  findNumber: (number) => `${number}\u3070\u3093\u3092 \u3055\u304c\u3057\u3066\u306d`,
  nextNumber: (number) => `${number}\u3070\u3093`,
  wrong: (number) => `${number}\u3070\u3093\u3060\u3088`,
  sticker: "\u307a\u305f\u3063",
  countLabel: (count) => `${count}\u307e\u3067`
};

const pictureOptions = [
  { id: "bouquet", label: "\u306f\u306a\u305f\u3070" },
  { id: "fish", label: "\u304a\u3055\u304b\u306a" },
  { id: "rocket", label: "\u30ed\u30b1\u30c3\u30c8" }
];
const countOptions = [30, 50];

const palette = {
  pink: ["#ff9fc2", "#ffc2d7", "#ff8db6", "#ffaecb"],
  yellow: ["#ffe57b", "#fff099", "#ffd36b"],
  green: ["#b9e983", "#a6dc6e", "#c7f08f", "#9fdd71"],
  blue: ["#c9f2fb", "#e9fbff", "#9be8f5"],
  white: ["#ffffff", "#f8fbfc"]
};

function withNumbers(parts) {
  return parts.map((part, index) => ({ ...part, number: index + 1 }));
}

function spreadLabels(parts) {
  const minDistance = 62;
  const labels = parts.map((part) => ({
    anchor: [...part.label],
    label: [...part.label]
  }));

  for (let iteration = 0; iteration < 120; iteration += 1) {
    for (let i = 0; i < labels.length; i += 1) {
      for (let j = i + 1; j < labels.length; j += 1) {
        const a = labels[i].label;
        const b = labels[j].label;
        let dx = b[0] - a[0];
        let dy = b[1] - a[1];
        let distance = Math.hypot(dx, dy);
        if (distance === 0) {
          dx = 1;
          dy = 0;
          distance = 1;
        }
        if (distance < minDistance) {
          const push = (minDistance - distance) / 2;
          const nx = dx / distance;
          const ny = dy / distance;
          a[0] -= nx * push;
          a[1] -= ny * push;
          b[0] += nx * push;
          b[1] += ny * push;
        }
      }
    }

    labels.forEach((entry) => {
      entry.label[0] += (entry.anchor[0] - entry.label[0]) * 0.025;
      entry.label[1] += (entry.anchor[1] - entry.label[1]) * 0.025;
      entry.label[0] = Math.min(844, Math.max(56, entry.label[0]));
      entry.label[1] = Math.min(642, Math.max(42, entry.label[1]));
    });
  }

  return parts.map((part, index) => ({
    ...part,
    label: labels[index].label.map((value) => Math.round(value))
  }));
}

function finalizeParts(parts, limit) {
  return withNumbers(spreadLabels(parts.slice(0, limit)));
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function point(cx, cy, angle, distance) {
  const rad = degToRad(angle);
  return [Math.round(cx + Math.cos(rad) * distance), Math.round(cy + Math.sin(rad) * distance)];
}

function cycle(items, index) {
  return items[index % items.length];
}

function circle(cx, cy, r, color, label = [cx, cy]) {
  return { kind: "circle", cx, cy, r, label, color };
}

function ellipse(cx, cy, rx, ry, rotate, color, label = [cx, cy]) {
  return { kind: "ellipse", cx, cy, rx, ry, rotate, label, color };
}

function path(d, label, color, options = {}) {
  return { kind: "path", d, label, color, ...options };
}

function star(cx, cy, r1, r2, color, label = [cx, cy]) {
  return { kind: "star", cx, cy, r1, r2, points: 5, label, color };
}

function drop(cx, cy, scale, color, label = [cx, cy]) {
  return path(
    `M${cx} ${cy - 30 * scale} C${cx + 34 * scale} ${cy + 2 * scale} ${cx + 16 * scale} ${cy + 38 * scale} ${cx} ${cy + 48 * scale} C${cx - 16 * scale} ${cy + 38 * scale} ${cx - 34 * scale} ${cy + 2 * scale} ${cx} ${cy - 30 * scale}Z`,
    label,
    color
  );
}

function arcPanel(cx, cy, inner, outer, start, end, color, label) {
  const [x1, y1] = point(cx, cy, start, outer);
  const [x2, y2] = point(cx, cy, end, outer);
  const [x3, y3] = point(cx, cy, end, inner);
  const [x4, y4] = point(cx, cy, start, inner);
  const large = end - start > 180 ? 1 : 0;
  return path(
    `M${x1} ${y1} A${outer} ${outer} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${inner} ${inner} 0 ${large} 0 ${x4} ${y4}Z`,
    label,
    color
  );
}

function roundedPanel(x, y, width, height, color, label) {
  const r = Math.min(18, width / 4, height / 4);
  return path(
    `M${x + r} ${y} L${x + width - r} ${y} Q${x + width} ${y} ${x + width} ${y + r} L${x + width} ${y + height - r} Q${x + width} ${y + height} ${x + width - r} ${y + height} L${x + r} ${y + height} Q${x} ${y + height} ${x} ${y + height - r} L${x} ${y + r} Q${x} ${y} ${x + r} ${y}Z`,
    label,
    color
  );
}

function flowerPetalPieces(cx, cy, angle, colorIndex, detailed) {
  const colors = palette.pink;
  const pieces = [];
  const mid = point(cx, cy, angle, 92);
  const tip = point(cx, cy, angle, 150);
  pieces.push(ellipse(mid[0], mid[1], 38, 56, angle + 90, cycle(colors, colorIndex), mid));
  pieces.push(ellipse(tip[0], tip[1], 34, 48, angle + 90, cycle(colors, colorIndex + 1), tip));
  if (detailed) {
    const side = point(cx, cy, angle + 13, 122);
    pieces.push(ellipse(side[0], side[1], 24, 40, angle + 100, cycle(colors, colorIndex + 2), side));
  }
  return pieces;
}

function smallFlower(cx, cy, startAngle, detailed, colorOffset) {
  const pieces = [circle(cx, cy, 32, palette.yellow[0])];
  for (let i = 0; i < 5; i += 1) {
    const angle = startAngle + i * 72;
    const p1 = point(cx, cy, angle, 58);
    pieces.push(ellipse(p1[0], p1[1], 29, 42, angle + 90, cycle(palette.pink, i + colorOffset), p1));
    if (detailed) {
      const p2 = point(cx, cy, angle, 91);
      pieces.push(ellipse(p2[0], p2[1], 23, 34, angle + 90, cycle(palette.pink, i + colorOffset + 1), p2));
    }
  }
  return pieces;
}

function leafPieces(cx, cy, angle, colorIndex, detailed) {
  const pieces = [];
  const p1 = point(cx, cy, angle, 34);
  pieces.push(ellipse(p1[0], p1[1], 34, 66, angle + 90, cycle(palette.green, colorIndex), p1));
  if (detailed) {
    const p2 = point(cx, cy, angle, 78);
    pieces.push(ellipse(p2[0], p2[1], 28, 54, angle + 90, cycle(palette.green, colorIndex + 1), p2));
  }
  return pieces;
}

function createBouquetParts(detailed) {
  const parts = [];
  const cx = 450;
  const cy = 230;

  for (let i = 0; i < 8; i += 1) {
    parts.push(...flowerPetalPieces(cx, cy, -90 + i * 45, i, detailed));
  }

  for (let i = 0; i < 6; i += 1) {
    parts.push(arcPanel(cx, cy, 18, 68, i * 60 - 90, (i + 1) * 60 - 90, cycle(palette.yellow, i), point(cx, cy, i * 60 - 60, 44)));
  }

  parts.push(...smallFlower(238, 270, -90, detailed, 1));
  parts.push(...smallFlower(664, 296, -90, detailed, 2));

  parts.push(path("M450 360 C438 430 420 510 405 610", [424, 470], palette.green[1], { strokeOnly: true, width: 18 }));
  parts.push(path("M245 342 C310 420 360 505 402 610", [306, 466], palette.green[0], { strokeOnly: true, width: 18 }));
  parts.push(path("M658 368 C590 438 520 520 430 610", [594, 498], palette.green[2], { strokeOnly: true, width: 18 }));

  parts.push(...leafPieces(326, 418, 122, 0, detailed));
  parts.push(...leafPieces(492, 438, 38, 1, detailed));
  parts.push(...leafPieces(584, 454, 118, 2, detailed));
  parts.push(...leafPieces(404, 520, 58, 3, detailed));

  parts.push(path("M350 592 C388 552 446 552 492 592 C450 626 390 626 350 592Z", [420, 586], palette.green[2]));

  if (detailed) {
    parts.push(circle(128, 126, 34, palette.blue[0]));
    parts.push(star(762, 118, 32, 15, palette.yellow[0]));
  }

  return finalizeParts(parts, detailed ? 50 : 30);
}

function fishScale(x, y, width, height, color, label = [x + width / 2, y + height / 2]) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  return path(
    `M${x + 8} ${cy} C${x + 22} ${y + 4} ${x + width - 18} ${y + 2} ${x + width - 6} ${cy} C${x + width - 18} ${y + height - 2} ${x + 22} ${y + height - 4} ${x + 8} ${cy}Z`,
    [Math.round(label[0]), Math.round(label[1])],
    color
  );
}

function createFishParts(detailed) {
  const parts = [];
  const cols = detailed ? 6 : 5;
  const rows = detailed ? 4 : 3;
  const startX = 312;
  const startY = 214;
  const w = 64;
  const h = 58;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * 58 + (row % 2) * 20;
      const y = startY + row * 52;
      parts.push(fishScale(x, y, w, h, cycle([...palette.blue, ...palette.pink], row + col)));
    }
  }

  parts.push(path("M635 210 C728 220 766 282 718 352 C688 396 628 388 598 338 C572 292 584 230 635 210Z", [668, 296], palette.yellow[0]));
  parts.push(circle(704, 264, 31, palette.white[0], [704, 238]));
  parts.push(circle(710, 260, 12, "#527585", [746, 266]));
  parts.push(path("M716 326 C744 316 760 294 770 270", [766, 324], palette.pink[0], { strokeOnly: true, width: 12 }));
  if (detailed) {
    parts.push(path("M628 340 C662 365 700 362 725 330 C706 390 650 402 610 358Z", [670, 366], palette.pink[1]));
    parts.push(path("M642 218 C670 198 708 214 730 246 C692 226 666 224 642 238Z", [688, 212], palette.blue[1]));
  }

  const tail = [
    ["M306 292 L192 204 C210 278 210 342 192 416 Z", [248, 310], palette.pink[0]],
    ["M306 292 C278 262 238 230 192 204 C206 274 246 300 306 292Z", [250, 252], palette.pink[1]],
    ["M306 342 C276 368 236 394 192 416 C208 350 246 328 306 342Z", [250, 374], palette.pink[2]],
    ["M258 294 C232 310 232 330 258 346 C224 350 198 328 204 306 C214 292 234 288 258 294Z", [222, 322], palette.pink[3]]
  ];
  tail.forEach(([d, label, color]) => parts.push(path(d, label, color)));
  if (detailed) {
    parts.push(path("M204 204 C170 246 166 288 192 326 C146 292 144 238 204 204Z", [178, 256], palette.yellow[1]));
    parts.push(path("M192 326 C166 360 170 398 204 416 C144 394 146 342 192 326Z", [178, 380], palette.yellow[0]));
  }

  parts.push(path("M470 202 C430 136 548 134 552 214Z", [506, 176], palette.yellow[0]));
  parts.push(path("M520 392 C472 456 604 462 590 374Z", [548, 424], palette.yellow[1]));
  parts.push(path("M412 364 C378 420 444 438 476 374Z", [426, 404], palette.pink[0]));
  parts.push(path("M590 364 C624 418 684 396 650 342Z", [634, 382], palette.pink[1]));
  if (detailed) {
    parts.push(path("M470 202 C486 168 530 164 552 214 C520 198 494 198 470 202Z", [522, 198], palette.yellow[2]));
    parts.push(path("M520 392 C552 394 575 390 590 374 C584 432 540 436 520 392Z", [570, 410], palette.yellow[0]));
    parts.push(path("M412 364 C404 390 416 406 442 414 C392 420 374 392 412 364Z", [404, 396], palette.pink[2]));
    parts.push(path("M590 364 C618 356 640 348 650 342 C660 386 626 402 590 364Z", [630, 350], palette.pink[3]));
  }

  parts.push(path("M118 602 C146 528 112 456 142 392", [110, 526], palette.green[0], { strokeOnly: true, width: 17 }));
  parts.push(ellipse(116, 460, 25, 54, -28, palette.green[1], [92, 442]));
  parts.push(ellipse(160, 520, 24, 54, 32, palette.green[2], [184, 518]));
  parts.push(circle(160, 140, 30, palette.blue[0]));
  parts.push(circle(240, 118, 23, palette.blue[1]));
  if (detailed) {
    parts.push(fishScale(492, 426, 64, 52, palette.blue[1]));
  }

  return finalizeParts(parts, detailed ? 50 : 30);
}

function rocketBodyPanel(x1, x2, y1, y2, color, label) {
  const slopeTop = Math.abs(y1 - 86) / 290;
  const slopeBottom = Math.abs(y2 - 86) / 290;
  const leftTop = 450 - 74 * Math.min(1, slopeTop);
  const rightTop = 450 + 74 * Math.min(1, slopeTop);
  const leftBottom = 450 - 88 * Math.min(1, slopeBottom);
  const rightBottom = 450 + 88 * Math.min(1, slopeBottom);
  const xa1 = Math.max(leftTop, x1);
  const xb1 = Math.min(rightTop, x2);
  const xa2 = Math.max(leftBottom, x1);
  const xb2 = Math.min(rightBottom, x2);
  return path(`M${xa1} ${y1} L${xb1} ${y1} L${xb2} ${y2} L${xa2} ${y2}Z`, label, color);
}

function createRocketParts(detailed) {
  const parts = [];
  parts.push(path("M450 72 C486 112 506 156 514 208 L386 208 C394 156 414 112 450 72Z", [450, 120], palette.pink[0]));
  parts.push(path("M386 208 L514 208 L526 258 L374 258Z", [450, 234], palette.blue[0]));
  if (detailed) {
    parts.push(path("M414 116 C426 92 440 78 450 72 C440 120 436 154 436 208 L386 208 C392 166 402 136 414 116Z", [412, 160], palette.pink[1]));
    parts.push(path("M486 116 C474 92 460 78 450 72 C460 120 464 154 464 208 L514 208 C508 166 498 136 486 116Z", [488, 160], palette.pink[2]));
  }

  const bodyRows = detailed ? [[258, 306], [306, 354], [354, 402], [402, 450]] : [[258, 318], [318, 378], [378, 438]];
  const xBands = detailed ? [[364, 407], [407, 450], [450, 493], [493, 536]] : [[364, 421], [421, 479], [479, 536]];
  bodyRows.forEach((row, rowIndex) => {
    xBands.forEach((band, bandIndex) => {
      parts.push(rocketBodyPanel(band[0], band[1], row[0], row[1], cycle([...palette.blue, ...palette.white], rowIndex + bandIndex), [Math.round((band[0] + band[1]) / 2), Math.round((row[0] + row[1]) / 2)]));
    });
  });

  parts.push(circle(450, 284, 47, palette.yellow[0], [420, 284]));
  parts.push(circle(450, 284, 25, palette.blue[1], [482, 284]));
  parts.push(arcPanel(450, 284, 28, 50, -80, 80, palette.yellow[1], [450, 244]));
  parts.push(arcPanel(450, 284, 28, 50, 100, 260, palette.yellow[2], [450, 324]));
  if (detailed) {
    parts.push(arcPanel(450, 284, 13, 27, 0, 180, palette.white[0], [430, 260]));
    parts.push(arcPanel(450, 284, 13, 27, 180, 360, palette.white[1], [472, 308]));
  }

  parts.push(path("M364 360 L276 478 L364 438Z", [326, 412], palette.pink[0]));
  parts.push(path("M536 360 L624 478 L536 438Z", [574, 412], palette.pink[1]));
  parts.push(path("M300 444 L276 478 L364 438 L354 408Z", [328, 452], palette.pink[2]));
  parts.push(path("M600 444 L624 478 L536 438 L546 408Z", [572, 452], palette.pink[3]));
  if (detailed) {
    parts.push(path("M364 360 L318 420 L354 408Z", [344, 388], palette.yellow[1]));
    parts.push(path("M536 360 L582 420 L546 408Z", [556, 388], palette.yellow[2]));
  }

  parts.push(path("M392 450 L508 450 L492 492 L408 492Z", [450, 470], palette.green[0]));
  parts.push(path("M408 492 L492 492 L468 540 L432 540Z", [450, 514], palette.yellow[0]));
  parts.push(path("M432 540 L450 626 L468 540Z", [450, 576], palette.pink[0]));
  parts.push(path("M398 508 C350 548 376 612 430 636 C412 586 424 544 450 508Z", [394, 584], palette.pink[1]));
  parts.push(path("M502 508 C550 548 524 612 470 636 C488 586 476 544 450 508Z", [506, 584], palette.yellow[1]));
  if (detailed) {
    parts.push(path("M408 492 L450 492 L432 540Z", [426, 512], palette.yellow[2]));
    parts.push(path("M450 492 L492 492 L468 540Z", [474, 512], palette.yellow[0]));
    parts.push(path("M398 508 C370 544 376 584 410 610 C390 572 410 538 450 508Z", [382, 548], palette.pink[2]));
    parts.push(path("M502 508 C530 544 524 584 490 610 C510 572 490 538 450 508Z", [518, 548], palette.yellow[2]));
  }

  parts.push(circle(326, 622, 27, palette.blue[1]));
  parts.push(circle(386, 640, 27, palette.pink[1]));
  parts.push(circle(514, 640, 27, palette.pink[2]));
  parts.push(circle(574, 622, 27, palette.blue[1]));
  parts.push(star(180, 114, 32, 15, palette.yellow[0]));
  parts.push(circle(734, 164, 30, palette.blue[0]));
  if (detailed) {
    parts.push(star(270, 190, 28, 13, palette.yellow[1]));
    parts.push(circle(712, 356, 28, palette.pink[1]));
    parts.push(circle(450, 652, 24, palette.blue[1]));
  }

  return finalizeParts(parts, detailed ? 50 : 30);
}

const stages = [
  { id: "bouquet30", picture: "bouquet", count: 30, name: "\u306f\u306a\u305f\u3070 30\u307e\u3067", parts: createBouquetParts(false) },
  { id: "bouquet50", picture: "bouquet", count: 50, name: "\u306f\u306a\u305f\u3070 50\u307e\u3067", parts: createBouquetParts(true) },
  { id: "fish30", picture: "fish", count: 30, name: "\u304a\u3055\u304b\u306a 30\u307e\u3067", parts: createFishParts(false) },
  { id: "fish50", picture: "fish", count: 50, name: "\u304a\u3055\u304b\u306a 50\u307e\u3067", parts: createFishParts(true) },
  { id: "rocket30", picture: "rocket", count: 30, name: "\u30ed\u30b1\u30c3\u30c8 30\u307e\u3067", parts: createRocketParts(false) },
  { id: "rocket50", picture: "rocket", count: 50, name: "\u30ed\u30b1\u30c3\u30c8 50\u307e\u3067", parts: createRocketParts(true) }
];

globalThis.numberNurieStages = stages;

let currentStageIndex = 0;
let parts = stages[currentStageIndex].parts;
let nextNumber = 1;

const partsLayer = document.querySelector("#partsLayer");
const labelsLayer = document.querySelector("#labelsLayer");
const sparklesLayer = document.querySelector("#sparkles");
const picturePicker = document.querySelector("#picturePicker");
const countPicker = document.querySelector("#countPicker");
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
  const currentStage = stages[currentStageIndex];
  picturePicker.replaceChildren();
  countPicker.replaceChildren();

  pictureOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `stage-button${option.id === currentStage.picture ? " is-active" : ""}`;
    button.textContent = option.label;
    button.setAttribute("aria-pressed", option.id === currentStage.picture ? "true" : "false");
    button.addEventListener("click", () => loadStage(option.id, currentStage.count));
    picturePicker.append(button);
  });

  countOptions.forEach((count) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `stage-button${count === currentStage.count ? " is-active" : ""}`;
    button.textContent = copy.countLabel(count);
    button.setAttribute("aria-pressed", count === currentStage.count ? "true" : "false");
    button.addEventListener("click", () => loadStage(currentStage.picture, count));
    countPicker.append(button);
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
      "aria-label": copy.nextNumber(part.number)
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
    const badgeRadius = part.number >= 10 ? 24 : 22;
    const badge = createSvgElement("circle", {
      class: "number-badge",
      cx: labelX,
      cy: labelY,
      r: badgeRadius
    });
    const hitArea = createSvgElement("circle", {
      class: "number-hit",
      cx: labelX,
      cy: labelY,
      r: 34
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

function flashTinySparkle(group) {
  const sparkle = createSvgElement("circle", {
    class: "tap-spark",
    cx: group.querySelector(".part-shape")?.getBBox?.().x || 450,
    cy: group.querySelector(".part-shape")?.getBBox?.().y || 300,
    r: 8
  });
  sparkle.setAttribute("fill", "#ffe57b");
  sparklesLayer.append(sparkle);
  window.setTimeout(() => sparkle.remove(), 460);
}

function updateStatus(text) {
  const isFinished = nextNumber > parts.length;
  nextLabelEl.textContent = isFinished ? copy.doneLabel : copy.next;
  nextNumberEl.textContent = isFinished ? copy.completeShort : copy.nextNumber(nextNumber);
  messageEl.textContent = text || (isFinished ? copy.complete : copy.findNumber(nextNumber));
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
    updateStatus(copy.wrong(nextNumber));
    return;
  }

  group.classList.add("is-done");
  document.querySelector(`.label-group[data-number="${number}"]`)?.classList.add("is-done");
  replayClass(group, "is-pop");
  flashTinySparkle(group);
  nextNumber += 1;

  if (nextNumber > parts.length) {
    updateStatus(copy.complete);
    sparklesLayer.classList.remove("is-active");
    void sparklesLayer.getBoundingClientRect();
    sparklesLayer.classList.add("is-active");
    return;
  }

  updateStatus(copy.sticker);
  window.setTimeout(() => {
    if (nextNumber <= parts.length) updateStatus(copy.findNumber(nextNumber));
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
  updateStatus(copy.findFirst);
}

function loadStage(picture, count) {
  const index = stages.findIndex((stage) => stage.picture === picture && stage.count === count);
  if (index < 0 || index === currentStageIndex) return;
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
