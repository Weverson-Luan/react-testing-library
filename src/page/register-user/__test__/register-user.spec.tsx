/**
 * IMPORTS
 */
import { render, screen, fireEvent } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";

// screen
import { RegisterUser } from "../register-user";

describe("Create User New", () => {
  const worker = setupServer(
    rest.post(
      "https://reqres.in/api/users",
      async (request, response, context) => {
        await request.json();
        return response(
          context.json({
            name: "Luan Dev",
            id: 1,
          })
        );
      }
    )
  );
  beforeAll(() => {
    worker.listen();
  });

  // limpando todo handle antes de qualquer teste
  beforeAll(() => {
    worker.resetHandlers();
  });

  it("should be possible to create users", async () => {
    render(<RegisterUser />);

    // procurando pelo botão pelo texto
    const elementButtonRegisterUser = screen.getByText(/Registre/i);

    // vamos fazer  um onclick no botão
    fireEvent.click(elementButtonRegisterUser);

    // depois que usuário clickou no botão vamos ver se temos a task em tela
    await screen.findByText("Luan Dev");
  });

  /**
   * MOSTRAR UMA MENSAGEM DE ERROR SE NOSSA REQUISÃO FALHAR
   */
  it("should show error message if user sends some invalid parameter to api", async () => {
    worker.use(
      rest.post(
        "https://reqres.in/api/users",
        async (request, response, context) => {
          return response(
            context.status(404),
            context.json({ message: "Request failed with status code 404!" })
          );
        }
      )
    );
    render(<RegisterUser />);

    // procurando pelo botão pelo texto
    const elementButton = screen.getByText(/Registre/i);

    // vamos fazer  um onclick no botão
    fireEvent.click(elementButton);

    // depois que usuário clickou para fazer sua criação vamos receber um error
    await screen.findByText("Request failed with status code 404!");
  });
});
