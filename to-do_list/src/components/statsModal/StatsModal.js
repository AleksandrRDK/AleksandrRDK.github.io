import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const StatsModal = ({ show, handleClose, totalTasks, completedTasks, remainingTasks }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Статистика</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Всего задач: {totalTasks}</p>
                <p>Выполнено: {completedTasks}</p>
                <p>Оставшиеся: {remainingTasks}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StatsModal;
