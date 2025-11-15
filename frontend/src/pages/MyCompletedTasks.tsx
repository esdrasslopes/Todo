import React, { useState, useEffect, useCallback } from "react";
import { useTasks } from "../hooks/useTasks";
import type { Task as TaskType } from "../types";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import "./Task.css";

export type TaskStatus = "COMPLETED" | "PENDING";

const MyCompletedTasks: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { getTasks } = useTasks();
  const showToast = useToast();

  const fetchTasks = useCallback(
    async (page: number) => {
      try {
        const response = await getTasks(page, "MY");

        if (response.status === 200) {
          setTasks(response.tasks);
          setTotalPages(response.totalPages);
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
    if (status === "COMPLETED") return "status-user-completed";
    return "status-pending";
  };

  const getStatusText = (status: TaskStatus) =>
    status === "COMPLETED" ? "Concluída" : "Pendente";

  function formatDate(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-page-container">
        <header className="tasks-header">
          <h2>Tarefas Concluídas</h2>
        </header>

        <main className="tasks-list">
          {tasks.length === 0 ? (
            <p className="tasks-empty">Nenhuma tarefa concluída encontrada.</p>
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

export default MyCompletedTasks;
