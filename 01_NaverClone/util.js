function checkSelectAll()  {

  /* 참고 :  https://hianna.tistory.com/433 */

    const checkboxes = document.querySelectorAll('input[one="checkForm"]');
    const checked = document.querySelectorAll('input[one="checkForm"]:checked');
    const selectAll = document.querySelector('input[one="checkAll"]');
    
    if(checkboxes.length === checked.length)  {
      selectAll.checked = true;
    }else {
      selectAll.checked = false;
    }
  
  }
  
  function selectAll(selectAll)  {
    const checkboxes 
       = document.querySelectorAll('input[one="checkForm"]');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked
    })
  }

  function nextStep(_mode){
    debugMsg("함수실행했음 : nextStep()");

    if(_mode === 1)
    {
      var _tmp1 = document.getElementById('checker1');
      var _tmp2 = document.getElementById('checker2');

      /* 필수약관 만 id로 따로 빼서 if else로 분리 */

      if(_tmp1.checked == false){
          debugMsg("1번 동의 안함");
          alert("1번 필수동의 체크를 안하셨습니다.");
      }else if(_tmp2.checked == false){
          debugMsg("2번 동의 안함");
          alert("2번 필수동의 체크를 안하셨습니다.");
      }else{
          debugMsg("필수선택 1,2 선택했음");
          goPage(1);
          //모드1 : 약관
          //모드2 : 회원정보
      }
    }else if(_mode === 2){
      var _tmp1 = document.getElementById('inputId0');
      var _tmp2 = document.getElementById('inputPw1');
      var _tmp3 = document.getElementById('inputPw2');

      /* 사용자 입력 값들 체크 로직 */

      if(_tmp1 == null || _tmp1.value == ''){
        debugMsg("1번 필드 : null 값");
      }else if(_tmp2 == null || _tmp2.value == ''){
        debugMsg("2번 필드 : null 값");
      }else if(_tmp3 == null || _tmp3.value == ''){
        debugMsg("3번 필드 : null 값");
      }else{
        if(chkPw() == 1){
          goPage(2); // 회원정보를 submit을 하기위한 함수 ( form 액션으로 처리 못한 이유도 함수안에 이야기가.....ㅠㅠ )
        }else{
          alert("비밀번호가 틀립니다!");
        }
      }
    }
  }

  function goPage(_mode){
    /* 버튼에서 바로 action 던질려고 했으나 나중에 후처리 가공을 위해서 구글링 하다보니 submit 함수가 존재 */
    if(_mode === 1){
      document.getElementById('termsFormdata').submit(); // 약관에서 생긴 데이터들 submit
    }else if(_mode === 2){
      document.getElementById('joinFormdata').submit(); // 회원가입에서 생긴 데이터를 submit
    }else{
      debugMsg("지정되지않음");
    }
  }

  function debugMsg(_msg){
    console.log(_msg+" : 에서 메세지 출력"); // 디버깅을 위한 함수
  }

  function regexId(){
    window.onkeyup = (e) => {  // 키보드 입력후 키보드입력이 끝날경우 발생하는 이벤트
      var _tmp = document.getElementById("inputId0");
      if(_tmp == null)// 입력값이 아예 없을때
      {
        document.getElementById("inputReturn0").style.display = "block";
        document.getElementById("inputReturn0").innerHTML = " : <font color=\"red\">아이디는 필수 입력입니다.</font>";
      }
      
      if(_tmp.value === ''){ // 입력값이 비어있을때
        document.getElementById("inputReturn0").style.display = "block";
        document.getElementById("inputReturn0").innerHTML = " : <font color=\"red\">아이디는 필수 입력입니다.</font>";
      }else{
        document.getElementById("inputReturn0").style.display = "none"; // 그 외에는 helper 메세지 div 를 감춘다.
      }
    }
  }

  function regexPw(){
    window.onkeyup = (e) => {
        var _tmp = document.getElementById("inputPw1");

        if(_tmp == null)
        {
          document.getElementById("inputReturn1").style.display = "block";
          document.getElementById("inputReturn1").innerHTML = " : <font color=\"red\">비밀번호는 필수 입력입니다.</font>";
        }
        
        if(_tmp.value === ''){
          document.getElementById("inputReturn1").style.display = "block";
          document.getElementById("inputReturn1").innerHTML = " : <font color=\"red\">비밀번호는 필수 입력입니다.</font>";
        }else{
          document.getElementById("inputReturn1").style.display = "none";
        }
    }
  }

  function samePw(){
    window.onkeyup = (e) => {
      var _org1Pw = document.getElementById("inputPw1");
      var _org2Pw = document.getElementById("inputPw2");
      if(_org1Pw.value === _org2Pw.value){
        document.getElementById("inputReturn2").style.display = "block";
        document.getElementById("inputReturn2").innerHTML = "<font color=\"#03c75a\">입력하신 비밀번호가 같습니다.</font>";
      }else if(_org1Pw.value === '' || _org1Pw == null){
        debugMsg("1번 비었음");
        if((_org2Pw.value === '' || _org2Pw == null))
        {
          debugMsg("2번 비었음");
          document.getElementById("inputReturn2").style.display = "block";
          document.getElementById("inputReturn2").innerHTML = "<font color=\"red\">입력하신 비밀번호가 비어있습니다.</font>";
        }
      }else{
        document.getElementById("inputReturn2").style.display = "block";
        document.getElementById("inputReturn2").innerHTML = "<font color=\"red\">입력하신 비밀번호가 틀립니다.</font>";
      }
    }
  }

  function chkPw(){
      var _org1Pw = document.getElementById("inputPw1");
      var _org2Pw = document.getElementById("inputPw2");
      if(_org1Pw.value === _org2Pw.value){
        return 1;
      }else if(_org1Pw.value === '' || _org1Pw == null){
        debugMsg("1번 비었음");
        if((_org2Pw.value === '' || _org2Pw == null))
        {
          debugMsg("2번 비었음");
          return 0;
        }
      }else{
          return 0;
      }
  }


  // 정규식 데이터 가공 앞으로 처리할 예정