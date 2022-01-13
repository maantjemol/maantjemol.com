let star = document.getElementById('star');
const vw = window.innerWidth;
const vh = window.innerHeight;

let MouseX = 0
let MouseY = 0

document.addEventListener('mousemove', moveAction);

// create particle on click
document.addEventListener('click', function (e) {
    let x = e.clientX;
    let y = e.clientY;
    createMissile()
});

function createExplotion(x, y, a) {
    for(let i = 0; i < a; i++) {
        createParticle(x, y);
    }
}


function createParticle (x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    
    // Calculate a random size from 5px to 25px
    const size = Math.floor(Math.random() * 5 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Generate a random color in a blue/purple palette
    particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    
    // Generate a random x & y destination within a distance of 75px from the mouse
    const destinationX = x + (Math.random() - 0.5) * 2 * 100;
    const destinationY = y + (Math.random() - 0.5) * 2 * 100;
  
    // Store the animation in a variable as we will need it later
    const animation = particle.animate([
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        opacity: 1
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0
      }
    ], {
      // Set a random duration from 500 to 1500ms
      duration: Math.random() * 500 + 100,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      // Delay every particle with a random value of 200ms
      delay: Math.random() * 200
    });
    
    // When the animation is complete, remove the element from the DOM
    animation.onfinish = () => {
      particle.remove();
    };
}

function createTrailParticle (x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    
    const size = Math.floor(Math.random() * 5 + 5);
    particle.style.width = `5px`;
    particle.style.height = `5px`;
    particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    const animation = particle.animate([
      {
        opacity: 1
      },
      {
        opacity: 0
      }
    ], {

      duration: 1000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: Math.random() * 100
    });
    
    animation.onfinish = () => {
      particle.remove();
    };

    particle.style.transform = ` translate(${x}px, ${y}px)`
}


function Missile(x, y, destX, destY) {
    this.me = document.createElement('Missile');
    this.x = x;
    this.y = y;
    this.destX = destX;
    this.destY = destY;
    this.rotation = 0;
    this.speed = 0.05;
    this.speedFactor = 12;
    this.alive = true
    this.init = function() {
      document.body.appendChild(this.me);
      this.me.style.opacity = "255";
      // Calculate a random size from 5px to 25px
      const size = Math.floor(Math.random() * 5 + 5);
      this.me.style.width = `${size}px`;
      this.me.style.height = `${size}px`;
      // Generate a random color in a blue/purple palette
      this.me.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    }

    this.update = function() {
      this.destX = MouseX;
      this.destY = MouseY;
      let distance = Math.sqrt(Math.pow(this.x - this.destX, 2) + Math.pow(this.y - this.destY, 2));
      this.speed = this.speedFactor / distance;
      this.x += (this.destX - this.x) * this.speed;
      this.y += (this.destY - this.y) * this.speed;
      
      this.me.style.transform = "top: " + this.y + "px; left: " + this.x + "px;";
      
      if(distance < 20) {
        this.removeMissile();
        
      }
      
    }
    
    this.updateMissile = () => {
        this.x += this.speed * Math.cos(this.rotation);
        this.y += this.speed * Math.sin(this.rotation);
    }

    this.drawMissile = () => {
      this.me.style.top = `${this.y}px`;
      this.me.style.left = `${this.x}px`;
    }

    this.removeMissile = () => {
      this.me.remove();
      this.alive = false;
    }
}

let missiles = [];

function createMissile() {
  let x = vw/2
  let y = vh
  let destX = random(0, vw);
  let destY = random(0, vh);
  let missile = new Missile(x, y, destX, destY);
  missiles.push(missile);
  missile.init();
}

for (let i = 0; i < missiles.length; i++) {
  const missile = missiles[i];
}

function moveAction(event) {
  MouseX = event.x;
  MouseY = event.y;
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  return Math.random() * (max - min) + min;
}

let frameCount = 0;

function update() {
  frameCount++;
  for (let i = 0; i < missiles.length; i++) {
    const missile = missiles[i];
    //if framecount is devisible by 20, create a trail particle at the current position

    if(!missile.alive) {
      console.log("remove");
      createExplotion(missile.x, missile.y, 30);
      missiles.splice(i, 1);
    }
    missile.update();
    missile.drawMissile();

    if(frameCount % 2 == 0) {
      createTrailParticle(missile.x, missile.y);
    }
  }
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);