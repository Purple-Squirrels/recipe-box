import React from 'react';
import '../TempMessenger.css';

export default props => {
  return (
    <section className="message-form-component">
      <div>
        <input className="user-message-input" />
      </div>
      <button onClick = {() => {
        props.props.sendData(document.getElementsByClassName("user-message-input")[0].value)
        }}>Send</button>
    </section>
  )
}