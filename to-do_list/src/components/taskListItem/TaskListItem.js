import './taskListItem.scss';

const TaskListItem = ({ name, description, category, date, completed, onToggleComplete, onDelete }) => {
  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3 className="task-name">{name}</h3>
        <p className="task-description">{description}</p>
        <div className="task-meta">
          <span className="task-category">{category}</span>
          <span className="task-date">{date}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="toggle-complete-btn" onClick={onToggleComplete}>
          {completed ? 'Снять отметку' : 'Выполнено'}
        </button>
        <button className="delete-btn" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskListItem;
