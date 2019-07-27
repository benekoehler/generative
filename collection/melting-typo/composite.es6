class Composite {
  constructor(pos, size){
    this.size = size;
    this.pos = pos;
    this.parts = [
      new Box(this.pos.x-this.size/2, this.pos.y-this.size/2, this.size/2, this.size/2, true),
      new Box(this.pos.x+this.size/2, this.pos.y-this.size/2, this.size/2, this.size/2, true),
      new Box(this.pos.x+this.size/2, this.pos.y+this.size/2, this.size/2, this.size/2, true),
      new Box(this.pos.x-this.size/2, this.pos.y+this.size/2, this.size/2, this.size/2 , true)
    ];

    this.compoundBody = Body.create({
      parts: [this.parts[0].body, this.parts[1].body, this.parts[2].body, this.parts[3].body]
    });

    World.add(world, this.compoundBody);
    this.compoundBody.parts[0].frictionAir = 0.1
    console.log(this.compoundBody.parts);
  }

  update() {
    for(let i = 0; i < this.parts.length; i++){
      this.parts[i].update();
    } 
  }

  show() {
    for(let i = 0; i < this.parts.length; i++){
      this.parts[i].show();
    } 
  }
}