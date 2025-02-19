import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

test("renders button with correct label", () => {
  render(<Button label="Click me" onClick={() => {}} />);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});

test("triggers onClick function when clicked", () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  fireEvent.click(screen.getByText("Click me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
