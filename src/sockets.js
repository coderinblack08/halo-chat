const socketIO = require('socket.io');
function init(server) {
    const io = socketIO(server);
    io.on('connection', (socket) => {
        console.log(`👋 Hello ${socket.id}`);

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    });
}
module.exports = {
    init
};