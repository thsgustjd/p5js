let showIntro = true;
let startButton;

let x;
let y;
let scene1;
let scene2;
let scene3;
let scene1_1;
let trees = [];
let h;
let smokeParticles = [];
let alpha;
let factory1Height;
let factory1Y;
let factory3Y;
let factory3Height;
let carSmokeParticles = [];
let skyColor;
let fade;
let targetSkyColor;
let cloudColor;
let fogOpacity;
let groundColor;



let scene = 1;
let manX, manY;
let stopped = false;
let chocoStage = 0;
let drinkStage = 0;
let floatingTrash = [];

let lastAngle = 0;
let eating = false;
let eatTimer = 0;

let trashX = 250;
let trashY = 220;
let canX = 450;
let canY = 220;

let trashFallSpeed = 0.18;
let canFallSpeed = 0.3;
let chocoFloating = true;
let canFloating = true;

let ending = false;
let endTimer = 0;

let fishPosX = 100;
let fishPosY = 300;
let fishCaught = false;
let fishAppear = false;
let fishAppearTimer = 120;

let showEatingScene = false;
let eatFinalTimer = 60;
let hasEaten = false;            // 먹기 애니 끝났으면 true

// --- 추가된 변수: 먹은 후 움직임 제어 ---
let finalX, finalY;
let finalCanMove = false;
let finalStopped = false;
let movementResumed = false;
let stoppedAfterEating = false;
let netFish = [];

//현성

let sunlightFlickerAlpha = 0;
let count = 0;
let zoomScale = 1.0;

let fadeAlpha = 255;

let curtainOpen = 0;

let Scene = 1;

let zoomStartFrame = 0;

let doorW, doorH, doorX, doorY;

let fishBite = 0;

let holdingFish = false;

let charX;

let hasKey = false;

let Scene_ = 0;

let holdingAxe = false;

let rightTreeCut = false;

let leftTreeCut = false;

let walkAwayLeft = false;



let targetX;

let forestTrees = [];

let axeX, axeY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = createButton("START");
startButton.position(windowWidth / 2 - 40, windowHeight / 2 + 40);
startButton.size(80, 40);
startButton.style("font-size", "18px");
startButton.mousePressed(() => {
  showIntro = false;
  startButton.hide(); // 버튼 숨기기
});

  scene1 = false;
  scene2 = false;
  scene3 = false;
  scene1_1 = false;
  factory1Height = height * 0.13;
  factory1Y = height * 0.58 - factory1Height;
  factory3Height = height * 0.18;
  factory3Y = height * 0.58 - factory3Height;
  skyColor = color(135, 206, 235);
  fade = 0;
  h = 0;
  alpha = 150;
  targetSkyColor = color("#746C5C");
  cloudColor = color(255);
  targetCloudColor = color("#65645D");
  fogOpacity = 0;
  groundColor = color(34, 139, 34);
  targetGroundColor = color("#81714C");
  
  x = width / 2;
  y = height - 200;
  fishX = width / 2;
  fishY = height / 2;
  
  
  for (let row = 0; row < 2; row++) {
    for (let i = 0.05; i <= 0.95; i += 0.12) {
      let x = width * i;
      let baseY = row === 0 ? height * 0.52 : height * 0.56;
      let trunkHeight = height * 0.06 + random(-height * 0.01, height * 0.01);
      trees.push({ x, baseY, trunkHeight });
    }
  }
  for (let i = 0; i < 7; i++) {
  let size1 = random(0.5, 1.2);
  let x = random(50, width - 50);
  let y = random(100, 350);
  let vy = random(0.3, 1);
  let angle = random(-PI / 2, PI / 2);
  netFish.push({ x, y, size1, vy, angle });
    
  
  doorW = width * 0.2;

  doorH = height * 0.4;

  doorX = width * 0.76;

  doorY = height * 0.6 - doorH;
    
  charX = width / 2;
  }
  randomSeed(65);

  
  charX = width + 100;
  charX_2 = width/2;

  targetX = width / 2;

  for (let i = 0; i < 15; i++) {

  let x = random(width);

  let treeHeight = random(80, 150);

  forestTrees.push({ x, height: treeHeight });

  }

  frameRate(60);
}

function draw() {
  background(220);

  if (showIntro) {
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(28);
    text("환경파괴는 결국 인간에게 돌아옵니다", width / 2, height / 2 - 40);
    textSize(20);
    text("유승호, 손현성, 지재상", width / 2, height / 2);
    return; // 이후 코드 실행하지 않음
  }
  
  console.log(scene1);
  if (Scene === 1) {

    drawWakingUpView();

    if (fadeAlpha > 0) {

      fill(0, fadeAlpha);

      noStroke();

      rect(0, 0, width, height);

      fadeAlpha -= 4;

      if (frameCount <= 120) {

      curtainOpen = frameCount / 120.0;

      }

    }
  } else if (Scene === 2) {

      push();

      translate(-doorX * (zoomScale - 1), -doorY * (zoomScale - 1));

      scale(zoomScale);

      drawWakingUpView();

      pop();

      zoomScale += 0.05;

      if (frameCount - zoomStartFrame > 120) {
        if (count === 0) {
        Scene_ = 1;
        Scene = 3;
        count += 1;
        }
      }

    } 

    else if (Scene === 3) {
    background(230);
    
    drawWallAndFloor();
    if (Scene_ === 1) {
        
    drawStickmanBehindTable(charX_2, height * 0.75);

    }
    else if (Scene_ === 2) {
         drawStickmanBehindTable(charX_2, height * 0.75);
    }
    else {

    drawStickmanWithKey(charX_2, height * 0.75);
    if (charX_2 <= width + 20) {
        charX_2 += 5;
    }
    else {
        if (count === 1) {
            scene1 = true;
        }
        charX_2 = width/2;
        count++;
    }
    }

    if (holdingFish) {

    drawClippedFish(charX_2, height * 0.75 - 350, fishBite);

    } else {

    drawClippedFish(charX_2, height * 0.5 - 30, fishBite);

    }

    draw3DTableWithThickness(width / 2, height * 0.5, 300, 100, 20, 100);

    let keyX = width * 0.6;

    let keyY = height * 0.4;

    if (!hasKey) {

    fill(200, 200, 300);

    noStroke();

    ellipse(keyX, keyY, 20, 30);

    fill(100, 100, 150);

    triangle(keyX, keyY - 8, keyX - 6, keyY + 6, keyX + 6, keyY + 6);

    triangle(keyX, keyY + 8, keyX - 6, keyY - 6, keyX + 6, keyY - 6);

    }
    }
  if (scene1 === true) {
    drawBackground();
    drawStickMan(x, y);
  }
  else if (scene1_1 === true) {


    

    drawSky();

    drawSun();

    drawGrass();

    drawForest();

    if (!walkAwayLeft) {

    if (charX > targetX) {

    charX -= 5;

    } else {

    charX = targetX;

    }

    } else {

    charX -= 4;

    if (charX < -100) {
    scene2 = true;
    scene1_1 = false;
    
    

    }

    }

    drawOverlayTreesAndStumps();

    drawStickman(charX, height * 0.9);
  }
  else if (scene2 === true) {
    drawBackground2();
    if (frameCount % 10 === 0) {
    addSmoke(width * 0.137, factory1Y - height * 0.07);  // 굴뚝 1
    addSmoke(width * 0.178, factory1Y - height * 0.09);  // 굴뚝 2
    addSmoke(width * 0.69, factory3Y - height * 0.07);
    }
    if (keyIsDown(65)) {
      if (frameCount % 10 ==0) {
        createCarSmoke(x + 60, y - 20);
      }
    }
    else if (keyIsDown(68)) {
      if (frameCount % 10 == 0) {
      createCarSmoke(x - 60, y - 20);
      }
    }
    

    // 연기 업데이트 및 그리기
    updateSmoke();
    updateCarSmoke();
    drawStickmanInCar(x, y);
  }
  else if (scene3 == true) {
    drawBackground3();
    drawStickMan(x, y);
  }
  
  
  if (keyIsDown(65)) { // A
    x -= 3;
  }
  if (keyIsDown(68)) { // D
    x += 3;
  }
  
  manX = x;
  manY = y;
  
  if (x-10 <= 0) {
    if (scene1 === true) {
      x = width - 50;
      scene1 = false;
      scene1_1 = true;
    }
    else if (scene2 === true) {
      x = width - 50;
      scene2 = false;
      scene3 = true;
    }
  }
  if (x+10 >= width) {
    if (scene3 === true) {
      x = 50;
      scene2 = true;
      scene3 = false;
    }
    else if (scene2 === true) {
      x = 50;
      scene2 = false;
      scene1_1 = true;
    }
     
  }
  fill(30, 30, 30, fogOpacity);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);
  
  //여기서부터 재상 코드
  // --- 씬3 & 먹기 끝난 상태: A/D로 움직이다가 캔버스 중앙에서 정지 ---
  if (scene3 === true) {
  if (scene === 3 && hasEaten) {
  drawBackground3();

  
  // 움직임 허용 중일 때만 A/D 처리
  if (finalCanMove && !finalStopped) {
    if (keyIsDown(65)) finalX -= 3;  // 'A'
    if (keyIsDown(68)) finalX += 3;  // 'D'
    finalX = constrain(finalX, 0, width);

    // 중앙에 도달하면 멈추기
    if (abs(finalX - width / 2) < 3) {
      finalX = width / 2;
      finalStopped = true;
      finalCanMove = false;
    }
  }

  // 스틱맨 그리기
  drawStickMan(finalX, finalY);

  // 중앙 멈춤 후 복통 호소
  if (finalStopped) {
    drawStomachPain(finalX, finalY);
  }

  return;

  

  }

  // 이하 기존 draw() 로직
  updateFish();

  if (scene === 3) {
  drawBackground3();

  
  if (showEatingScene) {
    drawManEatingFish();
  } else {
    drawFishingStickman();

    if (!fishAppear) {
      fishAppearTimer--;
      if (fishAppearTimer <= 0) fishAppear = true;
    }
    if (fishAppear) drawMovingFish();
  }

  return;

  

  }

  if (scene === 1) {
  drawScene1();
  } else if (scene === 2) {
  drawScene2();
    }
  }
  
  //현성
  

}

function drawStickMan(x, y) {
  
  stroke(0);
  strokeWeight(2);
  fill(255);

  // 머리
  ellipse(x, y - 80, 30, 30);

  // 몸통 - 직사각형으로 두껍게
  rectMode(CENTER);
  
  rect(x, y - 40, 20, 50); // 가로 20, 세로 50의 몸통

  // 팔
  line(x - 10, y - 55, x - 25, y - 35);
  line(x + 10, y - 55, x + 25, y - 35);

  // 다리
  line(x, y - 15, x - 10, y + 20);
  line(x, y - 15, x + 10, y + 20);
}

function drawBackground() {
  push();

  // 하늘
  background(skyColor);

  // 태양
  noStroke();
  fill(255, 204, 0);
  ellipse(width * 0.9, height * 0.13, width * 0.08, height * 0.13);

  // 구름
  fill(cloudColor);
  ellipse(width * 0.15, height * 0.17, width * 0.06, height * 0.07);
  ellipse(width * 0.18, height * 0.17, width * 0.06, height * 0.07);
  ellipse(width * 0.165, height * 0.13, width * 0.06, height * 0.07);

  ellipse(width * 0.3, height * 0.1, width * 0.05, height * 0.05);
  ellipse(width * 0.33, height * 0.1, width * 0.05, height * 0.05);
  ellipse(width * 0.315, height * 0.075, width * 0.05, height * 0.05);

  ellipse(width * 0.6, height * 0.17, width * 0.06, height * 0.07);
  ellipse(width * 0.63, height * 0.17, width * 0.06, height * 0.07);
  ellipse(width * 0.615, height * 0.13, width * 0.06, height * 0.07);

  ellipse(width * 0.75, height * 0.12, width * 0.05, height * 0.05);
  ellipse(width * 0.78, height * 0.12, width * 0.05, height * 0.05);
  ellipse(width * 0.765, height * 0.092, width * 0.05, height * 0.05);

  // 풀밭
  fill(groundColor);
  rectMode(CORNER);
  rect(0, height * 0.58, width, height * 0.42);

  // 나무들
  // 나무 배열 (앞쪽 + 뒤쪽 레이어)
  for (let t of trees) {
    let foliageY = t.baseY - t.trunkHeight;

    // 트렁크
    fill(139, 69, 19);
    rect(t.x, t.baseY, width * 0.015, t.trunkHeight);

    // 잎사귀
    fill(34, 139, 34);
    ellipse(t.x + width * 0.007, foliageY, width * 0.05, height * 0.08);
    ellipse(t.x - width * 0.007, foliageY + height * 0.015, width * 0.045, height * 0.07);
    ellipse(t.x + width * 0.018, foliageY + height * 0.015, width * 0.045, height * 0.07);
  }

  
  
  let cabinX = width * 0.4;
  let cabinY = height * 0.6;
  let cabinW = width * 0.2;
  let cabinH = height * 0.12;
  // 🌳 가운데 나무집 추가
  fill (129, 59, 9);
  rect(cabinX, cabinY, cabinW, cabinH);
  for (let i = 0; i < 6; i++) {
    fill(139, 69, 19);
    rect(cabinX, cabinY + (i * (cabinH / 6)), cabinW, cabinH / 6 - 2);
  }
  
  

  // 지붕 - 경사형 삼각 지붕
  fill(101, 67, 33);
  triangle(
    cabinX - width * 0.02,
    cabinY,
    cabinX + cabinW / 2,
    cabinY - height * 0.08,
    cabinX + cabinW + width * 0.02,
    cabinY
  );

  // 창문 - 좌우 하나씩, 창살 스타일
  fill(210, 235, 255);
  rect(cabinX + cabinW * 0.1, cabinY + cabinH * 0.3, cabinW * 0.15, cabinH * 0.3);
  rect(cabinX + cabinW * 0.75, cabinY + cabinH * 0.3, cabinW * 0.15, cabinH * 0.3);
  stroke(139, 69, 19);
  strokeWeight(2);
  line(cabinX + cabinW * 0.175, cabinY + cabinH * 0.3, cabinX + cabinW * 0.175, cabinY + cabinH * 0.6);
  line(cabinX + cabinW * 0.825, cabinY + cabinH * 0.3, cabinX + cabinW * 0.825, cabinY + cabinH * 0.6);
  line(cabinX + cabinW * 0.1, cabinY + cabinH * 0.45, cabinX + cabinW * 0.25, cabinY + cabinH * 0.45);
  line(cabinX + cabinW * 0.75, cabinY + cabinH * 0.45, cabinX + cabinW * 0.9, cabinY + cabinH * 0.45);
  noStroke();

  // 문
  fill(100, 50, 20);
  rect(cabinX + cabinW * 0.4, cabinY + cabinH * 0.3, cabinW * 0.2, cabinH * 0.7);
  fill(255, 215, 0); // 문고리
  ellipse(cabinX + cabinW * 0.53, cabinY + cabinH * 0.65, width * 0.005);
  
  // 길 만들기
  fill("#E5CD96");
  rect(0, height * 0.72, width, height*0.15);
  
  pop();
}

function drawFactories() {
  rectMode(CORNER);
  noStroke();

  // 공장 1: 기본형 + 굴뚝 2개
  
  fill(120);
  rect(width * 0.1, factory1Y, width * 0.12, factory1Height);

  fill(180);
  rect(width * 0.11, factory1Y + factory1Height * 0.3, width * 0.02, height * 0.033);
  rect(width * 0.145, factory1Y + factory1Height * 0.3, width * 0.02, height * 0.033);
  rect(width * 0.18, factory1Y + factory1Height * 0.3, width * 0.02, height * 0.033);

  fill(100);
    // 굴뚝 1
  rect(width * 0.13, factory1Y - height * 0.07, width * 0.015, height * 0.07);

  // 굴뚝 2
  rect(width * 0.17, factory1Y - height * 0.09, width * 0.015, height * 0.09);

  fill(200, 200, 200, 150);
  

  // 공장 2: 삼각 지붕형
  let factory2Height = height * 0.11;
  let factory2Y = height * 0.58 - factory2Height;
  fill(150);
  rect(width * 0.35, factory2Y, width * 0.12, factory2Height);
  fill(110);
  triangle(
    width * 0.35,
    factory2Y,
    width * 0.41,
    factory2Y - height * 0.07,
    width * 0.47,
    factory2Y
  );

  fill(220);
  rect(width * 0.36, factory2Y + factory2Height * 0.27, width * 0.025, height * 0.03);
  rect(width * 0.395, factory2Y + factory2Height * 0.27, width * 0.025, height * 0.03);
  rect(width * 0.43, factory2Y + factory2Height * 0.27, width * 0.025, height * 0.03);

  // 공장 3: 높고 좁은 건물
  
  fill(130);
  rect(width * 0.65, factory3Y, width * 0.08, factory3Height);

  fill(180);
  for (let y = 0; y < 4; y++) {
    rect(
      width * 0.66,
      factory3Y + height * 0.03 + y * height * 0.035,
      width * 0.015,
      height * 0.025
    );
    rect(
      width * 0.69,
      factory3Y + height * 0.03 + y * height * 0.035,
      width * 0.015,
      height * 0.025
    );
  }

  fill(90);
  rect(width * 0.685, factory3Y - height * 0.07, width * 0.01, height * 0.07);

  
}



function drawBackground2() {
  push();
  rectMode(CORNERS);

  // 하늘
  background(skyColor);

  // 태양
  noStroke();
  fill(255, 204, 0);
  ellipse(width * 0.3, height * 0.13, width * 0.08, height * 0.13); // 왼쪽 위치로 이동

  // 구름
  fill(cloudColor);
  ellipse(width * 0.15, height * 0.17, width * 0.06, height * 0.07);
  ellipse(width * 0.18, height * 0.17, width * 0.06, height * 0.07);
  ellipse(width * 0.165, height * 0.13, width * 0.06, height * 0.07);

  ellipse(width * 0.4, height * 0.1, width * 0.05, height * 0.05);
  ellipse(width * 0.43, height * 0.1, width * 0.05, height * 0.05);
  ellipse(width * 0.415, height * 0.075, width * 0.05, height * 0.05);

  // 풀밭
  fill(groundColor);
  rectMode(CORNERS);
  rect(0, height, width, height * 0.58); // 아래쪽에 위치

  // 도로
  rectMode(CORNER);
  fill(50);
  rect(0, height * 0.58, width, height * 0.29); // 중간 아래 부분
  
  rectMode(CORNERS);
  // 도로 선 (가운데 흰 점선)
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += width * 0.04) {
    line(i, height * 0.7, i + width * 0.02, height * 0.7);
  }

  drawFactories();

  pop();
}


function drawBackground3() {
  push();
  rectMode(CORNER);
  noStroke();

  // 하늘
  background(skyColor);

  // 땅
  fill(groundColor); // 짙은 풀색
  rect(0, height * 0.58, width, height * 0.42); // 하단 42% 지면

  // 산
  fill(100, 180, 100);
  triangle(width * 0.1, height * 0.58, width * 0.2, height * 0.3, width * 0.3, height * 0.58);
  triangle(width * 0.25, height * 0.58, width * 0.38, height * 0.33, width * 0.5, height * 0.58);

  // 바다
  fill(70, 130, 180);
  rect(0, height * 0.83, width, height * 0.17);

  // 방파제
  fill(90);
  rect(0, height * 0.815, width, height * 0.015);

  // 부두
  fill(139, 69, 19);
  rect(width * 0.1, height * 0.77, width * 0.15, height * 0.025);
  for (let i = 0; i < 5; i++) {
    rect(width * 0.11 + i * width * 0.03, height * 0.795, width * 0.01, height * 0.05);
  }

  

  // 항구 건물 1
  fill(160);
  rect(width * 0.45, height * 0.5, width * 0.08, height * 0.1);
  fill(100);
  rect(width * 0.46, height * 0.517, width * 0.02, height * 0.033);
  rect(width * 0.49, height * 0.517, width * 0.02, height * 0.033);

  // 항구 건물 2
  fill(170);
  rect(width * 0.55, height * 0.467, width * 0.06, height * 0.133);
  fill(90);
  rect(width * 0.56, height * 0.492, width * 0.02, height * 0.033);
  rect(width * 0.585, height * 0.492, width * 0.015, height * 0.033);

  // 작은 창고
  fill(140);
  rect(width * 0.64, height * 0.533, width * 0.05, height * 0.067);
  fill(100);
  rect(width * 0.65, height * 0.55, width * 0.015, height * 0.025);

  pop();
}

function updateSmoke() {
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    let p = smokeParticles[i];
    if (p.y > 0) {
      p.y -= 0.3; 
    }// 천천히 위로
    else {
      p.y += 0;
    }
          // 점점 사라짐
    p.x += 0.05;
    p.size += 0.05;
    smoke(p);            // 입자 하나 그리기
    if (keyIsPressed === true) {
    if (key === " ") {
      p.alpha -= 3;
      if (p.alpha <= 0) {
        smokeParticles.splice(i, 1); // 완전히 사라진 연기는 제거
        continue;
        }
      if (fogOpacity < 100) fogOpacity += 0.02;
      if (fade < 1) {
        fade += 0.00002;
        skyColor = lerpColor(color(135, 206, 235), targetSkyColor,   fade);
        cloudColor = lerpColor(cloudColor, targetCloudColor, fade/10);
        groundColor = lerpColor(groundColor, targetGroundColor, fade/10);
        }
      }
    }
  }
}

function smoke(particle) {
  push();
  fill(120, 120, 120, particle.alpha);
  noStroke();
  ellipse(particle.x, particle.y, particle.size);
  pop();
}

function updateCarSmoke() {
  for (let i = carSmokeParticles.length - 1; i >= 0; i--) {
    let p = carSmokeParticles[i];
    if (p.y > 0) {
      p.y -= 0.5; 
    }// 천천히 위로
    else {
      p.y += 0;
    }       // 위로 천천히 올라감
    if (p.size <= 50) {
      p.size += 0.2;    // 점점 커짐
    }
    
    fill(200, 200, 200, p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);
        // 점점 투명해짐
    if (keyIsPressed === true) {
    if (key === " ") {
      if (fogOpacity < 100) fogOpacity += 0.02;
      p.alpha -= 3;
      if (p.alpha <= 0) {
        carSmokeParticles.splice(i, 1); // 완전히 사라진 연기는 제거
        continue;
      }
    
    

    // 너무 투명해지면 제거
    if (fade < 1) {
        fade += 0.00002;
        skyColor = lerpColor(color(135, 206, 235), targetSkyColor,   fade);
        cloudColor = lerpColor(cloudColor, targetCloudColor, fade/10);
        groundColor = lerpColor(groundColor, targetGroundColor, fade/10);
        }
      }
    }
  }
}




function addSmoke(x, y) {
  smokeParticles.push({
    x: x,
    y: y,
    size: 10,
    alpha: 200
  });
}

function createCarSmoke(x, y) {
  carSmokeParticles.push({
    x: x,
    y: y,
    size: 5,
    alpha: 200
  });
}


function drawStickmanInCar(x, y) {
  push();

  // 차 본체
  fill(70, 130, 180); // 파란 차
  rectMode(CENTER);
  rect(x, y, 100, 40); // 차 몸통
  rect(x, y - 20, 60, 30); // 창문 부분

  // 바퀴
  fill(0);
  ellipse(x - 30, y + 20, 20, 20);
  ellipse(x + 30, y + 20, 20, 20);

  // 졸라맨 머리 (차 안에)
  fill(0);
  ellipse(x, y - 25, 20, 20);

  pop();
}

//재상햄 코드

function drawScene1() {
  let stopX1 = width * 0.11;
  let stopX2 = width * 0.14;

  if (!stopped && manX > stopX1 && manX < stopX2) {
  stopped = true;


  chocoStage = 1;
  setTimeout(() => chocoStage = 2, 1500);
  setTimeout(() => {
    chocoStage = 3;
    floatingTrash.push({ x: manX - 35, y: manY - 55, velX: 3, velY: -6, type: 'choco', phase: 'air' });
    drinkStage = 2;
    setTimeout(() => {
      drinkStage = 3;
      floatingTrash.push({ x: manX + 30, y: manY - 55, velX: 3, velY: -6, type: 'can', phase: 'air' });
    }, 1500);
  }, 3000);



  }

  drawBackground3();
  handleMovement();
  drawStickMan(manX, manY);
  drawChocolateScene();
  drawDrinkScene();
  drawFloatingTrash();

  let allGone = floatingTrash.length > 1 && floatingTrash.every(t => t.x < -30 || t.x > width + 30);
  if (allGone) {
  scene = 2;
  }
}

function drawScene2() {
  drawOceanBackground();

  let fishX = mouseX;
  let fishY = constrain(mouseY, 220, height);
  let dx = fishX - pmouseX;
  let dy = fishY - pmouseY;
  if (abs(dx) > 0.01 || abs(dy) > 0.01) {
  lastAngle = atan2(dy, dx);
  }

  if (!chocoFloating && !canFloating && !ending) {
  ending = true;
  endTimer = 180;
  }

  if (ending) {
  endTimer--;
  if (endTimer <= 0) {
  scene = 3;
  fishAppearTimer = 120;
  fishAppear = false;
  fishCaught = false;
  fishPosX = width * 0.18 + 120;
  fishPosY = height * 0.91 + 50;
  return;
  }
  }

  if (chocoFloating) {
  drawFloatingTrash2(trashX, trashY, 'choco');
  checkCollision(fishX, fishY, trashX, trashY, 'choco');
  trashY += trashFallSpeed;
  }

  if (canFloating) {
  drawFloatingTrash2(canX, canY, 'can');
  checkCollision(fishX, fishY, canX, canY, 'can');
  canY += canFallSpeed;
  }

  if (eating) {
  eatTimer--;
  if (eatTimer <= 0) eating = false;
  }

  drawFish(fishX, fishY, lastAngle);
}

function drawFishingStickman() {
  let fx = width * 0.18;
  let fy = height * 0.77 - 20;

  stroke(0);
  strokeWeight(2);
  fill(255);

  ellipse(fx, fy - 80, 30, 30);
  rectMode(CENTER);
  rect(fx, fy - 40, 20, 50);

  line(fx, fy - 15, fx - 10, fy + 20);
  line(fx, fy - 15, fx + 10, fy + 20);

  line(fx + 10, fy - 55, fx + 40, fy - 75);

  if (!showEatingScene) {
  stroke(139, 69, 19);
  strokeWeight(4);
  line(fx + 40, fy - 75, fx + 120, fy - 240);
  stroke(0);
  strokeWeight(1);
  line(fx + 120, fy - 240, fx + 120, height * 0.91);
  }

  let fishDist = dist(fishPosX, fishPosY, fx + 120, height * 0.91);
  if (fishDist < 20 && scene === 3 && !fishCaught && fishAppear) {
  fishCaught = true;
  }

  if (fishCaught) {
  fishPosX = fx + 120;
  fishPosY -= 2;
  if (fishPosY < fy - 75) {
  fishPosY = fy - 75;
  showEatingScene = true;
  }
  lastAngle = -HALF_PI;
  }
}

function drawManEatingFish() {
  let fx = width * 0.18;
  let fy = height * 0.77 - 20;

  stroke(0);
  strokeWeight(2);
  fill(255);

  ellipse(fx, fy - 80, 30, 30);
  rectMode(CENTER);
  rect(fx, fy - 40, 20, 50);

  line(fx + 10, fy - 55, fx + 40, fy - 95);
  line(fx - 10, fy - 55, fx - 25, fy - 35);

  line(fx, fy - 15, fx - 10, fy + 20);
  line(fx, fy - 15, fx + 10, fy + 20);

  if (eatFinalTimer > 0) {
  push();
  translate(fx + 40, fy - 95);
  rotate(-PI / 2);
  scale(0.6);

  
  fill(0, 150, 200);
  triangle(-60, 0, -80, 20, -80, -20);
  fill(135, 206, 250);
  noStroke();
  ellipse(0, 0, 120, 40);

  noFill();
  stroke(0);
  strokeWeight(2);
  for (let i = -20; i >= -30; i -= 5) {
    arc(i, 0, 20, 40, radians(300), radians(60));
  }

  fill(0);
  noStroke();
  circle(40, -3, 5);
  pop();

  if (floor(eatFinalTimer / 6) % 2 === 0) {
    fill(0);
    arc(fx + 10, fy - 85, 10, 10, QUARTER_PI, -QUARTER_PI, OPEN);
  }

  eatFinalTimer--;

  

  } else {
  showEatingScene = false;
  hasEaten = true;
  finalCanMove = true;
  finalX = fx;
  finalY = fy;
  }
  }

  function drawStomachPain(x, y) {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);

  const rows     = 3;       // 물결 줄 수
  const points   = 15;      // 한 줄당 점 개수
  const waveW    = 12;      // 파장 너비(px)
  const amp      = 2;       // 진폭
  const vSpacing = 10;      // 줄 간 세로 간격
  const hOffset  = 5;       // 몸에 더 붙일 수록 작게

  // 위↗, 중앙→, 아래↘ 순서
  const angles = [-PI/6, 0, PI/6];

  // 기준 Y (스틱맨 배 높이)
  const baseY = y - 40;

  for (let r = 0; r < rows; r++) {
  let angle   = angles[r];
  let offsetY = baseY + (r - 1) * vSpacing;  // r=0: 위, 1: 중앙, 2: 아래
  push();
  translate(x + hOffset, offsetY);
  rotate(angle);
  beginShape();
  for (let i = 0; i <= points; i++) {
  let t  = map(i, 0, points, 0, TWO_PI);
  let vx = map(i, 0, points, 0, waveW);
  let vy = sin(t) * amp;
  vertex(vx, vy);
  }
  endShape();
  pop();
  }
}

function handleMovement() {
  if (stopped || scene !== 1) return;

  if (keyIsDown(65)) manX -= 4;
  if (keyIsDown(68)) manX += 4;

  manX = constrain(manX, 0, width);
  }

  function drawChocolateScene() {
  if (chocoStage === 0 || chocoStage === 3) return;

  let cx = manX - 35;
  let cy = manY - 55;
  let w = 24;
  let h = 48;

  if (chocoStage === 1) {
  fill('#654321');
  rect(cx, cy, w, h / 2, 4);
  fill('#a02be2');
  rect(cx, cy + h / 2, w, h / 2);
  } else if (chocoStage === 2) {
  fill('#a02be2');
  rect(cx, cy + h / 2, w, h / 2);
  }
}

function drawDrinkScene() {
  if (drinkStage === 1 || drinkStage === 2) {
  let dx = manX + 30;
  let dy = manY - 55;
  fill('#87cefa');
  rect(dx, dy, 20, 40, 5);
  }
}

function drawFloatingTrash() {
  let floatY = height * 0.89;
  for (let t of floatingTrash) {
  if (t.phase === 'air') {
  t.x += t.velX;
  t.y += t.velY;
  t.velY += 0.3;
  if (t.y > floatY) {
  t.phase = 'float';
  t.velX = -1.5;
  t.velY = 0;
  t.y = floatY;
  }
  } else if (t.phase === 'float') {
  t.x += t.velX;
  }
  if (t.type === 'choco') {
  fill('#a02be2');
  rect(t.x, t.y, 20, 20);
  } else if (t.type === 'can') {
  fill('#87cefa');
  rect(t.x, t.y, 16, 32, 5);
  }
  }
}

function drawFloatingTrash2(x, y, type) {
  if (type === 'choco') {
  fill('#a02be2');
  rect(x, y, 30, 30, 5);
  } else {
  fill('#87cefa');
  rect(x, y, 20, 40, 5);
  }
}



function checkCollision(fx, fy, tx, ty, type) {
  let d = dist(fx, fy, tx + 10, ty + 20);
  if (d < 30 && !eating) {
  if (type === 'choco') chocoFloating = false;
  if (type === 'can') canFloating = false;
  eating = true;
  eatTimer = 45;
  }
}

function drawMovingFish() {
  push();
  translate(fishPosX, fishPosY);
  rotate(lastAngle);
  scale(0.6, 0.6);

  fill(0, 150, 200);
  triangle(-60, 0, -80, 20, -80, -20);

  fill(135, 206, 250);
  noStroke();
  ellipse(0, 0, 120, 40);

  noFill();
  stroke(0);
  strokeWeight(2);
  for (let i = -20; i >= -30; i -= 5) {
  arc(i, 0, 20, 40, radians(300), radians(60));
  }
  pop();

  let headDistance = 40;
  let eyeX = fishPosX + cos(lastAngle) * headDistance * 0.6;
  let eyeY = fishPosY + sin(lastAngle) * headDistance * 0.6 - 3;
  fill(0);
  noStroke();
  circle(eyeX, eyeY, 5);
}

function drawFish(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  scale(1);
  fill(0, 150, 200);
  triangle(-60, 0, -80, 20, -80, -20);
  fill(135, 206, 250);
  noStroke();
  ellipse(0, 0, 120, 40);
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let i = -20; i >= -30; i -= 5) {
  arc(i, 0, 20, 40, radians(300), radians(60));
  }
  if (eating && floor(eatTimer / 7) % 2 === 0) {
  fill(0);
  arc(50, 0, 20, 20, QUARTER_PI, -QUARTER_PI, OPEN);
  }
  pop();

  let headDistance = 40;
  let eyeX = x + cos(angle) * headDistance;
  let eyeY = y + sin(angle) * headDistance - 5;
  fill(0);
  noStroke();
  circle(eyeX, eyeY, 5);
}

function updateManAfterEating() {
  if (movementResumed && !stoppedAfterEating) {
  if (keyIsDown(65)) manX -= 3;
  if (keyIsDown(68)) manX += 3;
  manX = constrain(manX, 0, width);

  
  if (manX >= width / 2 - 10 && manX <= width / 2 + 10) {
    stoppedAfterEating = true;
  }

  

  }
}

function updateFish() {
  if (scene === 3 && !fishCaught) {
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  if (abs(dx) > 0.01 || abs(dy) > 0.01) {
  lastAngle = atan2(dy, dx);
  }
  fishPosX = mouseX;
  fishPosY = constrain(mouseY, height * 0.83, height * 0.91);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  manY = height * 0.77 - 20;
}

function keyPressed() {
  if (scene === 3 && hasEaten && !eating) {
  // 필요에 따라 리셋 로직 추가 가능
  }
}

function drawOceanBackground() {
  background('#B0E0E6');
  fill('#4682B4');
  beginShape();
  vertex(0, 220);
  vertex(width, 220);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

//현성

function windowResized() {

resizeCanvas(windowWidth, windowHeight);

}
  
function drawWakingUpView() {

  background(220);

  let winW = width * 0.3;

  let winH = height * 0.3;

  let winX = width / 2 - winW / 2;

  let winY = height * 0.15;

  if (fadeAlpha <= 0 && curtainOpen > 0.4 && frameCount < 120 && frameCount % int(random(3, 10)) === 0) {

    sunlightFlickerAlpha = random(40, 90);

  } else if (frameCount >= 120) {

    sunlightFlickerAlpha = 0;

  }
  fill(210, 235, 255);

  rect(winX, winY, winW, winH);

  stroke(160);

  strokeWeight(4);

  line(winX + winW / 2, winY, winX + winW / 2, winY + winH);

  line(winX, winY + winH / 2, winX + winW, winY + winH / 2);

  noStroke();

  if (curtainOpen > 0.4) {

    noStroke();

    fill(255, 255, 150, 100);

    beginShape();

    vertex(winX, winY + winH);

    vertex(winX + winW, winY + winH);

    vertex(winX + winW * 1.2, height);

    vertex(winX - winW * 0.2, height);

    endShape(CLOSE);
  }
  let curtainW = (winW / 2) * (1.0 - curtainOpen);

  fill(180, 100, 100);

  rect(winX, winY, curtainW, winH);

  rect(winX + winW - curtainW, winY, curtainW, winH);

  fill(190, 140, 100);

  rect(doorX, doorY, doorW, doorH);

  fill(255, 215, 0);

  ellipse(doorX + doorW * 0.85, doorY + doorH * 0.5, 10);

  if (fadeAlpha <= 0 && Scene === 1 && frameCount >= 180) {

    glowInteraction(doorX, doorY, doorW, doorH);

    }

  fill(230, 230, 250);

  rect(0, height * 0.6, width, height * 0.4);

  fill(255);

  arc(width / 2, height, width * 1.5, height * 0.8, PI, 0);

  if (sunlightFlickerAlpha > 0) {

    noStroke();

    fill(255, 255, 200, sunlightFlickerAlpha);

    rect(0, 0, width, height);

  }
}

function glowInteraction(x, y, w, h) {

  push();

  drawingContext.save();

  drawingContext.beginPath();

  drawingContext.rect(x - 10, y - 10, w + 20, h + 20);

  drawingContext.clip();

  noFill();

  let glowColor = color(255, 255, 150, 30);

  for (let i = 8; i > 0; i--) {

    strokeWeight(i * 1.5);

    stroke(glowColor);

    rect(x, y, w, h, 8);

  }

  strokeWeight(1);

  stroke(255, 255, 180);

  rect(x, y, w, h, 8);

  drawingContext.restore();

  pop();

}

function mousePressed() {

  if (

  Scene === 1 &&

  fadeAlpha <= 0 &&

  frameCount >= 180 &&

  mouseX >= doorX &&

  mouseX <= doorX + doorW &&

  mouseY >= doorY &&

  mouseY <= doorY + doorH

  ) {

    zoomStartFrame = frameCount;

    Scene = 2;

  }
  
  if (Scene_ === 1) {

  if (!holdingFish) {

  holdingFish = true;

  } else if (fishBite < 6) {

  fishBite++;

  } else {
  
  Scene_ = 2;

  }

  } else if (Scene_ === 2) {

  hasKey = true;

  Scene_ = 3;

  loop();

  }
  if (!holdingAxe && axeX && axeY) {

let d = dist(mouseX, mouseY, axeX, axeY);

if (d < 30) {

holdingAxe = true;

redraw();

return;

}

}

if (holdingAxe && !rightTreeCut) {

let x = 210, y = height * 0.6 + 120, w = 60, h = 380;

if (mouseX >= x - w / 2 - 10 && mouseX <= x + w / 2 + 10 &&

mouseY >= y - h - 10 && mouseY <= y + 10) {

rightTreeCut = true;

redraw();

return;

}

}

if (holdingAxe && rightTreeCut && !leftTreeCut) {

let x = 110, y = height * 0.6 + 50, w = 40, h = 200;

if (mouseX >= x - w / 2 - 10 && mouseX <= x + w / 2 + 10 &&

mouseY >= y - h - 10 && mouseY <= y + 10) {

leftTreeCut = true;

walkAwayLeft = true;

loop();

return;

}

}
}

function drawWallAndFloor() {

noStroke();

for (let y = 0; y < height * 0.4; y += 40) {

fill(181, 101, 29);

rect(0, y, width, 40);

stroke(100, 50, 20);

strokeWeight(2);

line(0, y, width, y);

}

noFill();

stroke(100, 50, 20);

for (let i = 10; i <= 45; i += 5) {

ellipse(width * 0.25, height * 0.2, i, i * 0.5);

}

for (let i = 5; i <= 30; i += 5) {

ellipse(width * 0.75, height * 0.3, i, i);

}

fill(210, 180, 140);

noStroke();

rect(0, height * 0.4, width, height * 0.6);

}

function draw3DTableWithThickness(cx, cy, w, d, thickness, legH) {

let topFrontLeft = createVector(cx - w / 2, cy);

let topFrontRight = createVector(cx + w / 2, cy);

let topBackLeft = createVector(cx - w * 0.4, cy - d);

let topBackRight = createVector(cx + w * 0.4, cy - d);

let bottomFrontLeft = createVector(topFrontLeft.x, topFrontLeft.y + thickness);

let bottomFrontRight = createVector(topFrontRight.x, topFrontRight.y + thickness);

let bottomBackLeft = createVector(topBackLeft.x, topBackLeft.y + thickness);

let bottomBackRight = createVector(topBackRight.x, topBackRight.y + thickness);

fill(160, 82, 45);

noStroke();

beginShape();

vertex(topBackLeft.x, topBackLeft.y);

vertex(topBackRight.x, topBackRight.y);

vertex(topFrontRight.x, topFrontRight.y);

vertex(topFrontLeft.x, topFrontLeft.y);

endShape(CLOSE);

fill(139, 69, 19);

beginShape();

vertex(topFrontLeft.x, topFrontLeft.y);

vertex(topFrontRight.x, topFrontRight.y);

vertex(bottomFrontRight.x, bottomFrontRight.y);

vertex(bottomFrontLeft.x, bottomFrontLeft.y);

endShape(CLOSE);

fill(120, 60, 20);

beginShape();

vertex(topBackLeft.x, topBackLeft.y);

vertex(topFrontLeft.x, topFrontLeft.y);

vertex(bottomFrontLeft.x, bottomFrontLeft.y);

vertex(bottomBackLeft.x, bottomBackLeft.y);

endShape(CLOSE);

stroke(90, 40, 0);

strokeWeight(4);

line(bottomFrontLeft.x, bottomFrontLeft.y, bottomFrontLeft.x, bottomFrontLeft.y + legH);

line(bottomFrontRight.x, bottomFrontRight.y, bottomFrontRight.x, bottomFrontRight.y + legH);

line(bottomBackLeft.x, bottomBackLeft.y, bottomBackLeft.x, bottomBackLeft.y + legH * 0.5);

line(bottomBackRight.x, bottomBackRight.y, bottomBackRight.x, bottomBackRight.y + legH * 0.5);

}

function drawStickmanBehindTable(x, y) {

stroke(0);

strokeWeight(2);

fill(255);

ellipse(x, y - 400, 70, 70);

line(x, y - 365, x, y - 200);

if (holdingFish) {

line(x - 30, y - 350, x - 10, y - 380);

line(x + 30, y - 350, x + 10, y - 380);

line(x - 30, y - 350, x, y - 330);

line(x + 30, y - 350, x, y - 330);

} else if (Scene_ === 2) {

line(x + 10, y - 350, width * 0.6, height * 0.4);

line(x - 30, y - 350, x - 60, y - 300);

} else {

line(x, y - 350, x - 60, y - 300);

line(x, y - 350, x + 60, y - 300);

}

line(x - 15, y - 200, x - 20, y - 130);

line(x + 15, y - 200, x + 20, y - 130);

}

function drawStickmanWithKey(x, y) {

stroke(0);

strokeWeight(2);

fill(255);

ellipse(x, y - 400, 70, 70);

line(x, y - 365, x, y - 200);

line(x, y - 350, x + 60, y - 310);

fill(200, 200, 300);

ellipse(x + 60, y - 310, 20, 30);

fill(100, 100, 150);

triangle(x + 60, y - 318, x + 54, y - 304, x + 66, y - 304);

triangle(x + 60, y - 302, x + 54, y - 316, x + 66, y - 316);

line(x, y - 350, x - 60, y - 300);

line(x, y - 200, x - 20, y - 130);

line(x, y - 200, x + 20, y - 130);

}

function drawClippedFish(x, y, bite) {

const totalBites = 6;

const biteWidth = 120 / totalBites;

const visibleWidth = 120 - bite * biteWidth;

const clipLeft = x - 60 + bite * biteWidth;

push();

drawingContext.save();

drawingContext.beginPath();

drawingContext.rect(clipLeft, y - 20, visibleWidth, 40);

drawingContext.clip();

fill(0, 0, 255);

noStroke();

ellipse(x, y, 120, 40);

if (bite < 6) {

fill(0, 0, 150);

triangle(x + 60, y, x + 80, y + 20, x + 80, y - 20);

}

noFill();

stroke('black');

strokeWeight(2);

arc(x - 20, y, 20, 40, radians(300), radians(60));

arc(x - 25, y, 20, 40, radians(300), radians(60));

arc(x - 30, y, 20, 40, radians(300), radians(60));

if (bite === 0) {

noStroke();

fill(0);

circle(x - 40, y - 5, 3);

}

drawingContext.restore();

pop();

}

function drawSky() {

background(135, 206, 235);

}

function drawSun() {

fill(255, 204, 0);

noStroke();

ellipse(width - 100, 100, 80, 80);

}

function drawGrass() {

fill(60, 179, 113);

noStroke();

rect(0, height * 0.6, width, height * 0.4);

}

function drawForest() {

for (let tree of forestTrees) {

let x = tree.x;

let y = height * 0.6;

drawTree(x, y, tree.height);

}

}

function drawTree(x, y, h) {

fill(120, 80, 50);

rect(x - 5, y - h, 10, h);

fill(24, 100, 24);

ellipse(x, y - h, 50, 50);

ellipse(x - 15, y - h + 10, 50, 50);

ellipse(x + 15, y - h + 10, 50, 50);

}

function drawStickman(x, y) {

stroke(0);

strokeWeight(2);

fill(255);

const headX = x - 50;

const headY = y - 190;

ellipse(headX, headY, 50, 50);

const bodyTopY = headY + 25;

const bodyBottomY = bodyTopY + 100;

line(headX, bodyTopY, headX, bodyBottomY);

if (holdingFish) {

line(headX - 30, bodyTopY + 10, headX - 10, bodyTopY - 20);

line(headX + 30, bodyTopY + 10, headX + 10, bodyTopY - 20);

line(headX - 30, bodyTopY + 10, headX, bodyTopY + 30);

line(headX + 30, bodyTopY + 10, headX, bodyTopY + 30);

} else if (holdingAxe) {

line(headX, bodyTopY + 10, headX + 10, bodyTopY + 50);

drawAxe(headX + 10, bodyTopY + 50);

line(headX, bodyTopY + 10, headX - 50, bodyTopY + 60);

} else {

line(headX, bodyTopY + 10, headX - 50, bodyTopY + 60);

line(headX, bodyTopY + 10, headX + 50, bodyTopY + 60);

}

line(headX, bodyBottomY, headX - 20, bodyBottomY + 70);

line(headX, bodyBottomY, headX + 20, bodyBottomY + 70);

// 😈 무서운 씨익 웃는 입

if (holdingAxe && rightTreeCut && leftTreeCut) {

noFill();

stroke(180, 0, 0);

strokeWeight(2);

arc(headX, headY + 10, 30, 15, 0, PI);

}

}

function drawOverlayTreesAndStumps() {

if (!leftTreeCut) {

drawBigTreeAt(110, height * 0.6 + 50, 40, 200);

if (rightTreeCut && holdingAxe) {

glowBox(110 - 20 - 10, height * 0.6 + 50 - 200 - 10, 60, 220);

}

} else {

drawTreeStump(110, height * 0.6 + 50);

}

if (!rightTreeCut) {

drawBigTreeAt(210, height * 0.6 + 120, 60, 380);

if (holdingAxe) {

glowBox(210 - 30 - 10, height * 0.6 + 120 - 380 - 10, 80, 400);

}

} else {

drawTreeStump(210, height * 0.6 + 120);

}

const stumpPositions = [

[410, 530], [30, 520], [560, 520],

[700, 460], [620, 580], [450, 430]

];

for (let [x, y] of stumpPositions) {

let safeX = constrain(x, 60, width - 60);

let safeY = constrain(y, height * 0.5, height - 40);

drawTreeStump(safeX, safeY);

if (x === 410 && y === 530 && !holdingAxe) {

axeX = safeX + 40;

axeY = safeY + 15;

drawAxe(axeX, axeY);

if (charX === targetX) {

glowBox(axeX - 12, axeY, 24, 55);

glowBox(axeX - 30, axeY - 20, 50, 25);

}

}

}

}

function drawBigTreeAt(x, y, trunkW, trunkH) {

noStroke();

fill(160, 100, 60);

rect(x - trunkW / 2, y - trunkH, trunkW, trunkH);

fill(34, 139, 34);

ellipse(x, y - trunkH, 100, 100);

ellipse(x - 30, y - trunkH + 20, 90, 90);

ellipse(x + 30, y - trunkH + 20, 90, 90);

}

function drawTreeStump(x, y) {

noStroke();

fill(160, 100, 60);

ellipse(x, y + 20, 80, 15);

fill(160, 100, 60);

quad(x - 30, y - 25, x + 30, y - 25, x + 40, y + 20, x - 40, y + 20);

stroke(120, 80, 50);

strokeWeight(1.5);

fill(220, 180, 120);

ellipse(x, y - 25, 60, 22);

noFill();

stroke(140, 100, 60);

ellipse(x, y - 25, 18, 6);

ellipse(x, y - 25, 30, 10);

}

function drawAxe(x, y) {

push();

translate(x, y);

stroke(101, 67, 33);

strokeWeight(6);

line(0, 0, 0, 50);

noStroke();

fill(190);

rect(-20, -10, 25, 20);

pop();

}

function glowBox(x, y, w, h) {

let glowColor = color(255, 255, 150, 50);

noFill();

for (let i = 8; i > 0; i--) {

strokeWeight(i * 2);

stroke(glowColor);

rect(x, y, w, h, 8);

}
strokeWeight(1);

stroke(255, 255, 180);

rect(x, y, w, h, 8);

}
