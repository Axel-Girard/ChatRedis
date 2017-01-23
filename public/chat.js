window.onload = function() {
  var messages = [];
  var socket = io();
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
  var name = document.getElementById("name");

  socket.on('message', function (data) {
    if(data.channel || data.message) {
      var html = '';
      if(data.channel === 'username'){
        html += data.message + ': ';
      } else {
        html += data.message + '<br />';
      }
      content.innerHTML = content.innerHTML + html;
      content.scrollTop = content.scrollHeight;
    } else {
      console.log("There is a problem:", data);
    }
  });

  sendButton.onclick = sendMessage = function() {
    if(name.value === ""){
      alert('Type your name please!');
    } else {
      if(field.value){
        socket.emit('send', {
          username: name.value,
          message: field.value
        });
        field.value = "";
      }
    }
  };
}

$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});
