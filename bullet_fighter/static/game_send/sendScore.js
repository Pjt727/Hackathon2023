function sendScore(form){
    const url = '/receiveScore/';
    $.ajax({
        url: url,
        type: 'GET',
        data: form.serialize(),
        success: response => {
            
        },
    });
}
