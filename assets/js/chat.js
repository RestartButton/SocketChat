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

ws.on('chat message', (data) => { // data = { sender: ws.id, data: metadata.msg, time: metadata.time };
    let metadata = JSON.parse(data);
    let mensagem = $(`<div class="${ metadata.sender == ws.id ? "eu" : "outro" }">${metadata.msg}<div>`);
    $('#janela_conversa').append(mensagem);
});
