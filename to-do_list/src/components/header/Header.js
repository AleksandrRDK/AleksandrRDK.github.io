import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import StatsModal from '../statsModal/StatsModal';
import './header.scss';

const Header = ({ tasks, resetFilters }) => {
    const [showModal, setShowModal] = useState(false);

    // Подсчёт задач
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;

    return (
        <nav className="header">
            <h1 className="header__heading">To-Do List</h1>
            <div className="header__wrapper">
                <Button className="primary" onClick={resetFilters}>Все задачи</Button>
                <Button className="primary" onClick={() => setShowModal(true)}>Статистика</Button>
            </div>

            {/* Модальное окно статистики */}
            <StatsModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                remainingTasks={remainingTasks}
            />
        </nav>
    );
}

export default Header;
