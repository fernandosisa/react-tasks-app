import { createContext, useEffect, useState } from 'react';
import { tasks as data } from "../data/tasks";

// el contexto es como un componente que tendra el estado (variables useState) para facilitar pasarla a los componentes hijo
// aqui creamos un contexto de nombre TaskContext
export const TaskContext = createContext();

// este es el componente q engloba al resto de componentes
export function TaskContextProvider(props) {
    const [tasks, setTasks] = useState([]);

    function createTask(task) {
        setTasks([...tasks, {
            title: task.title,
            id: tasks.length,
            description: task.description
        }])
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    useEffect(() => {
        setTasks(data)
    }, []);

    return (
        <TaskContext.Provider value={{
            tasks,
            deleteTask,
            createTask
        }}>
            {/* aquidecimos q este tendra elementos hijo */}
            {props.children}
        </TaskContext.Provider>
    )
}