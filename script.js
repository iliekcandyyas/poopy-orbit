const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const G = 0.1; // scaled for simulation

class Body {
    constructor(x, y, mass, radius, color, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const force = (G * this.mass * other.mass) / (distance * distance);

        const ax = (force * dx / distance) / this.mass;
        const ay = (force * dy / distance) / this.mass;

        this.vx += ax;
        this.vy += ay;

        this.x += this.vx;
        this.y += this.vy;
    }
}

const sun = new Body(canvas.width / 2, canvas.height / 2, 10000, 20, "brown");

const planet = new Body(
    canvas.width / 2 + 200,
    canvas.height / 2,
    10,
    6,
    "cyan",
    0,
    2
);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    planet.update(sun);

    sun.draw();
    planet.draw();

    requestAnimationFrame(animate);
}


animate();
