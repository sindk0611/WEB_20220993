var close_time;
var close_time2 = 10;

clearTimeout(close_time);
close_time = setTimeout(close_window, 10000);
show_time();

function show_time() {
    let divClock = document.getElementById('Time');
    divClock.innerText = "남은 시간은 " + close_time2 + "초 입니다.";
    close_time2--;
    if (close_time2 >= 0) {
        setTimeout(show_time, 1000);
    }
}

function close_window() {
    window.close();
}


//window.onload=showWindow;
