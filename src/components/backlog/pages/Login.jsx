import { loginWithGoogle } from "../services/auth";

export default function Login() {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      alert(`Welcome ${user.displayName}!`);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1>HabitFlow</h1>
        <p>Your Productivity Dashboard</p>

        <button
          onClick={handleLogin}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            background: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}