class Box {
  constructor(x,y,w,h, letter = null, isComposite = false) {
    this.pos = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    this.scale = 1;
    this.angle;
    this.chamfer = 2;
    //this.body = Bodies.rectangle(this.pos.x,this.pos.y, this.w, this.h, { chamfer: {radius: this.chamfer}});

    this.body = Bodies.circle(this.pos.x,this.pos.y, this.w/2);
    //console.log(this.body);
    this.body.frictionAir = random(0, 1);
    if(!isComposite) {
      World.add(world, this.body);
    }
    this.letters = 'abcdefghijklmnopqrstuvwxyz';
    if(letter === null){
      this.letter = this.letters.charAt(random(this.letters.length));
    } else {
      this.letter = letter;
    }
  }

  update() {

    this.angle = this.body.angle;
    this.pos = this.body.position;

  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    rectMode(CENTER);
    //ellipse(0, 0, this.w, this.h);
    //textSize(40)
    textFont(akkuratFont, 40);
    text(this.letter, -this.w/3, this.h/3);
    pop();
  }


}