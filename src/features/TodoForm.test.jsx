import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
//import {userEvent} from @testing-library/user-event;
import TodoForm from "./TodoForm";
import App from "../App";

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
