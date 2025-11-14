import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useToast from "../hooks/useToast";

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

  const showToast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleValidate = (data: LoginData) => {
    if (data.email === "" || data.password === "") {
      return false;
    }

    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleValidate(formData)) {
      showToast("Preencha todos os campos", "error");
      return;
    }

    const response = await authenticateUser({
      email: formData.email,
      password: formData.password,
    });

    if (response.status === 200) {
      showToast("Bem vindo de volta");
      navigate("/tasks");
      return;
    }

    showToast(`Credenciais inválidas`, "error");
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

        <div className="form-group password-group">
          <label htmlFor="password">Senha</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </div>
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
