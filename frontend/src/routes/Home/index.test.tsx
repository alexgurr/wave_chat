import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "./index";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe("Home Page", () => {
  it("should render Wave Chat label", () => {
    render(<Home />);

    const text = screen.getByText("Wave Chat");
    expect(text).toBeInTheDocument();
  });

  it("should submit a chat name", () => {
    render(<Home />);

    userEvent.type(
      screen.getByRole("textbox", { name: /chat name/i }),
      "Steven"
    );

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      expect.stringContaining("/chat/"),
      {
        state: { name: "Steven" }
      }
    );
  });
});
