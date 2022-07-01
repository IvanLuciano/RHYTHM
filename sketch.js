let run;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = windowWidth;
  y = windowHeight;

  run = new Run();
}

function draw() {
 run.execute();
}
