/**
 * IMPORTS
 */

import { Sidbar } from "../../components/sidbar/sidbar";

const Home = () => {
  return (
    <div style={styles.container}>
      <Sidbar />
      <div>
        <div style={styles.constianerUsername}>
          <p>@luandev</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: "red",
    display: "flex",
  },
  constianerUsername: {
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: "orange",
  },
  title: {
    color: "#fff",
  },
  button: {
    width: 300,
    background: "blue",
    borderRadius: 6,
    padding: 8,
    border: "1px solid blue",
    cursor: "pointer",
  },
};
/**
 * EXPORTS
 */
export { Home };
