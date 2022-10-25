module.exports = (server) => {
    const { Server } = require('socket.io');
    const io = new Server(server);
    //const clients = new Map();

    io.on('connection', (ws) => {

        /*
        const id = uuidv4();
        const metadata = {id};

        clients.set(ws, metadata);

        ws.on('register', data => {
            const message = JSON.parse(data);
            const metadata = clients.get(ws);

            message.sender

            io.emit('return', outbound)
        })
        */
        ws.on('chat message', data => {
            console.log(`message: ` + data);

            io.emit('chat message', data);
        });

        ws.on('disconnect', () => {
            //const metadata = clients.get(ws);
            console.log(`onClose: client disconnected!`);
            //clients.delete(ws);
        });
    });
/*
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
*/
    console.log(`App Web Socket Server is runnig!`);
    return io;
}