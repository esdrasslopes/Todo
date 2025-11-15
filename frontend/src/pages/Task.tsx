import React, { useState, useEffect, useCallback } from "react";
import "./Task.css";
import { useTasks } from "../hooks/useTasks";
import type { Task as TaskType } from "../types";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

export type TaskStatus = "COMPLETED" | "PENDING";

const Task: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<"ALL" | TaskStatus | "MY">(
    "ALL"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const { getTasks } = useTasks();
  const showToast = useToast();

  const fetchTasks = useCallback(
    async (page: number, filter: "ALL" | TaskStatus | "MY") => {
      try {
        const response = await getTasks(page, filter);

        if (response.status === 200) {
          setTasks(response.tasks);
          setTotalPages(response.totalPages);
        } else {
          showToast("Erro ao buscar tarefas", "error");
        }
      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
        showToast("Erro ao buscar tarefas", "error");
      }
    },
    [getTasks, showToast]
  );

  const handleFilterChange = (filter: "ALL" | TaskStatus | "MY") => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  // --- Classes separadas para card e badge ---
  const getCardClass = (status: TaskStatus) => {
    if (currentFilter === "MY") return "status-user-completed";
    if (status === "COMPLETED") return "status-completed";
    return "status-pending";
  };

  const getBadgeClass = (status: TaskStatus) => {
    if (status === "COMPLETED") return "status-completed";
    return "status-pending";
  };

  const getStatusText = (status: TaskStatus) =>
    status === "COMPLETED" ? "Concluída" : "Pendente";

  function formatDate(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    fetchTasks(currentPage, currentFilter);
  }, [currentPage, currentFilter, fetchTasks]);

  return (
    <div className="tasks-container">
      <div className="tasks-page-container">
        <header className="tasks-header">
          <h2>Tarefas</h2>
        </header>

        <div className="tasks-filter-bar">
          {["ALL", "PENDING", "COMPLETED", "MY"].map((filter) => (
            <button
              key={filter}
              onClick={() =>
                handleFilterChange(filter as "ALL" | TaskStatus | "MY")
              }
              className={currentFilter === filter ? "active" : ""}
            >
              {filter === "ALL"
                ? "Todas"
                : filter === "PENDING"
                ? "Pendentes"
                : filter === "COMPLETED"
                ? "Concluídas"
                : "Minhas tarefas concluídas"}
            </button>
          ))}
        </div>

        <main className="tasks-list">
          {tasks.length === 0 ? (
            <p className="tasks-empty">
              Nenhuma tarefa encontrada para este filtro.
            </p>
          ) : (
            tasks.map((task) => (
              <article
                key={task.props.id}
                className={`task-card ${getCardClass(task.props.status)}`}
                onClick={() => navigate(`/tasks/${task.props.id}`)}
              >
                <div className="task-card-header">
                  <h3 className="task-title">{task.props.title}</h3>
                  <span
                    className={`task-status ${getBadgeClass(
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

export default Task;
