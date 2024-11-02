import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from "../../api/apiSlice";
import TaskListItem from "../taskListItem/TaskListItem";
import './taskList.scss';

const TaskList = ({ filters }) => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Произошла ошибка при загрузке задач</p>;

  // Фильтрация задач по статусу и категории
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filters.status === 'Все' ||
      (filters.status === 'Выполненные' && task.completed) ||
      (filters.status === 'Не выполненные' && !task.completed);

    const matchesCategory =
      filters.category === 'Все' || task.category === filters.category;

    return matchesStatus && matchesCategory;
  });

  // Функция для изменения статуса задачи
  const handleToggleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <ul className="task-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <li key={task.id}>
            <TaskListItem
              name={task.name}
              description={task.description}
              category={task.category}
              date={task.date}
              completed={task.completed}
              onToggleComplete={() => handleToggleComplete(task)}
              onDelete={() => deleteTask(task.id)}
            />
          </li>
        ))
      ) : (
        <p>Нет задач, соответствующих фильтрам</p>
      )}
    </ul>
  );
};

export default TaskList;
