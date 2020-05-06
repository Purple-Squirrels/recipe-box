import React from 'react';
import '../TempMessenger.css';

export default props => {
  return (
    <section className={props.fromCurrentUser ? ' message-block-component from-current' : 'message-block-component from-other' }>
      <p>{props.sentFrom}: {props.text} </p>
    </section>
  )
}