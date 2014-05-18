var travelSpeed = 5;
var travelInterval = 10;
var leftKey = false;
var rightKey = false;
var carLastPos = 0;
var carMoveStep = 3;
var carMoveAcc = 0;
window.onload = function() {
    window.gameWindow = document.getElementById("game-window");
    window.gameWindow.style.backgroundPosition = '0px 0px';
    window.car = document.getElementById("car");
    carLastPos = parseInt(css(window.car, 'left'), 10);
    
    travel(travelSpeed, travelInterval);    
    
    setInterval(updateKeys, 1);
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
*
*/
function travel(travelSpeed, interval) {
    setTimeout(function() {
        travel(travelSpeed, interval);
    }, interval);
    var gameWindowPos = window.gameWindow.style.backgroundPosition.split(' ');
    var lastPosX = parseInt(gameWindowPos[0], 10);
    var lastPosY = parseInt(gameWindowPos[1], 10);
    var newPos = lastPosY + travelSpeed;
    window.gameWindow.style.backgroundPosition = lastPosX + 'px ' + newPos + 'px';
}


/*
*
*/
function moveElement(element, travelSpeed, interval) {
    setTimeout(function() {
        moveElement(element, travelSpeed, interval);
    }, interval);
    var lastPosY = parseInt(element.style.bottom, 10);
    var newPosY = lastPosY - travelSpeed;
    element.style.bottom = newPosY + 'px';
    return element;
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