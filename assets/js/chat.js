const ws = io();

$('#botao_enviar')[0].onclick = function () {
    if($('#campo_mensagem').val().trim() != ''){
        ws.emit('chat message', $('#campo_mensagem').val().trim());
        $('#campo_mensagem').val('');
    }
};

ws.on('chat message', (data) => {
    let mensagem = $(`<div>${data}<div>`);
    $('#janela_conversa').append(mensagem);
});
