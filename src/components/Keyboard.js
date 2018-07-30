import React from "react";
import { Button } from "reactstrap";

const Keyboard = ({ letter, onClick, feedback, hideNav }) => (
  <Button
    color={feedback}
    size={hideNav ? "md" : "lg"}
    className="ml-2 mb-2"
    onClick={feedback !== "secondary" ? () => onClick(letter) : null}
  >
    {letter}
  </Button>
);

export default Keyboard;
