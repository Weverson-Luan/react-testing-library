/**
 * IMPORTS
 */

const Sidbar = () => {
  return (
    <div style={styles.containerSidbar}>
      <p>sidbar</p>
    </div>
  );
};

const styles = {
  containerSidbar: {
    width: 200,
    height: "100vh",
    backgroundColor: "blue",
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
export { Sidbar };
