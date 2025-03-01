import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../Counter";

test("renders Counter component with default count", () => {
  render(<Counter />);
  expect(screen.getByText(/count:/i)).toHaveTextContent("Count: 0");
});

test("increments count when increment button is clicked", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increment"));
  expect(screen.getByText(/count:/i)).toHaveTextContent("Count: 1");
});

test("decrements count when decrement button is clicked", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Decrement"));
  expect(screen.getByText(/count:/i)).toHaveTextContent("Count: -1");
});
