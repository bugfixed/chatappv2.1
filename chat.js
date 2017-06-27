// JavaScript source code

var socket = io();

function submitfunction() {
    var from = $('#user').val();
    var message = $('#m').val();
    if (message != '') {
        socket.emit('chatMessage', from, message);
    }
    $('#m').val('').focus();
    return false;
}

function notifyTyping() {
    var user = $('#user').val();
    socket.emit('notifyUser', user);
    console.log('connected - user :  ' + user);
}

socket.on('chatMessage', function (from, msg) {
    console.log('connected - from :  ' + from + 'msg : ' + msg);
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#009afd';
    var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');

});


socket.on('notifyUser', function (user) {
    var me = $('#user').val();
    if (user != me) {
        $('#notifyUser').text(user + ' is typing ...');
        console.log('connected - user :  ' + user);
    }
    setTimeout(function () { $('#notifyUser').text(''); }, 7000);
});

$(document).ready(function () {
   // var name = makeid();
    $('#userModal').modal('show');
  
});

 $('#usersubmit').click(function () {
    alert('tryr');
 });

function newuser(){
   console.log('dsfskdfjksdjfksdfjkdf');
      var name  =  $('#usernameText').val();
    $('#user').val(name);
    console.log('sdjhksldjklsdjlsd -- ' + name);
    var frm = 'System';
    var ms = '<b>' + name + '</b> has joined the discussion';
    console.log('from: ' + frm + ' ms: ' + ms);
    socket.emit('chatMessage', frm, ms);
    console.log('Done');
   
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
