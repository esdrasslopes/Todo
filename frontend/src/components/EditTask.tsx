import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import useToast from "../hooks/useToast";
import "./CreateTask.css";
import type { EditTaskForm } from "../types";
import { useTaskContext } from "../contexts/TaskContext";

interface TaskToEdit {
  id: string;
  title: string;
  description?: string | null;
  status: "PENDING" | "COMPLETED";
  priority: "HIGH" | "LOW";
}

interface EditTaskProps {
  task: TaskToEdit;
}

const EditTask: React.FC<EditTaskProps> = ({ task }: EditTaskProps) => {
  const navigate = useNavigate();
  const showToast = useToast();
  const { editTask } = useTasks();
  const { setFormEditControl } = useTaskContext();

  const [formData, setFormData] = useState<EditTaskForm>({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
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
    setFormEditControl(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await editTask(formData, task.id);
      showToast("Tarefa criada com sucesso!", "success");
      setFormEditControl(false);
    } catch (error) {
      console.error(error);
      showToast("Erro ao criar tarefa.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          &times;
        </button>

        <h2>Editar Tarefa</h2>

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
              value={formData.description ?? ""}
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

          <button
            type="submit"
            className="modal-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Editando..." : "Editar Tarefa"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
