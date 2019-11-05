import {dist} from './index';

export class Arc {
    constructor(x, y, r, start, end) {
        this.pos = {x, y};
        this.r = r;
        this.reso = 64;
        this.start = this.reso * start;
        this.end = this.reso * end;
        
        this.points = [];
        
        this.calculate();
    }

    calculate() {
        const step = Math.PI * 2 / this.reso;
        let angle = 0;
        this.points = [];
        for (let i = 0; i <= this.end; i++) {
            this.points.push([
                this.pos.x + Math.cos(angle) * this.r,
                this.pos.y + Math.sin(angle) * this.r,
            ])
            angle += step;
        }
    }
    rotate(angle) {
        this.points.forEach(point => {
            let x = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
            let y = point[1] * Math.cos(angle) + point[0] * Math.sin(angle);
            point[0] = x;
            point[1] = y;
            
        })
    }
   
}

export class Circle extends Arc {
    constructor(x,y,r) {
        super(x,y,r, 0, 1);
    }

    grow(width, height, amount, others, ownIndex) {
        let growing = true;
        while(growing){
            
            const edges = (  
                this.pos.x + this.r >= width || 
                this.pos.x - this.r <= 0 ||  
                this.pos.y + this.r >= height ||  
                this.pos.y - this.r <= 0
            );
                
                let hit = false;
                for(let i = 0; i < others.length; i++) {
                    if(i !== ownIndex){
                        if(dist(this.pos, others[i].pos) <= (this.r + others[i].r)) {
                            console.log("hit");
                            hit = true;
                            break;
                        }
                    }
                    // debugger;
                }
            console.log('growing', growing, edges, hit);
            this.r += amount;
            growing = !edges || !hit;
        }
        this.calculate();
      }
}