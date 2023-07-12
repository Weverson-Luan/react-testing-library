import { Button } from "./components/button";
import { Home } from "./page/home/home";
import { SignIn } from "./page/signin/signin";
import "./index.css";
import { RegisterUser } from "./page/register-user/register-user";
import { ListingUsers } from "./page/listing-users/listing-users";
function App() {
  return (
    <div className="App">
      <ListingUsers />
    </div>
  );
}

export default App;
