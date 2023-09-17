$(function(){
    const socket = io();  
    var nick = ''; 
    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');
    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');
    const userNames = $('#usernames');


    messageForm.submit( e =>{
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    });

    socket.on('nuevo mensaje', function (datos) {
        let color = '#f5f4f4';
        if(nick == datos.username){
            color = '#9ff4c5';
        }

        if (datos.msg != ''){
            chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><p class="msg"><b>${datos.username} :</b> ${datos.msg}</p></div>
        `);
        }

        
    })

    nickForm.submit( e => {
        e.preventDefault();

        socket.emit('nuevo usuario', nickName.val(), datos => {
            
        if (datos) {
            nick = nickName.val();
            $('#nick-wrap').hide()
            $('#content-wrap').show()
        } 
        else 
        {
        nickError.html(`<div class="alert alert-danger">El usuario ya existe o no puede ser vacio</div>`); 
        }
        nickName.val('')

        });
    });

    socket.on('nombre usuario', datos => {
        let html = '';
        let color = '';
        let salir = '';
        for (let i = 0; i < datos.length; i++) {
            if(nick == datos[i]){
                color = '#027f43';
                salir = `<a class="enlace-salir" href="/"><i class="fas fa-sign-out-alt salir"></i></a>`;
            }else{
                color = '#000';
                salir = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${datos[i]} ${salir}</p>`;
            
        }
        userNames.html(html)
    });

    


});

