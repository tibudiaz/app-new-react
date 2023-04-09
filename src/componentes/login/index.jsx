import React, { useState } from "react";
import { firebase } from "../../firebaseConfig";
import AddProductForm from "../administrador";
import { ProductList } from "../listado";
import { ImageUploader } from "../cargarimg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Autenticar con Firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // El inicio de sesión es exitoso, habilitar el componente de administrador
        setIsAdmin(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      {isAdmin ? (
        <>
    <AddProductForm />
    <ProductList />
    <ImageUploader />
  </>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btnasd" type="submit">Iniciar sesión</button>
        </form>
      )}
    </div>
  );
}

export default Login;
