import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuthContext } from "../contexts/AuthContext";
import { useTaskContext } from "../contexts/TaskContext";

const Header: React.FC = () => {
  const { isAdmin } = useAuthContext();
  const { setFormControl } = useTaskContext();

  return (
    <header className="app-header">
      <nav className="app-nav">
        {!isAdmin ? (
          <>
            <NavLink to="/tasks" end>
              Todas
            </NavLink>
            <NavLink to="/tasks/pending">Pendentes</NavLink>
            <NavLink to="/tasks/completed">Concluídas</NavLink>
            <NavLink to="/tasks/my-completed">Minhas Concluídas</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/tasks/all">Todas</NavLink>
            <NavLink to="/tasks/high">Alta prioridade</NavLink>
            <NavLink to="/tasks/low">Baixa prioridade</NavLink>
            <NavLink to="/users/summury">Resumo usuários</NavLink>
          </>
        )}
      </nav>

      {isAdmin && (
        <button
          className="create-task-btn"
          onClick={() => setFormControl(true)}
        >
          + Criar Tarefa
        </button>
      )}
    </header>
  );
};

export default Header;
