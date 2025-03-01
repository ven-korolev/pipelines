import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList"; // Adjust the import based on your file structure

describe("TodoList Component", () => {
  test("renders input, button, and empty list", () => {
    render(<TodoList />);
    
    // Check if input field is in the document
    expect(screen.getByPlaceholderText("Add a task")).toBeInTheDocument();

    // Check if button is in the document
    expect(screen.getByText("Add")).toBeInTheDocument();

    // Check if the list is initially empty
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("allows users to type in the input field", () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText("Add a task");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input.value).toBe("New Task");
  });

  test("adds a task when clicking the Add button", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(button);

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  test("does not add an empty task", () => {
    render(<TodoList />);

    const button = screen.getByText("Add");
    fireEvent.click(button);

    // The list should still be empty
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("adds multiple tasks", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Task 3" } });
    fireEvent.click(button);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(3);
    expect(listItems[0]).toHaveTextContent("Task 1");
    expect(listItems[1]).toHaveTextContent("Task 2");
    expect(listItems[2]).toHaveTextContent("Task 3");
  });
});
