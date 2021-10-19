let counterTouch = 0;
var photo = document.getElementById("photo"),
  photoCanvas = photo.getContext("2d"),
  brushRadius = (photo.width / 100) * 10,
  img = new Image();

// Increase brush radius if it's  small
if (brushRadius < 100) {
  brushRadius = 30;
}
// Load image
img.src = "img/bw.jpg";
img.onload = function () {
  img.style.background = "100% auto";
  photoCanvas.drawImage(img, 0, 0, photo.width, photo.height);
};

// Get brush position
function getBrushPos(xRef, yRef) {
  var photoRect = photo.getBoundingClientRect();
  return {
    x: Math.floor(
      ((xRef - photoRect.left) / (photoRect.right - photoRect.left)) *
        photo.width
    ),
    y: Math.floor(
      ((yRef - photoRect.top) / (photoRect.bottom - photoRect.top)) *
        photo.height
    ),
  };
}

// Draw painting dots
function drawDot(mouseX, mouseY) {
  photoCanvas.beginPath();

  // Draw dot
  photoCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
  photoCanvas.fillStyle = "#000";
  photoCanvas.globalCompositeOperation = "destination-out";
  photoCanvas.fill();
}

// Track touch move
photo.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
      var brushPos = getBrushPos(touch.pageX, touch.pageY);
      drawDot(brushPos.x, brushPos.y);
      counterTouch++;
    }
    if (counterTouch == 1) {
      let iconHand = document.querySelector(".icon-hand");
      let startText = document.querySelector(".start__text");
      iconHand.classList.add("zoomOut", "d-none");
      startText.classList.add("animated","zoomOut");
 
    }
    if (counterTouch >= 150) {
      setTimeout(darker, 500);
      return;
    }
  },
  false
);

/* ===== Animation ===== */

// Animate hand icon and start text
let iconHand = document.querySelector(".icon-hand");
iconHand.classList.add("animated", "infinite", "wobble");

// Add black gradient to photo after time
function darker() {
  // photo.style.opacity = "0.7";
  let btn = document.querySelector(".button");
  btn.classList.add("button_animate");
  photoCanvas.drawImage(img, 0, 0, photo.width, photo.height);
  document.getElementById("Stage").style.display = "block";
}

// Click button
let button = document.querySelector(".button");
button.addEventListener("click", function () {
  window.open("");
});
