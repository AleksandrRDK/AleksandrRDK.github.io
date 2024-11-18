import React, { useState } from 'react';
import Header from '../header/Header';
import TaskForm from '../taskForm/TaskForm';
import Filters from '../filters/Filters';
import TaskList from '../taskList/TaskList';
import { useGetTasksQuery } from '../../api/apiSlice';

import './app.scss';

const App = () => {
    const [filters, setFilters] = useState({
        status: 'Все',
        category: 'Все',
    });

    const { data: tasks = [] } = useGetTasksQuery();

    // Функция для изменения фильтров
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Функция для сброса фильтров
    const resetFilters = () => {
        setFilters({
            status: 'Все',
            category: 'Все',
        });
    };

    return (
        <main className="app">
            <div className='container'>
                <Header
                    tasks={tasks}
                    resetFilters={resetFilters}
                />
                <div className='app__wrapper'>
                    <div>
                        <TaskList filters={filters} />
                    </div>
                    <div>
                        <Filters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            resetFilters={resetFilters}
                        />
                        <TaskForm />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
