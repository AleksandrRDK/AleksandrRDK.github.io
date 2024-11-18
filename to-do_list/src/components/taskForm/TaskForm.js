import React, { useState } from 'react';
import { useCreateTaskMutation } from '../../api/apiSlice';

import './taskForm.scss'

const TaskForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Работа');
  const [date, setDate] = useState('');
  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name && date) {
      await createTask({ name, description, category, date });
      setName('');
      setDescription('');
      setCategory('Работа');
      setDate('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={onSubmit}>
      <h2>Добавить новую задачу:</h2>
      <label htmlFor="task-title">Название:</label>
      <div className="form-group">
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <label htmlFor="task-description">Описание:</label>
      <div className="form-group">
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Категория:</label>
        <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Работа">Работа</option>
          <option value="Личное">Личное</option>
          <option value="Учёба">Учёба</option>
        </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="task-date">Дата выполнения:</label>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className='add-task-btn'>Добавить задачу</button>
    </form>
  );
};

export default TaskForm;
