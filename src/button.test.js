import React from "react";
import ReactDOM from "react-dom";
import Button from "./button";
import { render } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Button label="Cool Button" />);
  expect(getByTestId("button")).toHaveTextContent("Cool Button");
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Button label="Cool" />);
  expect(getByTestId("button")).toHaveTextContent("Cool");
});
