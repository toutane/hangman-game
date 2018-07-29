import React from "react";
import { Button } from "reactstrap";

const HIDDEN_SYMBOL = "__";

const Letter = ({ letter, feedback }) => (
  <Button
    outline={feedback === "hidden" ? true : false}
    color={feedback === "hidden" ? "secondary" : "success"}
  >
    {feedback === "hidden" ? HIDDEN_SYMBOL : letter}
  </Button>
);

export default Letter;
