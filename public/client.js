const socket =io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
do{
   name= prompt('Please enter your name: ')
}while(!name)
//logic is until the user doesn't enter the name keep looping or asking for name 
textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter')
    {
        sendMessage(e.target.value)
    }
})
function sendMessage(message)
{
    //logic to send message
    let msg={
        user:name,
        message:message.trim()
    }
    //append the message there 
    appendMessage(msg,'outgoing')
    textarea.value=''
    scroll()
    socket.emit('message',msg)
}

//send to the server

function appendMessage(msg,type)
{
      let mainDiv=document.createElement('div')
      let  className=type
      mainDiv.classList.add(className,'message')
      let markup=`
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
      `
      mainDiv.innerHTML=markup
      messageArea.appendChild(mainDiv)
      
}
socket.on('message',(msg)=>{
appendMessage(msg,'incoming')
//only on browser's console 
 scroll()
})
function scroll()
{
    messageArea.scrollTop=messageArea.scrollHeight
}