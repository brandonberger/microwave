var powerOn = false;
var readyForCookTime = false;
var currentDuration = 0;
var countDown;
var cookTime = '00:00';

var clock = document.getElementById('time');
function setClock() {
    if (powerOn === false) {
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
            power();
            setTimer('120');
            break;
        case 'stop':
            power(false);
            currentDuration = 0;
            cookTime = '00:00';
            clearInterval(countDown);
            setClock();
            break;
        case 'cook':
            readyForCookTime = true;
            clock.textContent = '00:00';
            break;
        case 'one':
            if (readyForCookTime) {
                setCookTime(1);
            }
            break;
        case 'two':
            if (readyForCookTime) {
                setCookTime(2);
            }
            break;
        case 'three':
            if (readyForCookTime) {
                setCookTime(3);
            }
            break;
        case 'four':
            if (readyForCookTime) {
                setCookTime(4);
            }
            break;
        case 'five':
                if (readyForCookTime) {
                setCookTime(5);
            }
            break;
        case 'six':
            if (readyForCookTime) {
                setCookTime(6);
            }
            break;
        case 'seven':
            if (readyForCookTime) {
                setCookTime(7);
            }
            break;
        case 'eight':
            if (readyForCookTime) {
                setCookTime(8);
            }
            break;
        case 'nine':
            if (readyForCookTime) {
                setCookTime(9);
            }
            break;
        case 'zero':
            if (readyForCookTime) {
                setCookTime(0);
            }
            break;
        
        
        
    }

});


function power(status = true) {
    powerOn = status;
}


function setCookTime(duration = null) {
    var newCookTime = duration, minutes, seconds;
    
    currentCookTime = cookTime.replace(/0/g, '');
    currentCookTime = currentCookTime.replace(':', '');

    if (duration != null) {
        // 6039 seconds in 99:99 
        if (currentDuration < 6039 && currentCookTime.length < 4) {
            if (currentCookTime.length > 0) {
                if (currentCookTime.length == 1) {
                    currentDuration = ((currentDuration * 10) + newCookTime);
                    // console.log('lengthh: 1');
                } else if (currentCookTime.length == 3) {
                    currentDuration = (((currentDuration * 600 / 60) + (newCookTime * 600)) * 60) / 60 / 1.98485;
                    console.log('lengthh: 3');
                } else {
                    console.log('lengthh: even');
                    console.log(currentDuration);
                    console.log(newCookTime);
                    currentDuration = (((currentDuration * 600 / 60) + (newCookTime * 60)) * 60) / 60 / 2.394;
                }
            } else {
                currentDuration = newCookTime;
            }

            newCookTime = currentDuration;
            currentDuration = newCookTime;

            minutes = parseInt(newCookTime / 60, 10)
            seconds = parseInt(newCookTime % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            cookTime =  minutes + ":" + seconds;;
        }
    } else {
        clock.textContent = '00:00';
        return;
    }

    clock.textContent = cookTime;
}


function setTimer(duration) {
    var timer = duration, minutes, seconds;
    countDown = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        clock.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            power(false);
            clearInterval(countDown);
        }
    }, 1000);
}