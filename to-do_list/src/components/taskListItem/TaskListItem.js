import './taskListItem.scss';

import { FaStar } from "react-icons/fa6";
import { CSSTransition } from 'react-transition-group';

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
        <CSSTransition
          in={completed} // Условие для появления/исчезновения
          timeout={300}  // Время анимации
          classNames="star" // Префикс для классов анимации
          unmountOnExit  // Удаляет элемент из DOM, когда он не виден
        >
          <div className="task-item__star__wrapper">
            <FaStar className='task-item__star'/>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default TaskListItem;
