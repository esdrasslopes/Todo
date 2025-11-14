import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { api } from "../lib/api";
import type { UsersGroups } from "../types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useToast from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

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

  const [usersGroups, setUsersGroups] = useState<UsersGroups[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const showToast = useToast();

  const { registerUser } = useAuth();

  const navigate = useNavigate();

  const fetchUserGroups = async () => {
    try {
      const response = await api.get("/user-group?page=1");

      const groups = response.data.usersGroups;

      setUsersGroups(groups);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidate = (data: FormData) => {
    if (
      data.email === "" ||
      data.password === "" ||
      data.name === "" ||
      data.group === ""
    ) {
      return false;
    }

    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleValidate(formData)) {
      showToast("Preencha todos os campos", "error");
      return;
    }

    const response = await registerUser({
      email: formData.email,
      groupId: formData.group,
      name: formData.name,
      password: formData.password,
    });

    if (response.status === 201) {
      showToast("Usuário criado com sucesso");
      navigate("/");
      return;
    }

    showToast(`Usuário com email ${formData.email} já existe`, "error");
  };

  useEffect(() => {
    fetchUserGroups();
  }, []);

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
            {usersGroups.map((group) => (
              <option value={group.props.id} key={group.props.id}>
                {group.props.groupName}
              </option>
            ))}
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
