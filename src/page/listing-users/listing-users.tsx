/**
 * IMPORTS
 */

import "./index.css";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import axios from "axios";

interface ITaskDataProps {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
const ListingUsers = () => {
  const [users, setUsers] = useState<ITaskDataProps[]>([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGetAllUsers = async () => {
    try {
      setTaskLoading(true);
      const responseUsers = await axios.get(
        "https://reqres.in/api/users?page=1"
      );

      setUsers(responseUsers.data.data);
      setTaskLoading(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setTaskLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Todos usuários cadastrados</h1>

      <>
        {taskLoading ? (
          <p>carregando...</p>
        ) : (
          <>
            {users.length > 0 &&
              users.map((task: ITaskDataProps, index) => (
                <div key={task.id} className="card-users">
                  <p>Nome: {task.first_name}</p>
                  <p>E-mail: {task.email}</p>
                </div>
              ))}
          </>
        )}
      </>

      {errorMessage ?? <p>{errorMessage}</p>}
    </div>
  );
};

/**
 * EXPORTS
 */
export { ListingUsers };
