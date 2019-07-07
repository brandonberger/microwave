var powerOn = false;
var readyForCookTime = false;
var currentDuration = 0;
var countDown;
var cookTime = '';
var paused = false;
var light = false;
var insideLight = false;

var clock = document.getElementById('time');
function setClock() {
    if (powerOn === false && readyForCookTime === false) {
        var t = moment().format('h:mm a');
        clock.textContent = t;
    }
}
setClock();
setInterval(setClock, 30000);


$('.button').on('click', function() {
    btnFunc = $(this).data('function');
    switch (btnFunc) {
        case 'popcorn':
            start('120');
            break;
        case 'stop':
            stop();
            break;
        case 'cook':
            if (!readyForCookTime && !powerOn) {
                readyForCookTime = true;
                clock.textContent = '00:00';
            }
            break;
        case 'one':
            setCookTime(1);
            break;
        case 'two':
            setCookTime(2);
            break;
        case 'three':
            setCookTime(3);
            break;
        case 'four':
            setCookTime(4);
            break;
        case 'five':
            setCookTime(5);
            break;
        case 'six':
            setCookTime(6);
            break;
        case 'seven':
            setCookTime(7);
            break;
        case 'eight':
            setCookTime(8);
            break;
        case 'nine':
            setCookTime(9);
            break;
        case 'zero':
            setCookTime(0);
            break;
        case 'start':
            start();
            break;
        case 'light':
            toggleLight();
            break;
        case 'open':
            break;
    }

});

function start(duration) {
    if (!duration) {
        if (cookTime && currentDuration <= 0) {
            emptySpace = 4 - cookTime.length;
            var zeros = '';
            for (var i = 0; i < emptySpace; i++) {
                zeros += '0';
            }
            cookTime = zeros+cookTime;
            minutes = parseInt(cookTime.slice(0,2) * 60, 10);
            seconds = parseInt(cookTime.slice(2,4), 10) - 1;
            duration = minutes + seconds;
        } else if (paused && currentDuration > 0) {
            paused = false;
            duration = currentDuration;
        }
    }

    if (duration) {
        power();
        setTimer(duration); 
        readyForCookTime = false;
    }
}

function stop() {
    if (currentDuration > 0 && paused === false) {
        paused = true;
        clearInterval(countDown);
    } else if ((currentDuration > 0 && paused) || currentDuration <= 0) {
        power(false);
        paused = false;
        currentDuration = 0;
        cookTime = '';
        clearInterval(countDown);
        setClock();
    }
    toggleInsideLight(false);
}


function toggleLight() {
    if (light) {
        light = false;
        $('.light').hide();
    } else {
        light = true;
        $('.light').show();
    }
}

function toggleInsideLight(status = true) {
    if (status) {
        insideLight = true;
        $('.inside-light').show();
    } else {
        insideLight = false;
        $('.inside-light').hide();
    }
}

function power(status = true) {
    powerOn = status;
    toggleInsideLight(true);
}

function setCookTime(duration = null) {

    if (readyForCookTime) {
        duration = duration;
    } else {
        if (!paused) {
            start(duration * 60);
        }
        return;
    }

    for (var i = 4 - 1; i > 0; i--) {
        cookTime[i] = duration;
        cookTime = cookTime.substr(0, i) + duration + cookTime.substr(i + 1);
        break;
    }

    emptySpace = 4 - cookTime.length;

    var zeros = '';
    for (j = 0; j < emptySpace; j++) {
        zeros += '0';
    }

    displayCookTime = zeros + cookTime;

    var displayCookTime = displayCookTime.slice(0, 2) + ":" + displayCookTime.slice(2,4);

    clock.textContent = displayCookTime;
}


function setTimer(duration) {

    console.log(duration);
    currentDuration = duration;

    var timer = duration, minutes, seconds;
    countDown = setInterval(function () {

        currentDuration--;

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        clock.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            power(false);
            cookTime = '';
            toggleInsideLight(false);
            clearInterval(countDown);
        }
    }, 1000);
}