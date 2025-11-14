import React, { useState, useEffect, useCallback } from "react";
import "./Task.css";
import { useTasks } from "../hooks/useTasks";
import type { Tasks } from "../types";
import useToast from "../hooks/useToast";

export type TaskStatus = "COMPLETED" | "PENDING";

const Task: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<"ALL" | TaskStatus>("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [tasks, setTasks] = useState<Tasks[]>([]);

  const [totalPages, setTotalPages] = useState(1);

  const { getTasks } = useTasks();

  const showToast = useToast();

  const fetchTasks = useCallback(
    async (page: number, filter: "ALL" | TaskStatus) => {
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

  const handleFilterChange = (filter: "ALL" | TaskStatus) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusClass = (status: TaskStatus) => {
    if (status === "COMPLETED") return "status-completed";
    return "status-pending";
  };

  const getStatusText = (status: TaskStatus) => {
    if (status === "COMPLETED") return "Concluída";
    return "Pendente";
  };

  function formatDate(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    fetchTasks(currentPage, currentFilter);
  }, [currentPage, currentFilter]);

  return (
    <div className="tasks-container">
      <div className="tasks-page-container">
        <header className="tasks-header">
          <h2>Tarefas</h2>
        </header>

        <div className="tasks-filter-bar">
          {/* ... botões de filtro (sem mudança) ... */}
          <button
            onClick={() => handleFilterChange("ALL")}
            className={currentFilter === "ALL" ? "active" : ""}
          >
            Todas
          </button>
          <button
            onClick={() => handleFilterChange("PENDING")}
            className={currentFilter === "PENDING" ? "active" : ""}
          >
            Pendentes
          </button>
          <button
            onClick={() => handleFilterChange("COMPLETED")}
            className={currentFilter === "COMPLETED" ? "active" : ""}
          >
            Concluídas
          </button>
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
                className={`task-card ${getStatusClass(task.props.status)}`}
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
                <p className="task-description">{task.props.description}</p>
                <footer className="task-card-footer">
                  <span className="task-date">
                    Criada em: {formatDate(task.props.createdAt)}
                  </span>
                </footer>
              </article>
            ))
          )}
        </main>

        {/* --- Paginação (Sem mudança) --- */}
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
