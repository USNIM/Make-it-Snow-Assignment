// Make it Snow

let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;
document.addEventListener("keydown", keydownHandler);

// Create an array of random snows
let snows = [];
for (let n = 1; n <= 100; n++) {
    snows.push(newRandomSnow());
}

requestAnimationFrame(draw);
function draw() {
    // Background of Canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0,cnv.width, cnv.height);

    // Move & Draw All Snow
    for (let i = 0; i < snows.length; i++) {
        drawSnow(snows[i]);
        moveSnow(snows[i]);
    }

    requestAnimationFrame(draw);
}

function newRandomSnow() {
    return {
        x: randomInt(0, cnv.width),
        y: randomInt(0,cnv.height),
        r: randomInt(2, 5),
    }
}

function drawSnow(aSnow) {
    // draw snows at random area
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(aSnow.x, aSnow.y, aSnow.r, 0, 2 * Math.PI);
    ctx.fill();
}

function moveSnow(aSnow) {
    // goes to bottom
    aSnow.y += randomInt(0, 1);

    // teleport to top
    for (let i = 0; i < snows.length; i++) {
        if (snows[i].y >= 600) {
          snows[i].y = 0;
          snows[i].x = randomInt(0, cnv.width);
        }
      }
}

function keydownHandler(event) {
    if (event.keyCode == 38) {
        // Up Arrow - Add snow
        snows.push(newRandomSnow());
    } else if (event.keyCode == 40) {
        // Down Arrow - remove snow
        snows.pop();
    }
}

function randomInt(low, high) {
    return Math.random() * (high - low) + low;
}