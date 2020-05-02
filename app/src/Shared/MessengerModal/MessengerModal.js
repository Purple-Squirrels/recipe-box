import React, {useEffect, useState} from 'react';
import MessageBlockContainerComponent from './Components/MessageBlockContainerComponent';
import MessengerForm from './Components/MessageFormComponent';
import MessageBlockComponent from './Components/MessageBlockComponent'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { getSessionCookie } from '../../Sessions';
import './TempMessenger.css';

//this has to be global or else it will get redefined on each render (making it null)
let stompClient = null;

let modalDisplay = 'none'

export default function MessengerModal() {
  const [messages, setMessages] = useState([]);
  const [session, setSession] = useState(getSessionCookie());
  const [isConnectionReady, setIsConnectionReady] = useState(false)

  const displayNewMessage = incomingMessage => {
    setMessages(oldArray => [...oldArray, <MessageBlockComponent text={JSON.parse(incomingMessage.body).message} />]);
  }

  const sendData = userMessage => {
    console.log()
    stompClient.send("/app/chat/" + "Mike", {}, JSON.stringify({
      from: session.userName,
      text: userMessage
    }));
  }

  const WebSocket = (subcribeUrl, ArrayOfChannels) => {
    stompClient = Stomp.over(SockJS(subcribeUrl));
    stompClient.connect({}, () => {
      ArrayOfChannels.forEach((channel) => {
        stompClient.subscribe(channel.route, channel.callback);
        const checkIfLoggedIn = () => {
          setTimeout(() => {
            const onLoginPage = window.location.pathname === "/";
            if (onLoginPage) {
              checkIfLoggedIn()
            }
            else {
              setIsConnectionReady(true);
              return;
            }
          }, 1000)
        }
        checkIfLoggedIn();
      })
    })
  }

  useEffect(
    () => {
      setSession(getSessionCookie());
    },
    [session.userName]
  );

  useEffect (() => {
    const channel = {route: "/topic/messages", callback: displayNewMessage}
    const ArrayOfChannels = [channel]
    WebSocket("https://sprpurplesquirrel.com/chat", ArrayOfChannels)
  }, [])

  useEffect(() => {
    const messageBlockContainerComponent = document.getElementsByClassName("message-block-container-component")[0];
    messageBlockContainerComponent.scrollTop = messageBlockContainerComponent.scrollHeight;
  }, [messages]);

  if (isConnectionReady) {
    modalDisplay = 'block';
  }

  return (
    <section className="messenger-modal" style={{ display: modalDisplay }}>
        <MessageBlockContainerComponent props={messages} />
        <MessengerForm props={{ messages, setMessages, sendData }} />
      </section>
  )
}