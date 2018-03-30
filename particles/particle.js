var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

var colorarray = ['#f7336e','#ffffff', '#5bd5f7','#FF355E','#FF6037','#CCFF00','#66FF66','#50BFE6','#FF00CC'];

function Particle(x,y,r,dx,dy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = window.colorarray[Math.floor(Math.random()*colorarray.length)];

    this.draw = function(){
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.stroke();
    }

    this.update = function(i){
        if(this.x+this.r > window.innerWidth || this.x-this.r<0){
            this.dx = -this.dx;
            }
        if(this.y+this.r > window.innerHeight || this.y-this.r<0){
                this.dy = -this.dy;
            }
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        this.r -= Math.random();
        if(this.r>=0){
            this.draw();
        }
        else{
            particle_arr.splice(i,1);
            }
        
    }
}

var position = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

function hppn(event){
    position.x = event.clientX;
    position.y = event.clientY;
}

document.addEventListener('mousemove', hppn);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    position.x = window.innerWidth/2;
    position.y = window.innerHeight/2;
})

var particle_arr = [];

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    var dx = (Math.random()-0.5)*4;
    var dy = (Math.random()-0.5)*4;
    particle_arr.push(new Particle(position.x,position.y,50,dx,dy));
    for(let i=0 ; i<particle_arr.length; i++){
        particle_arr[i].update(i);
    }
}

animate();