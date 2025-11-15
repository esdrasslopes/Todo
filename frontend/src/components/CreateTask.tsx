import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useTasks } from "../hooks/useTasks";
import useToast from "../hooks/useToast";
import "./CreateTask.css";
import type { CreateTaskForm, UsersGroups } from "../types";
import { useTaskContext } from "../contexts/TaskContext";
import { api } from "../lib/api";

const CreateTask: React.FC = () => {
  const showToast = useToast();
  const { createTask } = useTasks();
  const { setFormControl } = useTaskContext();
  const [usersGroups, setUsersGroups] = useState<UsersGroups[]>([]);

  const [formData, setFormData] = useState<CreateTaskForm>({
    title: "",
    description: "",
    priority: "LOW",
    directedTo: "",
    status: "PENDING",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormControl(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.directedTo === "") {
      showToast("Por favor, selecione um grupo.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await createTask(formData);
      showToast("Tarefa criada com sucesso!", "success");
      setFormControl(false);
    } catch (error) {
      console.error(error);
      showToast("Erro ao criar tarefa.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUserGroups = async () => {
    try {
      const response = await api.get("/user-group?page=1");

      const groups = response.data.usersGroups;

      setUsersGroups(groups);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserGroups();
  }, []);

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          &times;
        </button>

        <h2>Criar Nova Tarefa</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="priority">Prioridade</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="LOW">Baixa</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          <div className="modal-form-group">
            <label htmlFor="directedTo">Grupo (Atribuir para)</label>
            <select
              id="group"
              name="directedTo"
              value={formData.directedTo}
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

          <button
            type="submit"
            className="modal-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando..." : "Criar Tarefa"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
