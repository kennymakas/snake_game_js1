
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images

const ground = new Image();
ground.src = "img/ground.jpg";

const foodImg = new Image();
foodImg.src = "img/food.jpg";

//load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

// create the snake

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}
// craete the food

let food = {
    x : Math.floor(Math.random()*17+1)* box,
    y : Math.floor(Math.random()*15+3)* box
}
// create the score var
let score = 0;

//control snake
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if(event.keyCode == 37 && d !="RIGHT"){
        left.play();
        d="LEFT";
    }
    else if(event.keyCode==38 && d !="DOWN"){
        up.play();
        d="UP";
    }
    else if(event.keyCode ==39 && d !="LEFT"){
        right.play();
        d="RIGHT";
    }
    else if(event.keyCode==40 && d !="UP"){
        down.play();
        d="DOWN";
    }
}
// check collision function

function collision(head,array){
    for(let i = 0;i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw(){
    ctx.drawImage(ground,0,0);
    for(let i=0; i< snake.length; i++){
        ctx.fillStyle = (i == 0)? "yellow": "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //remove the tail
    snake.pop();

    //which direction
    if(d = "LEFT") snakeX -= box;
    if(d = "UP") snakeY -= box;
    if(d = "RIGHT") snakeX += box;
    if(d = "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY){
        score++;
        eat.play();
        food = {
            x: Math.floor(MAth.random()*17+1)*box,
            y: Math.floor(MAth.random()*15+3)*box
        }
        //dont remove the tail
    }else{
        //remove the tail
        snake.pop();
    }
    //game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
            clearInterval(game);
            dead.play();
        }
    
// add new head

    let newHead = {
        X:snakeX,
        y:snakeY
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px change one";
    ctx.fillText(score,2*box,1.6*box);
}
    // call draw function ever 100ms

let game = setInterval(draw,100);