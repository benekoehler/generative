class Boid {
  constructor() {
    this.position = createVector(random(-width/3, width/3), random(-height/3, height/3));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.rotation = 0;
    this.maxForce = 0.5;
    this.maxSpeed = 12;
    this.noiseOff = random(200);
    this.upPos = createVector(random(-width/3, width/3), -height/2);

    this.alignMultiplyer = 1;
    this.cohesionMultiplyer = 1;
    this.separationMultiplyer = 1;

    this.upMultiplyer = 1;

    this.color = color(255, 255, 255);
    this.collisionAmount;

  }
  edges () {
    if(this.position.x > width/4) {
      this.position.x = -width/4;
    } else if(this.position.x < -width/4) {
      this.position.x = random(-width/4, width/4);
    }
    if(this.position.y > height/4) {
      this.position.y = -height/4;
    } else if(this.position.y < -height/4) {
      this.position.y = height/4;
    }
  }

  align(boids) {
    let steering = createVector();
    let percRadius = 25;
    let total = 0;
    steering = boids.reduce((acc, cur) => {
      if (cur != this && dist(cur.position.x, cur.position.y, this.position.x, this.position.y) < percRadius) {
        total ++;
        acc.add(cur.velocity);
      }
      return acc;
      
    }, steering);

    if(total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
    
  }

  cohesion(boids) {
    let steering = createVector();
    let percRadius = 70;
    let total = 0;
    steering = boids.reduce((acc, cur) => {
      if (cur != this && dist(cur.position.x, cur.position.y, this.position.x, this.position.y) < percRadius) {
        total ++;
        acc.add(cur.position);
      }
      return acc;
      
    }, steering);

    if(total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
    
  }

  separate(boids) {
    let steering = createVector();
    let percRadius = 50;
    let total = 0;
    steering = boids.reduce((acc, cur) => {
      let d = dist(cur.position.x, cur.position.y, this.position.x, this.position.y);
      if (cur != this && d < percRadius) {
        let diff = p5.Vector.sub(this.position, cur.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
      return acc;
      
    }, steering);

    if(total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
    
  }

  goUp () {
    let steering = createVector(this.upPos.x, this.upPos.y);

    steering.sub(this.position);
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);
    
    return steering;
  }


  collision(objs) {
    let steering = createVector();
    let percRadius = 80;
    let total = 0;
    steering = objs.reduce((acc, cur) => {
      let d = dist(cur.position.x, cur.position.y, this.position.x, this.position.y);
      if (cur != this && d < percRadius && d > 40) {
        let diff = p5.Vector.sub(this.position, cur.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      } else {
        steering.set(0,0);
      }
      return acc;
      
    }, steering);

    if(total > 0) {
      steering.div(total);
      steering.setMag(this. maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  draw() {

    push();
      translate(this.position.x, this.position.y, noise(this.noiseOff) * 50);
      
      push();
        ambientMaterial(this.color);
        rotateZ(this.rotation);
        push();
        // fill(80, 0.5);
        // noFill();
        // stroke(0);
        // strokeWeight(1);
        // ellipse(0, 0, 80, 80);

        pop();
        // ellipsoid(5, 10, 5);
        cone(10, 30);
      pop();
    pop();
  }


  calcRotation() {
    let rotation = 0;
    let vel = this.velocity;
    vel.normalize();
    rotation = atan2(0, 1) - atan2(vel.x, vel.y);
  
    return  rotation
  }

  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration.add(alignment.mult(this.alignMultiplyer));

    let separation = this.separate(boids);
    //separation *= 2.5;
    this.acceleration.add(separation.mult(this.separationMultiplyer));

    let cohesion = this.cohesion(boids);
    this.acceleration.add(cohesion.mult(this.cohesionMultiply));
  }

  update(trees) {
    this.noiseOff += 0.01;
    this.collisionAmount = this.collision(trees);
    this.acceleration.add(this.collisionAmount);

    let up = this.goUp();
    this.acceleration.add(up.mult(map(this.upMultiplyer, upMin, upMax, 0, 1)));
   

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.edges();
    

  
    // this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0);
    this.rotation = this.calcRotation();

    // this.goUp();
  }
}