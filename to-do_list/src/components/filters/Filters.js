import React, { useState, useEffect } from 'react';
import './filters.scss';

const Filters = ({ filters, onFilterChange, resetFilters }) => {
  const [statusFilter, setStatusFilter] = useState(filters.status);
  const [categoryFilter, setCategoryFilter] = useState(filters.category);

  useEffect(() => {
    setStatusFilter(filters.status);
    setCategoryFilter(filters.category);
  }, [filters]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    onFilterChange({ status, category: categoryFilter });
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    onFilterChange({ status: statusFilter, category });
  };

  return (
    <div className="filters">
      <h2>Фильтры</h2>
      <span>Статус:</span>
      <div className="filter-group">
        <button
          className={statusFilter === 'Все' ? 'active' : ''}
          onClick={() => handleStatusChange('Все')}
        >
          Все
        </button>
        <button
          className={statusFilter === 'Выполненные' ? 'active' : ''}
          onClick={() => handleStatusChange('Выполненные')}
        >
          Выполненные
        </button>
        <button
          className={statusFilter === 'Не выполненные' ? 'active' : ''}
          onClick={() => handleStatusChange('Не выполненные')}
        >
          Не выполненные
        </button>
      </div>

      <span>Категории:</span>
      <div className="filter-group">
        <button
          className={categoryFilter === 'Все' ? 'active' : ''}
          onClick={() => handleCategoryChange('Все')}
        >
          Все
        </button>
        <button
          className={categoryFilter === 'Работа' ? 'active' : ''}
          onClick={() => handleCategoryChange('Работа')}
        >
          Работа
        </button>
        <button
          className={categoryFilter === 'Личное' ? 'active' : ''}
          onClick={() => handleCategoryChange('Личное')}
        >
          Личное
        </button>
        <button
          className={categoryFilter === 'Учёба' ? 'active' : ''}
          onClick={() => handleCategoryChange('Учёба')}
        >
          Учёба
        </button>
      </div>
    </div>
  );
};

export default Filters;
