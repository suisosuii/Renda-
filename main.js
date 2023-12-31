let startFlag = true;
let num = 0;
let targetDate;
const tm = 5;
let judgeArray = new Array(15);
let judge = new Array(14);
let judgeD = 0;
let judgeU = 0;
let distance;

const Width = 300;
const Heigh = 200;

const mema = 5000 / 77.5;
let mnum = 0;

window.addEventListener("load", function () {
  //コンテキストを取得
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const button = document.getElementById("start");
  const ctd = document.getElementById("countDown");
  button.addEventListener("click", function () {
    if (startFlag) {
      num = 0;
      ctd.style.display = "block";
      // カウントダウンタイマーの起動
      const now = new Date();
      targetDate = now.setSeconds(now.getSeconds() + tm + 3);
      window.requestAnimationFrame(countdown);
      button.style.display = "none";
    }
  });
  const counter = document.getElementById("counter");
  // document.addEventListener("mousedown", function (e) {
  //   if (!startFlag) {
  //     judgeD = Math.floor(distance / 10);
  //   }
  // });
  // document.addEventListener("mouseup", function (e) {
  //   if (!startFlag) {
  //     judgeU = Math.floor(distance / 10);
  //     console.log(judgeD - judgeU);
  //     if (judgeD - judgeU < 2 && judgeD - judgeU > 0) {
  //       alert("不正を検知しました");
  //       window.location.reload();
  //     }
  //   }
  // });
  document.addEventListener("pointerdown", function (e) {
    if (!e.isPrimary) {
      alert("不正を検知しました");
      window.location.reload();
    } else {
      console.log("yes");
    }
  });
  document.addEventListener("click", function (e) {
    drop(e);
    if (!startFlag) {
      context.clearRect(0, 0, 170, Heigh);
      counter.innerText = ++num + " Click";
      context.fillStyle = "blue";
      context.fillRect(130, Heigh, 25, -(num * 2));
      context.font = "16px serif";
      context.fillText("あなた", 120, Heigh - num * 2 - 5);
      if (judgeArray.length == 15) {
        judgeArray.shift();
      }
      judgeArray.push(Math.floor(distance / 10));
      //console.log(judgeArray);
      if (judgeArray.length >= 2) {
        if (judgeArray.length == 15) {
          judge.shift();
        }
        judge.push(
          judgeArray[judgeArray.length - 2] - judgeArray[judgeArray.length - 1]
        );
        console.log(judge);
        if (judge.every((v) => v == judge[0] || v <= 4)) {
          alert("不正を検知しました");
          window.location.reload();
        }
      }
    }
  });
});

function drop(e) {
  //座標の取得
  let x = e.pageX;
  let y = e.pageY;

  //しずくになるdivの生成、座標の設定
  let sizuku = document.createElement("div");
  sizuku.style.top = y + "px";
  sizuku.style.left = x + "px";
  document.body.appendChild(sizuku);

  //アニメーションをする className を付ける
  sizuku.className = "sizuku";

  //アニメーションが終わった事を感知してしずくを remove する
  sizuku.addEventListener(
    "animationend",
    function () {
      this.parentNode.removeChild(this);
    },
    false
  );
}

// カウントダウン処理
const countdown = () => {
  //コンテキストを取得
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const counter = document.getElementById("counter");
  // 現在日時
  const time = document.getElementById("timer");
  const ctd = document.getElementById("countDown");
  const now = new Date();
  // 時差
  distance = targetDate - now;
  if (distance < 0) {
    time.style.display = "none";
    startFlag = true;
    counter.innerHTML = "0 Click";
    counter.style.display = "none";
    time.innerText = "制限時間 : 5.00";
    ctd.style.display = "none";
    transition();
  } else if (distance > 5020) {
    ctd.style.left = "50%";
    const seconds = Math.floor(distance / 1000);
    ctd.innerText = seconds - 4;
    window.requestAnimationFrame(countdown);
  } else if (distance <= 5020 && distance >= 5000) {
    ctd.style.left = "40%";
    ctd.innerText = "連打しろ!";
    window.requestAnimationFrame(countdown);
  } else {
    startFlag = false;
    const seconds = Math.floor(distance / 1000);

    context.clearRect(190, 0, 230, Heigh);
    context.fillStyle = "green";
    context.fillRect(200, Heigh, 25, -(mnum * 2));
    context.font = "16px serif";
    context.fillText("作者", 198, Heigh - mnum * 2 - 5);

    if (5000 - distance >= mema * mnum) {
      mnum++;
      console.log(mnum);
    }
    // カウントダウンタイマーのHTML更新
    const miliseconds = distance < 0 ? 0 : Math.floor((distance % 1000) / 10);
    if (miliseconds < 10) {
      time.innerText = "制限時間 : " + seconds + ".0" + miliseconds;
    } else {
      time.innerText = "制限時間 : " + seconds + "." + miliseconds;
    }
    // 再度タイマー更新の実行
    window.requestAnimationFrame(countdown);
  }
  //評価線
  if (!startFlag) {
    context.fillStyle = "gray";
    context.font = "16px serif";

    context.fillRect(50, Heigh - 30, Width - 50, 1);
    context.fillText("B", 34, Heigh - 30 + 5);
    context.fillRect(50, Heigh - 80, Width - 50, 1);
    context.fillText("A", 34, Heigh - 80 + 5);
    context.fillRect(50, Heigh - 120, Width - 50, 1);
    context.fillText("S", 34, Heigh - 120 + 5);
  }
};

function transition() {
  const result = document.getElementById("result");
  const back = document.getElementById("back");
  const time = document.getElementById("timer");
  const button = document.getElementById("start");
  const counter = document.getElementById("counter");
  const frame = document.getElementById("frame");

  const psec = num / tm;
  const evaluation = psec < 3 ? "C" : psec < 8 ? "B" : psec < 12 ? "A" : "S";
  const bpm = (psec / 4) * 60;
  result.style.display = "block";
  frame.style.display = "block";
  result.innerHTML =
    "<h1>結果発表</h1>" +
    "結果 : " +
    num +
    "回<br>" +
    "毎秒 : " +
    psec.toFixed(2) +
    "回<br>" +
    "bpm" +
    bpm +
    "の16分相当<br>" +
    "評価...<br>" +
    "<span>" +
    evaluation +
    "</span>";
  back.style.display = "block";
  back.addEventListener("click", function () {
    //コンテキストを取得
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, Width, Heigh);
    mnum = 0;
    result.style.display = "none";
    back.style.display = "none";
    frame.style.display = "none";
    num = 0;
    button.style.display = "block";
    counter.style.display = "block";
    time.style.display = "block";
  });
}
