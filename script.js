window.onresize = changeWindow;
const points = [];
const brain = new NeuralNetwork(1, [5, 5, 1]);

function load() {
  canvas = document.querySelector('.canvas');
  ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  document.onkeydown = keyPress;
  brain.draw('red');
  train(10000);
  brain.draw('green');
}

function train(max = 1000, counter = 0) {
  ctx.clearRect(0, 0, width, height);
  for(let x = 0; x < width; x += 1) {
    const point = new Point(x, cos(x));
    point.draw();
    brain.train([point.val.x], [point.val.y], .1);
  }
  brain.draw('green');
  if(counter < max) {
    window.requestAnimationFrame(f => {train(max, counter + 1)});
  } else {
    console.log('DONE');
  }

}

function runFrame() {
  //DO ALL DRAWING HERE

  requestAnimationFrame(runFrame);
}

function changeWindow() {
  width = window.innerWidth;
  height = window.innerHeight;
  //REDRAW SCREEN
}

function keyPress(key) {
  if(key.keyCode != 13) {
    //ENTER
  }
}

function leftClick() {
  const x = event.clientX;
  const y = event.clientY;
  const point = new Point(x, y);
  points.push(point);
  point.draw();
}
