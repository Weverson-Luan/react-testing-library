/**
 * IMPORTS
 */
import { render, screen, fireEvent } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";

// screen
import { SignIn } from "../signin";

describe("user login", () => {
  const worker = setupServer(
    rest.post(
      "https://reqres.in/api/login",
      async (request, response, context) => {
        await request.json();
        return response(
          context.json({
            token: "QpwL5tke4Pnpja7X1",
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

  it("it must be possible to perform user login", async () => {
    render(<SignIn />);

    // procurando pelo botão pelo texto
    const elementButtonSignInerUser = screen.getByText(/Fazer Login/i);

    // vamos fazer  um onclick no botão para logar usuário
    fireEvent.click(elementButtonSignInerUser);

    // // depois que usuário fizer login vamos ter o token dele
    await screen.findByText(`token de usuario logado: QpwL5tke4Pnpja7X1`);
  });

  it("should show error message if user sends invalid credentials to api when logging in", async () => {
    worker.use(
      rest.post(
        "https://reqres.in/api/login",
        async (request, response, context) => {
          return response(
            context.status(400),
            context.json({
              message: "Request failed with status code 400",
            })
          );
        }
      )
    );

    // renderizando a screen(tela)
    render(<SignIn />);

    //procurando pelo botão de fazer login
    const elementSignInButton = screen.getByText(/Fazer Login/i);

    // vamos fazer  um onclick no botão para logar usuário e retornar um error
    fireEvent.click(elementSignInButton);

    // depois que usuário clickou para fazer seu login vamos mostrar um error
    await screen.findByText("Request failed with status code 400");
  });
});
