import React, { useState, useEffect, useCallback } from "react";
import "./UsersSummury.css";
import Loading from "../components/Loading";
import type { UsersSummary as UsersSummaryType } from "../types/index";
import useToast from "../hooks/useToast";
import { api } from "../lib/api";

export interface UserSummaryProps {
  id: string;
  userName: string;
  groupName: "ADMIN" | "MANAGER" | "USER";
  finishedTasks: number;
}

const UsersSummary: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UsersSummaryType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  const fetchUsers = useCallback(async (page: number) => {
    try {
      const response = await api.get(`/user/summury?page=${page}`);

      if (response.status === 200) {
        setUsers(response.data.summury);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Falha ao buscar tarefas:", error);
      showToast("Erro ao buscar tarefas", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  // Helpers para os badges de grupo
  const getGroupClass = (group: "ADMIN" | "MANAGER" | "USER") => {
    if (group === "ADMIN") return "group-admin";
    if (group === "MANAGER") return "group-manager";
    return "group-user";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="user-history-container">
      <div className="user-history-page-container">
        <header className="user-history-header">
          <h2>Histórico de Usuários</h2>
        </header>

        {/* Lista de Cards de Usuário */}
        <main className="user-history-list">
          {users.length === 0 ? (
            <p className="user-history-empty">Nenhum usuário encontrado.</p>
          ) : (
            users.map((user) => (
              <article key={user.props.id} className="user-card">
                <div className="user-card-header">
                  <h3 className="user-title">{user.props.userName}</h3>
                  <span
                    className={`user-group-badge ${getGroupClass(
                      user.props.groupName
                    )}`}
                  >
                    {user.props.groupName}
                  </span>
                </div>
                <footer className="user-card-footer">
                  <span className="user-task-count">
                    {user.props.finishedTasks} Tarefas Concluídas
                  </span>
                </footer>
              </article>
            ))
          )}
        </main>

        {totalPages > 1 && (
          <footer className="user-history-pagination">
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

export default UsersSummary;
