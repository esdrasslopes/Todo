import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./taskDetails.css";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types";
import useToast from "../hooks/useToast";
import { useAuthContext } from "../contexts/AuthContext";
export type TaskPriority = "HIGH" | "LOW";
export type TaskStatus = "COMPLETED" | "PENDING";

const TaskDetails: React.FC = () => {
  const [task, setTask] = useState<Task>();

  const [updating, setUpdating] = useState(false);

  const showToast = useToast();
  const { getTaskById, completeTaskById } = useTasks();
  const { isAdmin } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTask = async () => {
      if (!id) return;

      try {
        const response = await getTaskById(id);
        if (response.status === 200) {
          setTask(response.task);
        }
      } catch (error) {
        showToast("Não foi possível encontrar a tarefa");
      }
    };

    getTask();
  }, [id, getTaskById, showToast]);

  const completeTask = async () => {
    if (!id) return;

    setUpdating(true);
    try {
      const response = await completeTaskById(id);
      if (response.status === 200) {
        showToast("Tarefa concluída com sucesso");
        navigate("/tasks");
      }
    } catch (error) {
      showToast("Não foi possível marcar a tarefa como concluída", "error");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusClass = (status: TaskStatus) =>
    status === "COMPLETED" ? "status-completed" : "status-pending";

  const getStatusText = (status: TaskStatus) =>
    status === "COMPLETED" ? "Concluída" : "Pendente";

  const getPriorityClass = (priority: TaskPriority) => {
    if (priority === "HIGH") return "priority-high";
    return "priority-low";
  };

  const getPriorityText = (priority: TaskPriority) => {
    if (priority === "HIGH") return "Alta";
    return "Baixa";
  };

  function formatDate(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  }

  return (
    <>
      {!task && <div className="detail-container">Carregando...</div>}

      {task && (
        <div className="detail-container">
          <div className="detail-page-container">
            <header className="detail-header">
              <h2>Detalhes da Tarefa</h2>
              <button
                className="detail-back-button"
                onClick={() => {
                  isAdmin ? navigate("/tasks/all") : navigate("/tasks");
                }}
              >
                &lt;&lt; Voltar
              </button>
            </header>

            <main className="detail-card">
              <div className="detail-card-header">
                <h3 className="detail-title">{task.props.title}</h3>

                <div className="detail-badges-container">
                  <span
                    className={`detail-priority-badge ${getPriorityClass(
                      task.props.priority
                    )}`}
                  >
                    Prioridade: {getPriorityText(task.props.priority)}
                  </span>

                  <span
                    className={`detail-status-badge ${getStatusClass(
                      task.props.status
                    )}`}
                  >
                    {getStatusText(task.props.status)}
                  </span>
                </div>
              </div>

              <p className="detail-description">{task.props.description}</p>

              <footer className="detail-footer">
                <span className="detail-date">
                  Criada em: {formatDate(task.props.createdAt)}
                </span>
              </footer>

              {task?.props.status === "PENDING" && !isAdmin && (
                <button
                  className="detail-button"
                  disabled={updating}
                  onClick={completeTask}
                >
                  {updating ? "Marcando..." : "Marcar como Concluída"}
                </button>
              )}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetails;
