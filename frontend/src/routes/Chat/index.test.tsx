import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { io } from "socket.io-client";

import Chat from "./index";
import config from "../../config";

const mockedUsedLocation = { state: { name: "Steven" } };

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useLocation: () => mockedUsedLocation
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Chat Page", () => {
  let socket;

  beforeAll((done) => {
    socket = io(config.SOCKET_ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
      // Assigning the chat name with the socket connection
      query: { name: "Steven" }
    });
    done();
  });

  afterAll(() => {
    socket.disconnect();
  });

  it("should render welcome message", async () => {
    render(<Chat />);

    await waitFor(() => screen.getByText(/Admin: Welcome to Wave Chat App/i));
    expect(
      screen.getByText(/Admin: Welcome to Wave Chat App/i)
    ).toBeInTheDocument();
  });

  it("should render submitted message", async () => {
    render(<Chat />);

    userEvent.type(
      screen.getByRole("textbox", { name: /message/i }),
      "Hello!!"
    );
    userEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => screen.getByText(/Steven: Hello!!/i));
    expect(screen.getByText(/Steven: Hello!!/i)).toBeInTheDocument();
  });

  it("should render received message", async () => {
    render(<Chat />);

    await waitFor(() => screen.getByText(/Admin: Welcome to Wave Chat App/i));
    expect(
      screen.getByText(/Admin: Welcome to Wave Chat App/i)
    ).toBeInTheDocument();

    socket.emit("createMessage", {
      text: "Hi Alex"
    });

    await waitFor(() => screen.getByText(/Steven: Hi Alex/i));
    expect(screen.getByText(/Steven: Hi Alex/i)).toBeInTheDocument();
  });
});
