
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(1337);
io.set('log level',1);
function handler(req,res){
    fs.readFile(__dirname + '/index.html',function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('Error');
        }

        res.writeHead(200);
        res.write(data);
        res.end();
    })
}

io.sockets.on('connection',function(socket){
   socket.on('emit_form_client',function(data){
       console.log(data);
       io.sockets.emit('emit_from_server','hello form server:' + data);
   }) ;
});
