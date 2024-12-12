import React from "react";

const INPUTSTORE = {};

function InputHandler({ type, id }) {
  INPUTSTORE[id] = 0;
  return <div>InputHandler</div>;
}

export default InputHandler;
