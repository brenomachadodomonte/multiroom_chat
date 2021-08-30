/* Import Server Config */
var app = require('./config/server');

/* Setting Listening Port */
var server = app.listen(3000, function(){
    console.log('Listening...')
});

var io = require('socket.io').listen(server);
app.set('io', io);
/* Create socket connection */
io.on('connection', function(socket){
    console.log('User Connected');

    socket.on('disconnect', function(){
        console.log('User disconnect')
    });

    socket.on('msgToServer', function(data){
        socket.emit('msgToClient', data);
        socket.broadcast.emit('msgToClient', data);

        if(parseInt(data.user_updated) === 0){
            socket.emit('usersToClient', {nickname: data.nickname});
            socket.broadcast.emit('usersToClient', {nickname: data.nickname});
        }
    });
});