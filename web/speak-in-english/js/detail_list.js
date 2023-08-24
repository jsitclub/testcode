
async function init_list(selected_data) {
    var testData;
    // title 변경
    switch (selected_data) {
        case 'N':
            document.getElementById('logo').textContent = "자주 사용되는 명사"
            break;

        case 'N_OBJ':
            document.getElementById('logo').textContent = "명사 - 사물"
            break;

        case 'N_JOB':
            document.getElementById('logo').textContent = "명사 - 직업"
            break;

        case 'N_LOC':
            document.getElementById('logo').textContent = "명사 - 장소"
            break;

        case 'V':
            document.getElementById('logo').textContent = "자주 사용되는 동사"
            break;
        
        case 'V_PAST':
            document.getElementById('logo').textContent = "불규칙 과거동사"
            break;
            

        case 'A':
            document.getElementById('logo').textContent = "자주 사용되는 형용사"
            break;

        case 'AD':
            document.getElementById('logo').textContent = "자주 사용되는 부사"
            break;

        case 'WORD_BASIC_0':
            document.getElementById('logo').textContent = "기본단어 0"
            break;
        case 'WORD_BASIC_1':
            document.getElementById('logo').textContent = "기본단어 1"
            break;
        case 'WORD_BASIC_2':
            document.getElementById('logo').textContent = "기본단어 2"
            break;
        case 'WORD_BASIC_3':
            document.getElementById('logo').textContent = "기본단어 3"
            break;
        case 'WORD_BASIC_4':
            document.getElementById('logo').textContent = "기본단어 4"
            break;
        case 'WORD_BASIC_5':
            document.getElementById('logo').textContent = "기본단어 5"
            break;
        case 'WORD_BASIC_6':
            document.getElementById('logo').textContent = "기본단어 6"
            break;
        case 'WORD_BASIC_7':
            document.getElementById('logo').textContent = "기본단어 7"
            break;
        case 'WORD_BASIC_8':
            document.getElementById('logo').textContent = "기본단어 8"
            break;
        case 'WORD_BASIC_9':
            document.getElementById('logo').textContent = "기본단어 9"
            break;
    
        case 'SV':
            document.getElementById('logo').textContent = "주어 + 동사"
            break;

        case 'SV1':
            document.getElementById('logo').textContent = "주어 + 동사 - 확장"
            break;

        case 'SB':
            document.getElementById('logo').textContent = "주어 + be동사"
            break;

        case 'SVO':
            document.getElementById('logo').textContent = "주어 + 동사 + 목적어"
            break;
    }

    
    var new_tag = document.getElementById('to_training')
    new_tag.setAttribute('href', 'training.html?training_class=' + selected_data);

    const response = await fetch(`./data/${selected_data}.json`);
    // console.log(`../data/${selected_data}.json`);
    testData = await response.json();



    // 내용 추가
    let content_table = document.getElementById('content_table');
    for (var i = 0; i < testData['data'].length; i++) {

        var new_tr = document.createElement('tr');

        var new_td = document.createElement('td');
        new_td.setAttribute('class', 'item');
        new_td.innerHTML = testData['data'][i]['ko'];
        new_tr.appendChild(new_td);

        var new_td = document.createElement('td');
        new_td.setAttribute('class', 'item');
        new_td.innerHTML = testData['data'][i]['en'];
        new_tr.appendChild(new_td);

        content_table.appendChild(new_tr);

    }
}