
let data_i = 0; // 테스트 항목 순번

var testData, a;
var jsonData;
var voices = [];

async function get_data(selected_data="V") {
    
    const response = await fetch(`./data/${selected_data}.json`);
    
    // console.log(selected_data);

    testData = await response.json();
    if (document.getElementById("chk_random").checked) {
        testData["data"].sort(() => Math.random() - 0.5);
    }
    setVoiceList();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

}

function start_training(new_test=true) {
    // document.getElementById("study_control").style.display = 'none';
    
    document.getElementById("btnTraining").innerHTML = "STOP";
    window.speechSynthesis.cancel();

    // if (document.getElementById("chk_random").checked) {
    //     testData["data"].sort(() => Math.random() - 0.5);
    // }
    
    // data_i = 0;

    document.getElementById("Q").innerHTML = '...';
    document.getElementById("click_Q").setAttribute( 'onclick', '' );
    document.getElementById("A").innerHTML = '크고 정확하게 말해보세요.';
    // document.getElementById("click_A").setAttribute( 'onclick', '' );


    do_test(0);
}

function stop_training() {
    // document.getElementById("study_control").style.display = 'block';
    document.getElementById("btnTraining").innerHTML = "PLAY";
    document.getElementById("click_Q").setAttribute( 'onclick', 'go_next()' );
    document.getElementById("click_A").setAttribute( 'onclick', 'show_answer()' );
    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화
    clearTimeout(a);
}

function do_test(seq) {
    if (seq != -1 && data_i == testData.data.length) {
        a = setTimeout(do_test, 5000, -1);
        return 0;
    }

    const iterator = testData["data"][data_i]
    let interval_ms = 0;
    switch (seq) {
        case 0:
            lang = "ko"
            if (data_i == 0) {
                interval_ms = 1000;
            }
            else {
                interval_ms = 3000;
                clearTimeout(a);
            }
            a = setTimeout(korean, interval_ms, iterator[lang], ++seq);
            break;
        case 1:
            lang = "en"

            interval_ms = document.getElementById("interval_val").innerHTML * 1000;

            clearTimeout(a);
            a = setTimeout(english, interval_ms, iterator[lang], ++seq);
            data_i++;
            break;

        case -1:
            document.getElementById("Q").innerHTML = '모든 문제를 마쳤습니다.';
            document.getElementById("A").innerHTML = '수고하셨습니다.';
            document.getElementById("btnTraining").innerHTML = "PLAY"
            data_i = 0;

            return 0;
    }
}

function go_next() {
    if (data_i == testData.data.length - 1) {
        alert("모든 문제를 마쳤습니다. 수고 하셨습니다.")
        data_i = 0;
        return
    }
    else {
        data_i++;
    }
    lang = "ko"
    iterator = testData["data"][data_i]
    document.getElementById("Q").innerHTML = iterator[lang];
    document.getElementById("A").innerHTML = '여기를 클릭하세요.';
    speech(iterator[lang], lang, 1)
}


function show_answer() {
    lang = "en"
    document.getElementById("A").innerHTML = iterator[lang];
    speech(iterator[lang], lang, 1)
}

function setVoiceList() {
    voices = window.speechSynthesis.getVoices();
}

function speech(txt, lang, speed = 1, pitch = 1) {
    // window.speechSynthesis.cancel() // 현재 읽고있다면 초기화
    if (!window.speechSynthesis) {
        alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
        return;
    }

    var utterThis = new SpeechSynthesisUtterance(txt);

    //목소리 선택
    var voiceFound = false;
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang.indexOf(lang) >= 0 || voices[i].lang.indexOf(lang.replace('-', '_')) >= 0) {
            utterThis.voice = voices[i];
            voiceFound = true;
        }
    }

    utterThis.lang = lang;
    utterThis.pitch = pitch;
    utterThis.rate = speed;  //속도
    utterThis.name = "ko-KR-Wavenet-C";
    
    window.speechSynthesis.speak(utterThis)
}

function korean(text, seq) {
    document.getElementById("Q").innerHTML = text;
    document.getElementById("A").innerHTML = '크고 정확하게 말해보세요.';
    speech(text, 'ko-KR', 1);
    do_test(seq);
}

function english(text, seq) {
    document.getElementById("A").innerHTML = text;
    speech(text, 'en-US', 1);
    do_test(0);
}

