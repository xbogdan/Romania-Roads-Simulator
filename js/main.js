var travelSpeed = 5;
var travelInterval = 10;
var leftKey = false;
var rightKey = false;
var carLastPos = 0;
var carMoveStep = 7;
var carMoveAcc = 0;
var images = ['road-template.png', 'car1.png', 'begger1.png', 'drunk1.png', 'drunk2.png', 'drunk3.png', 'hole1.png'];
var obstacleImg = ['begger1.png', 'drunk1.png', 'drunk2.png', 'drunk3.png', 'hole1.png'];


window.onload = function() {
    window.gameWindow = document.getElementById("game-window");
    window.gameWindow.style.backgroundPosition = '0px 0px';
    window.car = document.getElementById("car");

    // set car position
    carLastPos = parseInt(css(window.car, 'left'), 10);

    // preload images
    preload(images);

    // start background movement
    bgMovement(travelSpeed, travelInterval);    

    // start updating keys
    setInterval(updateKeys, 10);

    addRandomObstacles();
}


window.onkeydown = function (e) {
    e = e || e.window;
    carMoveAcc += 0.1;
    if (e.keyCode == 37) {
        leftKey = true;
    }
    if (e.keyCode == 39) { 
        rightKey = true;
    }
        
}


window.onkeyup = function (e) {
    e = e || e.window;
    carMoveAcc = 0;
    if (e.keyCode == 37) {
        leftKey = false;
    }
    if (e.keyCode == 39) { 
        rightKey = false;
    }

}


/*
* Makes background move
*/
function bgMovement(travelSpeed, interval) {
    setTimeout(function() {
        bgMovement(travelSpeed, interval);
    }, interval);
    var gameWindowPos = css(window.gameWindow, 'background-position').split(' ');
    var lastPosX = parseInt(gameWindowPos[0], 10);
    var lastPosY = parseInt(gameWindowPos[1], 10);
    var newPos = lastPosY + travelSpeed;
    window.gameWindow.style.backgroundPosition = lastPosX + 'px ' + newPos + 'px';
}


/*
* Updates car movement
*/
function updateKeys() {
    if (leftKey) {
        carLastPos -= carMoveStep + carMoveAcc;
    }
    if (rightKey) {
        carLastPos += carMoveStep + carMoveAcc;
    }
    window.car.style.left = carLastPos + 'px';
}


/*
* Returns css property of a html element
*/
function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}


/*
* Preload function
*/
function preload(images) {
    for (var i = images.length - 1; i >= 0; i--) {
        var img = new Image();
        img.src = 'img/'+images[i];
    };
}


/*
* Creates a new obstacle
*/
function createObstacle() {
    var element = document.createElement('img');
    element.src = 'img/' + obstacleImg[random(0, obstacleImg.length-1)];
    var imgStyle = element.style;
    imgStyle.position = 'absolute';
    imgStyle.bottom = '100%';
    imgStyle.width = '90px';
    imgStyle.left = random(0, parseInt(css(window.gameWindow, 'width'), 10) - parseInt(imgStyle.width, 10) ) + 'px';
    return element;
}


/*
* Creates a new obstacle
* Adds it to the game window
* Starts moving it
*/
function addObstacle() {
    var ob = createObstacle();
    window.gameWindow.appendChild(ob);
    moveObstacle(ob, travelSpeed, travelInterval);
}


/*
*
*/
function addRandomObstacles() {
    setTimeout(function() {
        addRandomObstacles();
    }, random(500, 1000));
    addObstacle();
    // addObstacle();
}


/*
* Move the obstacle untill it can't be seen anymore
* and then removes it
*/
function moveObstacle(ob, travelSpeed, interval) {
    var oldBottom = parseInt(css(ob, 'bottom'), 10);
    var height = parseInt(css(ob, 'height'), 10);
    if (oldBottom <= -height) {
        window.gameWindow.removeChild(ob);
        return;
    }
    setTimeout(function() {
        moveObstacle(ob, travelSpeed, interval);
    }, interval);
    var newBottom = oldBottom - travelSpeed;
    ob.style.bottom = newBottom + 'px';
}


/*
* Return a random number between min and max
*/
function random(min, max) {
    return Math.floor((Math.random() * max) + min); 
}