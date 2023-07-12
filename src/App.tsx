import { Button } from "./components/button";
import { Home } from "./page/home/home";
import { SignIn } from "./page/signin/signin";
import "./index.css";
import { RegisterUser } from "./page/register-user/register-user";
function App() {
  return (
    <div className="App">
      <RegisterUser />
    </div>
  );
}

export default App;
