const ws = io();
var nLidas = [];

$('body').ready(function() {
    $('#botao_enviar').click(function () {
        if($('#apelido_usuario').val() != '' && $('#codigo_sala').val() != '') {
            if($('#campo_mensagem').val().trim() != ''){

                let metadata = JSON.stringify({
                    nick: $('#apelido_usuario').val().trim(),
                    msg: $('#campo_mensagem').val().trim(), 
                    time: new Date(),
                    room: $('#codigo_sala').val().trim(),
                });

                ws.emit('chat message', metadata);
                $('#campo_mensagem').val('');
            }
        } else {
            alert('Ambos os campos Apelido e Código precisam ser preenchidos');
        }
    });

    $('#codigo_sala').focusout(function() {
        $('#codigo_sala').val($('#codigo_sala').val().trim());
        if($('#codigo_sala').val().trim() != '') {
            ws.emit('room', $('#codigo_sala').val().trim());
            $('#janela_conversa').empty();
        }
    });

    document.addEventListener("visibilitychange", () => {
        if(document.visibilityState === 'visible') {
            while(nLidas.length > 0){
                let data = nLidas.pop();
                ws.emit('read',data);
            }
        }
    });
});

ws.on('chat message', (data) => { // data = { sender: ws.id, msg: metadata.msg, time: metadata.time };
    let metadata = JSON.parse(data);
    let enviado = new Date(metadata.time);
    let mensagem = $(`<div class="balao_mensagem ${ metadata.sender == ws.id ? "eu" : "outro" }"><div class="mensagem">${metadata.nick}: ${metadata.msg}</div><span>${enviado.getHours()}:${enviado.getMinutes()}:${enviado.getMilliseconds()}</span></div>`);
    $('#janela_conversa').append(mensagem);
    if(metadata.sender != ws.id){
        if(!document.hidden) {
            ws.emit('read',data);
        } else {
            nLidas.push(data);
        }
    }
});

ws.on('read', (data) => {
    let metadata = JSON.parse(data);
    let enviado = new Date(metadata.time);
    if(metadata.sender == ws.id){
        $('.balao_mensagem').each(function() {
            if($(this).find('.mensagem').text() == `${metadata.nick}: ${metadata.msg}` && $(this).find('span').text() == `${enviado.getHours()}:${enviado.getMinutes()}:${enviado.getMilliseconds()}`){
                $(this).find('span').append(' - Visto');
            }
        });
    }
})
