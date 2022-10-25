module.exports = (server) => {
    const { Server } = require('socket.io');
    const io = new Server(server);
    const clients = new Map();

    io.on('connection', (ws) => {

        ws.on('room', data => {

            if(clients.get(ws)){
                console.log(`${ws.id} was disconnected from room ${clients.get(ws).room}`);
                ws.leave(clients.get(ws).room);
                clients.delete(ws);
            }

            console.log(`${ws.id} connected on room ${data}`);
            const room = data;
            clients.set(ws, { room });

            ws.join(data);
        });

        ws.on('chat message', data => {
            const message = JSON.parse(data);
            message.sender = ws.id;

            console.log(`message from ${message.sender} on ${message.room}: ${message.msg}`);

            const outbound = JSON.stringify(message);

            io.in(message.room).emit('chat message', outbound);
        });

        ws.on('read', data => {
            const message = JSON.parse(data);
            console.log(`message from ${message.sender} was read by ${ws.id}`);

            io.in(message.room).emit('read', data);
        });

        ws.on('disconnect', () => {

            console.log(`onClose: ${ws.id} disconnected!`);

        });
    });

    console.log(`App Web Socket Server is runnig!`);
    return io;
}