var numUpdates = 0
var currentdatalength = 0
var messageInput = 0
var senderInput = 0
var newdatalength = 1
$("#sender").keyup(function(){
   senderInput = $(this).val().length
   dataInsert()
   dataDelete()
})
$("#message").keyup(function(){
  messageInput = $(this).val().length
  console.log(messageInput);
  dataInsert()
  dataDelete()
})
function dataDelete(){
  if((messageInput == 0) || (senderInput == 0)){
    $('#post').prop("disabled",true)
  }
}
function dataInsert(){
  if ((messageInput > 0) && (senderInput > 0)) {
    $('#post').prop("disabled",false)
  }
}
///////////
function updateMessages() {
    numUpdates++
    $.getJSON("http://cs120.liucs.net/assn4/messages.json", "", function(data){
        d = JSON.stringify(data)
        newdatalength = d.length
        if(newdatalength > currentdatalength){
          $("#messageTable tr:not(:first)").remove()
          $.each(data, function(i, row){
            //$.datepicker.formatDate('yy-mm-dd', new Date())
            $("table").append("<tr><td>" + data[i].sender + "</td><td>" + data[i].text + "</td><td><i>" + data[i].timestamp.substring(0,10) + "</i></td><td>"+ data[i].mood +" </td></tr>");
          })
          currentdatalength = newdatalength
        }
        //used for debugging
        console.log("newdatalength is ", newdatalength)
        console.log("currentdatalength is ", currentdatalength)
    })
    // Call this function again after 8s delay
    setTimeout(updateMessages, 8000)
}
$(function(){
    console.log("READY TO GO.")
    $("#post").click(function(event){
        event.preventDefault()
        console.log("YOU CLICKED.")
        // Grab field values
        var Sender = $("#sender").val()
        var Message = $("#message").val()
        var Mood = $("#mood").val()
        if($('#mood').val().length == 0) {
          //mood defaults to emotionless robot
          Mood = "Emotionless Robot"
        }
        console.log([Sender, Message, Mood])
        var obj = {sender: Sender, text: Message, mood: Mood}
        console.log(obj)
        $.ajax({
            url: "http://cs120.liucs.net/assn4/messages.json",
            type: "POST",
            data: JSON.stringify(obj),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(){
            console.log("SUCCESS, posted to server")
            }
        })
    })
    updateMessages()
})

$("#mood").keyup(function(){
    var prefix = $(this).val()
    if(prefix == "") return
    $.getJSON("http://cs120.liucs.net/assn4/messages.json", "", function(data){
        console.log("SUCCESS")
        $("#words").empty()
        for(var i = 0; i < data.length; i++) {
            var w = data[i].mood
            $("#words").append("<option value='"+ w +"'>")
        }
    })
})
