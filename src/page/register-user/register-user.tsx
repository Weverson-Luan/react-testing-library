/**
 * IMPORTS
 */
import { useState, useEffect } from "react";
import { Button } from "../../components/button";
import axios from "axios";

interface IUserData {
  id: string;
  name: string;
  createdAt: string;
}
const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<IUserData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const handleGetAllUsers = async () => {
    try {
      const response: IUserData[] = [];

      if (response) {
        setUsers(response);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterUserAPI = async () => {
    try {
      setIsLoading(true);
      const valuesTotal = users.length;

      const response: any = await axios.post("https://reqres.in/api/users", {
        name: username,
        id: valuesTotal + 1,
      });

      const res = [...users, response.data];
      setUsers(res);
      setIsLoading(false);
      setUsername("");
    } catch (error: any) {
      setErrorMessage(error.message);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={{ marginBottom: 12 }}>Crie seu usuário</h3>
      <input
        type="text"
        id="username"
        style={styles.input}
        placeholder="Digite seu usário"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />

      <div style={{ marginTop: 16 }}>
        <Button
          title="Registre"
          disabled={false}
          onClick={() => handleRegisterUserAPI()}
        />
      </div>

      <div>
        {isLoading ? (
          <p>carregando..</p>
        ) : (
          <div style={styles.containerUsers}>
            <h3>Usuários Cadastrados</h3>
            {users.length > 0 ? (
              users.map((user, inde) => (
                <div key={user.id}>
                  <div style={{ marginBottom: 28, paddingLeft: 4 }}>
                    <p>
                      Nome:{" "}
                      <span style={{ color: "#6d6d6d" }}>{user.name}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ marginTop: 12, color: "#4a4444" }}>
                {errorMessage ? errorMessage : "Nenhun registro cadastrado"}!
              </p>
            )}
          </div>
        )}
      </div>
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
    color: "#fff",
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
  },
};
/**
 * EXPORTS
 */
export { RegisterUser };
