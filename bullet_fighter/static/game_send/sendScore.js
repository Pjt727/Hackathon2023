function sendScore(){
    const url = '/receiveScore/';
    const score = document.getElementById("score")
    const levelId = document.getElementById("levelId")
    $.ajax({
        url: url,
        type: 'GET',
        data: {'score': score, 'levelId': levelId},
        success: response => {
            
        },
        
    });
}
