class Player {

  constructor() {

    this.fitness = 0;
    this.vision = []; //the input array fed into the neuralNet
    this.decision = []; //the out put of the NN
    this.unadjustedFitness;
    this.lifespan = 0; //how long the player lived for this.fitness
    this.bestScore = 0; //stores the this.score achieved used for replay
    this.dead = false;
    this.score = 0;
    this.gen = 0;

    this.pos = createVector(width/2, height/2)
    this.vel = createVector()
    this.drag = 0.99
    this.angle = 0
    this.angularVelocity = 0
    this.angularDrag = 0.9
    this.power = 0.5
    this.turnSpeed = 0.01



    this.genomeInputs = 5;
    this.genomeOutputs = 2;
    this.brain = new Genome(this.genomeInputs, this.genomeOutputs);
    this.vel.limit(2)

    this.edgeLines = []


  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  show() {
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      push()
      translate(this.pos.x, this.pos.y)
      rectMode(CENTER)
      rotate((-this.angle))
      fill(255, 0, 0)
      rect(0, 0, 20, 50)
      fill(255, 255, 0)
      ellipse(-5, 20, 5, 5)
      ellipse(5, 20, 5, 5)
      pop()


      for (var i=0;i<this.edgeLines.length;i++){
        strokeWeight(2)
        line(this.edgeLines[i][0], this.edgeLines[i][1], this.edgeLines[i][2],this.edgeLines[i][3])
      }
      //---





    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
  move() {
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    }

  accelerate(){
    this.vel.add(new p5.Vector(sin(this.angle)*this.power, cos(this.angle)*this.power))
  }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
  update() {
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      this.pos.add(this.vel)
      this.vel.mult(this.drag)
      this.vel.limit(7)
      this.angle += this.angularVelocity
      this.angularVelocity *= this.angularDrag

      if (keyIsDown(UP_ARROW)){
        this.accelerate()
      }
      if (keyIsDown(LEFT_ARROW)){
        this.angularVelocity += this.turnSpeed
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.angularVelocity -= this.turnSpeed
      }

      //-----------------edgeLines
      let X = this.pos.x-10
      let Y = this.pos.y-25

      let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x-10
      Y = this.pos.y+25

      let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[0] = [New_X, New_Y, New_X2, New_Y2]


      //--
      X = this.pos.x+10
      Y = this.pos.y-25

      New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x+10
      Y = this.pos.y+25

      New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[1] = [New_X, New_Y, New_X2, New_Y2]


      //--
      X = this.pos.x+10
      Y = this.pos.y+25

      New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x-10
      Y = this.pos.y+25

      New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[2] = [New_X, New_Y, New_X2, New_Y2]

      //--
      X = this.pos.x+10
      Y = this.pos.y-25

      New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x-10
      Y = this.pos.y-25

      New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[3] = [New_X, New_Y, New_X2, New_Y2]


    }
    //----------------------------------------------------------------------------------------------------------------------------------------------------------

  look() {
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace

  }


  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //gets the output of the this.brain then converts them to actions
  think() {

      var max = 0;
      var maxIndex = 0;
      //get the output of the neural network
      this.decision = this.brain.feedForward(this.vision);

      for (var i = 0; i < this.decision.length; i++) {
        if (this.decision[i] > max) {
          max = this.decision[i];
          maxIndex = i;
        }
      }

      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    //returns a clone of this player with the same brian
  clone() {
    var clone = new Player();
    clone.brain = this.brain.clone();
    clone.fitness = this.fitness;
    clone.brain.generateNetwork();
    clone.gen = this.gen;
    clone.bestScore = this.score;
    return clone;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //since there is some randomness in games sometimes when we want to replay the game we need to remove that randomness
  //this fuction does that

  cloneForReplay() {
    var clone = new Player();
    clone.brain = this.brain.clone();
    clone.fitness = this.fitness;
    clone.brain.generateNetwork();
    clone.gen = this.gen;
    clone.bestScore = this.score;

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    return clone;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //fot Genetic algorithm
  calculateFitness() {

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  crossover(parent2) {

    var child = new Player();
    child.brain = this.brain.crossover(parent2.brain);
    child.brain.generateNetwork();
    return child;
  }
}
