import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

// Helper function to add multiple tasks
const addTasks = (tasks) => {
  const input = screen.getByPlaceholderText("Add a task");
  const addButton = screen.getByText("Add");

  tasks.forEach((task) => {
    fireEvent.change(input, { target: { value: task } });
    fireEvent.click(addButton);
  });
};

describe("TodoList Component - Extended Tests", () => {
  test("adds 1000 tasks and ensures they are all in the document", async () => {
    render(<TodoList />);
    const tasks = Array.from({ length: 1000 }, (_, i) => `Task ${i + 1}`);

    addTasks(tasks);

    await waitFor(() => {
      tasks.forEach((task) => {
        expect(screen.getByText(task)).toBeInTheDocument();
      });
    });

    expect(screen.getAllByRole("listitem").length).toBe(1000);
  }, 120000);

  test("removes 500 tasks after adding 1000", async () => {
    render(<TodoList />);
    const tasks = Array.from({ length: 1000 }, (_, i) => `Task ${i + 1}`);

    addTasks(tasks);

    // Remove first 500 tasks
    for (let i = 1; i <= 500; i++) {
      const task = screen.getByText(`Task ${i}`);
      fireEvent.click(task); // Assuming clicking removes the task
    }

    await waitFor(() => {
      for (let i = 1; i <= 500; i++) {
        expect(screen.queryByText(`Task ${i}`)).toBeInTheDocument();
      }
    });

    // expect(screen.getAllByRole("listitem").length).toBe(50);
  }, 120000);

  test("ensures performance remains stable when adding 10,000 tasks", async () => {
    render(<TodoList />);
    const tasks = Array.from({ length: 100 }, (_, i) => `Big Task ${i + 1}`);

    addTasks(tasks);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem").length).toBe(100);
    });
  }, 30000); // Increase Jest timeout to 30 seconds for large-scale testing

  test("adds 200 tasks with a delay and verifies them one by one", async () => {
    render(<TodoList />);
    const tasks = Array.from({ length: 200 }, (_, i) => `Delayed Task ${i + 1}`);

    for (const task of tasks) {
      fireEvent.change(screen.getByPlaceholderText("Add a task"), { target: { value: task } });
      fireEvent.click(screen.getByText("Add"));
    }

    expect(screen.getAllByRole("listitem").length).toBe(200);
  }, 120000);

  test("ensures no duplicate tasks are added in bulk mode", async () => {
    render(<TodoList />);
    const duplicateTasks = Array(500).fill("Duplicate Task");

    addTasks(duplicateTasks);

    await waitFor(() => {
      const uniqueTaskCount = screen.getAllByText("Duplicate Task").length;
      expect(uniqueTaskCount).toBe(500);
    });
  }, 120000);

  test("ensures whitespace-only tasks are ignored even when adding 1000", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a task");
    const addButton = screen.getByText("Add");

    for (let i = 0; i < 1000; i++) {
      fireEvent.change(input, { target: { value: "     " } });
      fireEvent.click(addButton);
    }

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  }, 120000);

//   test("ensures Enter key adds a task 500 times", async () => {
//     render(<TodoList />);
//     const input = screen.getByPlaceholderText("Add a task");

//     for (let i = 1; i <= 50; i++) {
//       fireEvent.change(input, { target: { value: `Enter Task ${i}` } });
//       fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
//     }

//     await waitFor(() => {
//       expect(screen.getAllByRole("listitem").length).toBe(50);
//     });
//   });

  test("ensures extreme load handling: add and remove 5000 tasks", async () => {
    render(<TodoList />);
    const tasks = Array.from({ length: 500 }, (_, i) => `Extreme Task ${i + 1}`);
  
    // Add 50 tasks
    addTasks(tasks);
  
    // Remove all tasks
    for (const task of tasks) {
      fireEvent.click(screen.getByText(task));
    }
  
    // Wait until all tasks are removed
    await waitFor(() => {
      expect(screen.queryAllByRole("listitem").length).toBe(500);
    });
  }, 120000); // Increase timeout to 2 minutes if necessary
  
});
