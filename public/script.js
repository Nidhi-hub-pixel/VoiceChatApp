const socket=io("/");

var peer=new PeerServer(undefined,{
    path:"/peerjs",host:"/",port:"443"
})
const user=prompt("Enter your name")
$(function () {
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none")
        $(".right-window").css("display", "block")
        $(".header_back").css("display", "block")
    })
    $(".header_back").click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })
    $("#send").click(function(){
        if ($("#chat_message").val().length!==0){
            socket.emit("message",$("#chat_message").val())
            $("#chat_message").val()="";
        }
    })
    $("#chat_message").keydown(function(e){
        if ($("#chat_message").val().length!==0 && e.key=="Enter"){
            socket.emit("message",$("#chat_message").val())
            $("#chat_message").val()="";
        }
    })
})
peer.on("open",(id)=>{
    socket.emit("join-room",ROOM_ID,id,user)
})
socket.on("createMessage",(message)=>{
    $(".messages").append(`<div class="message"><span>${message}</span></div>`)
})