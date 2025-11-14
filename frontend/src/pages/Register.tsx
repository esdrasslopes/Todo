import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  group: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    group: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    alert("Registro enviado!");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>

        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="group">Grupo</label>
          <select
            id="group"
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um grupo
            </option>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
            <option value="manager">Gerente</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Registrar
        </button>

        <p className="login-link">
          Já tem uma conta? <Link to="/">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
