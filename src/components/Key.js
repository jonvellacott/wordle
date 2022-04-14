import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, status, disabled }) {
  const {  onSelectLetter, onEnter, onDelete, } =
    useContext(AppContext);



  const selectLetter = () => {
    //if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={bigKey ? "big" : status }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;