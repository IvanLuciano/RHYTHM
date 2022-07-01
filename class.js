class Run {
  constructor() {
    //position
    this.x = windowWidth;
    this.y = windowHeight;
    //color changer
    //this.colors = [color('#ff0099'), color('#f3f315'), color('#83f52c'), color('#ff6600'), color('#6e0dd0'), color('#01fff4')]; //color list
    //this.rColorSelec = this.colors[round(random(0, 5))];
    this.colorSpeed = 10; // color change speed
    //colors
    this.cyan = color('#01fff4');
    this.pink = color('#ff0099');
    this.colorspc = [color('#ff0099'), color('#01fff4')];
    this.rColorSelec = this.colorspc[round(random(0, 1))];
    //vars
    this.borders = 8;
    //person count array
    this.pCount = 0;
    this.pList = [];
    this.cdClick = 60;
    this.registro = 1;
    this.registroList = [];
    //feedback alerts
    this.cdAlert = 45;
    this.gAlert = false;
    this.rAlert = false;
  }

  execute() {
    background(0, 0, 25);
    this.exevars();

    this.draw();
    this.func();
  }

  exevars() { //repeat vars in frameRate
    if (frameCount % this.colorSpeed == 0) {
      this.rColorSelec = this.colorspc[round(random(0, 1))]; //random color picker
    }
  }

  stats() { //mouse, frame count & more stats
    push()
    textAlign(LEFT);
    textSize(15);
    fill(255, 255, 0);
    text("f/count " + round(frameCount), 5, 25);
    if (frameCount >= 999) {
      frameCount = 0;
    }

    fill(255, 0, 0);
    text("!x " + mouseX, 5, 50);
    text("!y " + mouseY, 5, 65);

    fill(0, 255, 0);
    text("!cd Alerta " + this.cdAlert, 5, 75);
    pop();
  }

  draw() {
    push();
    rectMode(CORNERS);
    strokeWeight(this.borders);
    stroke(this.pink);
    fill(0, 0, 25)
    rect(0 + this.borders / 2, 0 + this.borders / 2, this.x - this.borders / 2, this.y - this.borders / 2);
    stroke(this.cyan);
    rect(35, 85, this.x - 35, this.y - 35);
    pop();

    push();
    textSize(91);
    textAlign(CENTER);
    fill(255);
    stroke(this.rColorSelec);
    strokeWeight(this.borders);
    text("BONDI FEST", this.x / 2, 77);
    pop();

    push();
    textAlign(CENTER);
    fill(255);

    textSize(55);
    text("Personas dentro", this.x / 4, 320);
    textSize(100);
    text(this.pCount, this.x / 4, 420);


    if (this.cdAlert >= 1) {
      push();
      if (this.gAlert == true) {
        fill(0, 255, 0);
      }
      if (this.rAlert == true) {
        fill(255, 0, 0);

      }
      noStroke();
      ellipse(this.x / 4, 450, 50, 50);
      pop();
    }

    textSize(55);
    text("Registro", this.x - this.x / 4, 180);
    textSize(25);
    textAlign(LEFT);
    text(this.pList, this.x - this.x / 4 - 70, 200);
    textAlign(RIGHT);
    text(this.registroList, this.x - this.x / 4 - 80, 201);
    pop();
  }

  func() {
    //person count
    if (this.pCount <= -1) {
      this.pCount = 0;
    }

    if (this.pList.length >= 11) {
      this.pList.shift();
    }
    //registroList
    if (this.registroList.length >= 11) {
      this.registroList.shift();
    }

    //cd alerts
    if (this.cdAlert > 0) {
      this.cdAlert--;
    }

    if (this.cdAlert == 0) {
      this.gAlert = false;
      this.rAlert = false;
    }

    //cd click
    if (this.cdClick > 0) {
      this.cdClick--;
    }

    if (mouseIsPressed === true && this.cdClick == 0) {
      append(this.registroList, "\n" + this.registro);
      this.registro = this.registro + 1;
      if (mouseButton === LEFT) {
        this.pCount = this.pCount + 1;
        this.cdClick = 60;
        this.cdAlert = 45;
        this.gAlert = true;
        append(this.pList, "\nEntró alguien");
      }
      if (mouseButton === RIGHT) {
        this.pCount = this.pCount - 1;
        this.cdClick = 60;
        this.cdAlert = 45;
        this.rAlert = true;
        append(this.pList, "\nSalio alguien");
      }
    }
  }
}
