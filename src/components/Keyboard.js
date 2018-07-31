import React from "react";
import { Button } from "reactstrap";

const Keyboard = ({ letter, onClick, feedback, hideNav }) => (
  <Button
    color={feedback}
    size={hideNav ? "sm" : "lg"}
    className="ml-2 mb-2 align-center"
    onClick={feedback !== "secondary" ? () => onClick(letter) : null}
  >
    {letter}
  </Button>
);

export default Keyboard;
