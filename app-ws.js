module.exports = (server) => {
    const { Server } = require('socket.io');
    const io = new Server(server);

    io.on('connection', (ws) => {

        ws.on('chat message', data => {
            const message = JSON.parse(data);
            message.sender = ws.id;

            console.log(`message from ${message.sender}: ` + message.msg);

            const outbound = JSON.stringify(message);

            io.emit('chat message', outbound);
        });

        ws.on('disconnect', () => {

            console.log(`onClose: client disconnected!`);

        });
    });

    console.log(`App Web Socket Server is runnig!`);
    return io;
}