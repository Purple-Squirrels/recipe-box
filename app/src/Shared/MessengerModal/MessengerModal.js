import React, {useEffect, useState, useContext} from 'react';
import MessageBlockContainerComponent from './Components/MessageBlockContainerComponent';
import MessengerForm from './Components/MessageFormComponent';
import MessageBlockComponent from './Components/MessageBlockComponent'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import AppContext from '../../Context/app-context';
import './TempMessenger.css';

//this has to be global or else it will get redefined on each render (making it null)
let stompClient = null;

export default function MessengerModal() {
  const context = useContext(AppContext);
  const [messages, setMessages] = useState([]);

  const displayNewMessage = incomingMessage => {
    let fromCurrentUser = false;
    if(JSON.parse(incomingMessage.body).from == context.currentUserName){
      fromCurrentUser = true
    }
    setMessages(oldArray => [...oldArray, <MessageBlockComponent 
      text={JSON.parse(incomingMessage.body).message} 
      sentFrom={JSON.parse(incomingMessage.body).from} 
      fromCurrentUser={fromCurrentUser}/>]);
  }

  const sendData = userMessage => {
    stompClient.send("/app/chat/" + "Mike", {}, JSON.stringify({
      from: context.currentUserName,
      text: userMessage
    }));
  }

  const WebSocket = (subcribeUrl, channel) => {
    stompClient = Stomp.over(SockJS(subcribeUrl));
    stompClient.connect({}, () => {
        stompClient.subscribe(channel.route, channel.callback);
    })
  }

  useEffect (() => {
    if(context.connectMessenger){
      const channel = {route: "/topic/messages", callback: displayNewMessage};
      WebSocket("https://sprpurplesquirrel.com/chat", channel);
    }
    else if (stompClient) {
      stompClient.disconnect();
      stompClient = null;
    }
  }, [context.connectMessenger]);

  useEffect(() => {
    const messageBlockContainerComponent = document.getElementsByClassName("message-block-container-component")[0];
    messageBlockContainerComponent.scrollTop = messageBlockContainerComponent.scrollHeight;
  }, [messages]);

  function setMessengerModalHeight() {
    let modal = document.getElementsByClassName("messenger-modal")[0];
    if (modal.style.height == "400px") {
      modal.style.height = "25px";
    }
    else {
      modal.style.height = "400px";
    }
  }

  return (
    <section className="messenger-modal" style={{ display:  context.connectMessenger ? 'flex' : 'none' }}>
        <button type="button" class="collapsible" 
        onClick = {() => {
          setMessengerModalHeight();
          }}> Messenger </button>
        <MessageBlockContainerComponent props={messages} />        
        <MessengerForm props={{ messages, setMessages, sendData }} />
      </section>
  )
}