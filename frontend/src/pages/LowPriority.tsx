import React, { useState, useEffect, useCallback } from "react";
import "./Task.css";
import { useTasks } from "../hooks/useTasks";
import type { Task as TaskType } from "../types";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useTaskContext } from "../contexts/TaskContext";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import { Pencil, Trash2 } from "lucide-react";

export type TaskStatus = "COMPLETED" | "PENDING";

const LowPriority: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { formControl, formEditControl, setFormEditControl } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const navigate = useNavigate();
  const { getTasks, deleteTask } = useTasks();
  const showToast = useToast();

  const fetchTasks = useCallback(
    async (page: number) => {
      try {
        const response = await getTasks(page, "LOW");

        if (response.status === 200) {
          setTasks(response.tasks || []);
          setTotalPages(response.totalPages || 1);
        } else {
          showToast("Erro ao buscar tarefas", "error");
        }
      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
        showToast("Erro ao buscar tarefas", "error");
      } finally {
        setLoading(false);
      }
    },
    [getTasks, showToast]
  );

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const goToPage = (page: number) => setCurrentPage(page);

  const getStatusClass = (status: TaskStatus) => {
    if (status === "COMPLETED") return "status-completed";
    return "status-pending";
  };

  const getStatusText = (status: TaskStatus) =>
    status === "COMPLETED" ? "Concluída" : "Pendente";

  function formatDate(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await deleteTask(id);

      if (response?.status === 200) {
        showToast("Tarefa deletada com sucesso");
        fetchTasks(currentPage);
      }
    } catch (error) {
      showToast("Erro ao tentar deletar tarefa");
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="tasks-container">
      {formControl && <CreateTask />}
      {formEditControl && (
        <EditTask
          task={{
            id: selectedTask?.props.id ?? "",
            priority: selectedTask?.props.priority ?? "LOW",
            status: selectedTask?.props.status ?? "COMPLETED",
            title: selectedTask?.props.title ?? "",
            description: selectedTask?.props.description,
          }}
        />
      )}
      <div className="tasks-page-container">
        <header className="tasks-header">
          <h2>Tarefas de baixa prioridade pendentes</h2>
        </header>

        <main className="tasks-list">
          {tasks.length === 0 ? (
            <p className="tasks-empty">Nenhuma tarefa encontrada.</p>
          ) : (
            tasks.map((task) => (
              <article
                key={task.props.id}
                className={`task-card ${getStatusClass(task.props.status)}`}
                onClick={() => navigate(`/tasks/${task.props.id}`)}
              >
                <div className="task-card-header">
                  <h3 className="task-title">{task.props.title}</h3>

                  <span
                    className={`task-status ${getStatusClass(
                      task.props.status
                    )}`}
                  >
                    {getStatusText(task.props.status)}
                  </span>
                </div>

                <footer className="task-card-footer">
                  <span className="task-date">
                    Criada em: {formatDate(task.props.createdAt)}
                  </span>

                  <div className="task-actions-box">
                    <Pencil
                      size={18}
                      className="task-action-icon edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask({
                          props: {
                            description: task.props.description ?? "",
                            id: task.props.id,
                            priority: task.props.priority,
                            status: task.props.status,
                            title: task.props.title,
                            createdAt: task.props.createdAt,
                            directedTo: task.props.directedTo,
                          },
                        });
                        setFormEditControl(true);
                      }}
                    />

                    <Trash2
                      size={18}
                      className="task-action-icon delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.props.id);
                      }}
                    />
                  </div>
                </footer>
              </article>
            ))
          )}
        </main>

        {totalPages > 1 && (
          <footer className="tasks-pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              &lt;&lt; Anterior
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Próxima &gt;&gt;
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default LowPriority;
