var loginFailCount = 0; // 로그인 실패 횟수 카운터
var loginMaxFailCount = 3; // 로그인 실패 제한 횟수
var loginTimeInterval = 0.5 * 60 * 1000; // 로그인 유지 시간 (5분)



function login() {

    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");

    form.action = "../index_login.html";
    form.method = "get";

    if (check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.");
        setCookie("id", id.value, 1); // 1일 저장
        alert("쿠키 값 :" + id.value);
    } else { // 아이디 체크 x
        setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }

    if (id.value.length === 0 || password.value.length === 0) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
   
    if (login_check(id.value, password.value)) { // 아이디와 패스워드 필터링 체크
        session_set(); //세션 생성
        form.submit();
    } else {
        loginFailCount++; // 로그인 실패 횟수 증가
    if (loginFailCount >= loginMaxFailCount) {
      alert("로그인이 제한되었습니다.");
      return;
    }
    alert("아이디와 패스워드의 형식이 올바르지 않습니다.");
  }
}





function login_check(id, password) {
    var emailRegex = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/

    if (emailRegex.test(id) === false || passwordRegex.test(password) === false) {
        return false; // 아이디 또는 패스워드 형식이 올바르지 않으면 false 반환
    }

    console.log(id + '님 반갑습니다!');
    return true; // 형식이 올바르면 true 반환
}


function logout() {

    session_del(); // 세션 삭제
    location.href = "../index.html";
}





function get_id() {
    if (true) {
        decrypt_text();
    } else {
        var getParameters = function(paramName) { // 변수 = 함수(이름)
            var returnValue; // 리턴값을 위한 변수 선언
             var url = location.href; // 현재 접속 중인 주소 정보 저장
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
            for (var i = 0; i < parameters.length; i++) {
                var varName = parameters[i].split('=')[0];

                if (varName.toUpperCase() == paramName.toUpperCase()) {
                    returnValue = parameters[i].split('=')[1];
                    return decodeURIComponent(returnValue);
                    // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
                }
            } // 2중 for문 끝
        }; // 함수 끝
        alert(getParameters('id') + '님 반갑습니다!'); // 메시지 창 출력
    }



    var id = 'id';
    var password = 'password';

    //로그인 정보 검사
    login_check(id, password);
}




function init() { // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");

    if (get_id) {
        id.value = get_id;
        check.checked = true;
    }
    session_check(); //세션 유무 검사
   
}


                /*function session_set() { //세션 저장
                    let id = document.querySelector("#floatingInput");
                    if (sessionStorage) {
                        sessionStorage.setItem("Session_Storage_test", id.value);

                    } else {
                        alert("로컬 스토리지 지원 x");
                    }
                }
                */

function addJavascript(jsname) {
  var script = document.createElement('script');
  script.setAttribute('src', jsname);
  document.head.appendChild(script);
}

addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수