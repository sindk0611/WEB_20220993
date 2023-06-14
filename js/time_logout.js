var logoutUser = false;
var timeoutHnd = null;
var logoutTimeInterval = 0.5 * 60 * 1000;

function onuseractivite() {
    if (logoutUser) {
        // Do nothing
    } else {
        resetLogOutTimer();
    }
}

function onTimeoutReached() {
    logoutUser = true;
    alert("세션의 지속시간은 5분입니다. 만료되면 자동 로그아웃됩니다.");
    session_del();
    window.location.href = "index.html";
}

function resetLogOutTimer() {
    clearTimeout(timeoutHnd);
    // Set new timeout
    timeoutHnd = setTimeout(onTimeoutReached, logoutTimeInterval);
}

document.body.onclick = onuseractivite;
timeoutHnd = setTimeout(onTimeoutReached, logoutTimeInterval);

// 세션 삭제
function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert("세션 만료");
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}
