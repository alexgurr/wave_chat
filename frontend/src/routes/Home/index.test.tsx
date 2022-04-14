import { render, screen } from "@testing-library/react";

import Home from "./index";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe("Home Page", () => {
  it("should render home page", async () => {
    render(<Home />);

    const text = screen.getByText("Wave Chat");
    expect(text).toBeInTheDocument();
  });
});
