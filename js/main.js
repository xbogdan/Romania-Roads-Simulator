window.onload = function() {
    window.gameWindow = document.getElementById("game-window");
    window.gameWindow.style.backgroundPosition = '0px 0px';
    window.car = document.getElementById("car");
    window.moveCarStep = 243;

    var travelSpeed = 1;
    var travelInterval = 10;

    travel(travelSpeed, travelInterval);
    
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode == 37) {
            moveCar(1);
        }
        if (e.keyCode == 39) {
            moveCar(-1);
        }
    };
}

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

function moveCar(lane) {
    var carStyle = getComputedStyle(window.car, null)
    var lastRight = parseInt(carStyle.getPropertyValue('right'), 10);
    var newRight = lastRight + lane * moveCarStep;
    if ((newRight-77) % moveCarStep == 0 && (newRight-77) / moveCarStep <= 3 && (newRight-77) / moveCarStep >= 0)
        window.car.style.right = newRight + 'px';
}
