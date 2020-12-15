import React from "react";
import "./index.css";

function Button({ label }) {
  return (
    <div data-testid="button" className="button-style">
      {label}
    </div>
  );
}

export default Button;
