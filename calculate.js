// 確保 DOM 完全加載後再執行腳本
document.addEventListener("DOMContentLoaded", (event) => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/service-worker.js").then(
        function (registration) {
          // 註冊成功
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // 註冊失敗 :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }

  var currentDirection = "long"; // 初始化變量

  function selectDirection(direction) {
    document.getElementById("long").classList.remove("selected");
    document.getElementById("short").classList.remove("selected");
    document.getElementById(direction).classList.add("selected");
    currentDirection = direction;
  }

  // 定義計算結果的函數
  function calculateResult(
    direction,
    positionSize,
    openingPrice,
    stopLossPrice,
    maxLoss
  ) {
    positionSize = parseFloat(positionSize);
    openingPrice = parseFloat(openingPrice);
    stopLossPrice = parseFloat(stopLossPrice);
    maxLoss = parseFloat(maxLoss);

    var result = 0;

    if (direction === "long") {
      result =
        maxLoss /
        (((openingPrice - stopLossPrice) / openingPrice) * 100) /
        (positionSize / 100);
    } else if (direction === "short") {
      result =
        maxLoss /
        -(((openingPrice - stopLossPrice) / openingPrice) * 100) /
        (positionSize / 100);
    }

    return result;
  }

  // 為做多和做空按鈕添加點擊事件
  document.getElementById("long").addEventListener("click", function () {
    selectDirection("long");
  });
  document.getElementById("short").addEventListener("click", function () {
    selectDirection("short");
  });

  // 為計算按鈕添加點擊事件
  document.getElementById("confirm").addEventListener("click", function () {
    const positionSize = document.getElementById("position-size").value;
    const openingPrice = document.getElementById("opening-price").value;
    const stopLossPrice = document.getElementById("stop-loss-price").value;
    const maxLoss = document.getElementById("max-loss").value;

    // 執行計算並更新結果
    const result = calculateResult(
      currentDirection,
      positionSize,
      openingPrice,
      stopLossPrice,
      maxLoss
    );
    document.getElementById("resultSpan").innerText = result.toFixed(2);
  });
});
