const ws = io();

$('body').ready(function() {
    $('#botao_enviar').click(function () {
        if($('#campo_mensagem').val().trim() != ''){

            let metadata = JSON.stringify({
                msg: $('#campo_mensagem').val().trim(), 
                time: new Date(),
            })

            ws.emit('chat message', metadata);
            $('#campo_mensagem').val('');
        }
    });
});

ws.on('chat message', (data) => { // data = { sender: ws.id, msg: metadata.msg, time: metadata.time };
    let metadata = JSON.parse(data);
    let enviado = new Date(metadata.time);
    let mensagem = $(`<div class="balao_mensagem ${ metadata.sender == ws.id ? "eu" : "outro" }">${metadata.msg}<span>${enviado.getHours()}:${enviado.getMinutes()}:${enviado.getMilliseconds()}</span></div>`);
    $('#janela_conversa').append(mensagem);
    if(metadata.sender != ws.id){
        ws.emit('read',data);
    }
});

ws.on('read', (data) => {
    let metadata = JSON.parse(data);
    let enviado = new Date(metadata.time);
    if(metadata.sender == ws.id){
        $('.balao_mensagem').each(function() {
            if($(this).text() == `${metadata.msg}${enviado.getHours()}:${enviado.getMinutes()}:${enviado.getMilliseconds()}` && $(this).find('span').text() == `${enviado.getHours()}:${enviado.getMinutes()}:${enviado.getMilliseconds()}`){
                $(this).find('span').append(' - Visto');
            }
        });
    }
})
