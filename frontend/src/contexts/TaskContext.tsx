import { createContext, useContext, useState } from "react";

interface TaskContextType {
  formControl: boolean;
  setFormControl: (value: boolean) => void;
  formEditControl: boolean;
  setFormEditControl: (value: boolean) => void;
}

const TaskContext = createContext<TaskContextType>({} as any);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [formControl, setFormControl] = useState(false);
  const [formEditControl, setFormEditControl] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        formControl,
        setFormControl,
        formEditControl,
        setFormEditControl,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
