import React from 'react';
import '../TempMessenger.css';

export default props => {
  return (
    <section className="message-block-component">
      <p> {props.text} </p>
    </section>
  )
}