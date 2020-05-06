import React from 'react';
import '../TempMessenger.css';

export default props => {
  const sendMessage = () => {
    props.props.sendData(document.getElementsByClassName("user-message-input")[0].value);
    document.getElementsByClassName("user-message-input")[0].value = "";
  }
  return (
    <section className="message-form-component">
      <div>
        <input className="user-message-input" 
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') { return; };
                    sendMessage();
                }}
        />
      </div>
      <button onClick = {() => {
        sendMessage()
        }}>Send</button>
    </section>
  )
}