module.exports = (io) => {

    let nickNames = [];

    io.on('connection', socket => {

        console.log('Nuevo usuario conectado');

        socket.on('enviar mensaje', (datos) => {
            io.sockets.emit('nuevo mensaje', {
                msg: datos,
                username: socket.nickNames
            });
        });

        socket.on('nuevo usuario', (datos, callback) => {

            if (nickNames.indexOf(datos) != -1 || datos == 0) {
                callback(false);
            } else {
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);
                actualizarUsuarios();
            }
        });

        socket.on('disconnect', datos => {

            if (!socket.nickname) {
                return;
            }
            else {
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                actualizarUsuarios();
            }
        })
        function actualizarUsuarios() {
            io.sockets.emit('nombre usuario', nickNames);
        }

    });




}