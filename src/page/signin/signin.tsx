/**
 * IMPORTS
 */
import { useState } from "react";
import { Button } from "../../components/button";
import axios from "axios";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLoginWithAPI = async () => {
    try {
      setIsLoading(true);
      const response: any = await axios.post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });

      setIsLoading(false);
      setToken(response.data.token);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setErrorMessage(error.message);
      return error;
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Faça seu login</h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
        }}
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          style={styles.input}
          placeholder="Digite seu email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="text"
          id="password"
          style={styles.input}
          placeholder="Digite sua senha"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <Button
          title="Fazer Login"
          disabled={false}
          onClick={() => handleLoginWithAPI()}
        />
      </div>

      <>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div style={{ marginTop: 16 }}>
            token de usuario logado: {isLoading ? <p>carregando...</p> : token}
          </div>
        )}
      </>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: 34,
  },
  containerUsers: {
    marginTop: 18,
  },
  title: {
    color: "#000",
  },
  containerInput: {
    width: "100%",
    display: "flex",
  },
  button: {
    width: 200,
    background: "blue",
    borderRadius: 6,
    padding: 8,
    border: "1px solid blue",
    cursor: "pointer",
  },
  input: {
    width: 300,
    height: 40,
    border: "1px solid #cdcdcd",
    borderRadius: 6,
    paddingLeft: 16,
    marginBottom: 12,
  },
};
/**
 * EXPORTS
 */
export { SignIn };
