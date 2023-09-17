module.exports = (io) => {

    let nickNames = [];

    io.on('connection', socket =>{
        console.log('Nuevo usuario conectado');

        socket.on('enviar mensaje', (datos) =>{
            io.sockets.emit('nuevo mensaje', {
                msg: datos,
                username:socket.nickNames
            });
        });


        socket.on('nuevo usuario', (datos,callback) => {
    
            if (nickNames.indexOf(datos) != -1 || datos == "") {
                callback(false);
            }else {
                callback(true);
                socket.nickNames = datos;
                nickNames.push(socket.nickNames);
                actualizarUsuarios();
            }
        });


        socket.on('disconnect', datos => {

            
            if (!socket.nickNames) {
                return;
            }
            else {
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                actualizarUsuarios();
            }
        })

        function actualizarUsuarios(){
            io.sockets.emit('usernames', nickNames);
        }
    
    });

    


}