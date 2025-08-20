import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
//import {userEvent} from @testing-library/user-event;
import TodoForm from "./TodoForm";
import App from "../App";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import userEvent from "@testing-library/user-event";

describe("App test suite", () => {
  it("contains a `div` html element", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Hi, welcome to code the dream swag page/i,
      })
    ).toBeInTheDocument();
  });
});

describe("form button disabled", () => {
  it("disable button until input has text", () => {
    render(<TodoForm onAddTodo={() => {}}></TodoForm>);
    const screenInput = screen.getByPlaceholderText("add todo");
    const button = screen.getByRole("button", { name: /Add Todo/i });
    expect(screenInput).toHaveValue("");
    expect(button).toBeDisabled();
  });
});

describe("form button enabled", () => {
  it("disables button until input has text", async () => {
    const user = userEvent.setup();

    render(<TodoForm onAddTodo={() => {}} />);

    // grab input by its label
    const input = screen.getByPlaceholderText("add todo");
    const button = screen.getByRole("button", { name: /add todo/i });

    // Initially disabled
    expect(button).toBeDisabled();

    // Type text into the input
    await user.type(input, "value");

    // Now button should be enabled
    expect(button).toBeEnabled();

    // Clear input -> button disabled again
    await user.clear(input);
    expect(button).toBeDisabled();
  });
});
