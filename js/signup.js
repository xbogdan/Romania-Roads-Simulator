window.onload = function() {
    document.getElementById('signup').onsubmit = function(e) {
        e.preventDefault();
        var valid = true;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        if (name.length < 3) {
            valid = false;
        }
        if (email.length < 7) {
            valid = false;
        }
        if (valid) {
            var child = window.open('game.html');
            sendData(child, {name: name, email: email});
        } else {
            alert('Please complete all fields.');
        }
    };

    var canvas = document.getElementById("title");
    var context = canvas.getContext("2d");

    context.font="40px Georgia";
    context.fillText(String("Driving simulator").toUpperCase(), 0, 40);
    
};


function sendData(child, data) {
    setTimeout(function() {
        child.document.getElementById('username').innerHTML = data.name;
        child.document.getElementById('email').innerHTML = data.email;
    }, 1000);
}
