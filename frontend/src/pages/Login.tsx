import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { authenticateUser } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await authenticateUser({
      email: formData.email,
      password: formData.password,
    });

    console.log(response);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Entrar
        </button>

        <p className="register-link">
          Ainda não tem conta? <Link to="/register">Registre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
