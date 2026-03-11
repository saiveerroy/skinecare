export default function Skeleton() {
  return (
    <div style={styles.card}>
      <div style={styles.line}></div>
      <div style={styles.input}></div>
      <div style={styles.input}></div>
      <div style={styles.button}></div>
    </div>
  );
}

const styles = {
  card: {
    width: 380,
    padding: 30,
    background: "#eee",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  line: { height: 24, background: "#ddd", borderRadius: 6 },
  input: { height: 44, background: "#ddd", borderRadius: 8 },
  button: { height: 44, background: "#ccc", borderRadius: 8 },
};
