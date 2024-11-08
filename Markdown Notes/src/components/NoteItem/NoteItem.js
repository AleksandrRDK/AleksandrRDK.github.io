
import './NoteItem.scss'

const NoteItem = ({ title, content, onEdit, onDelete }) => {
    return (
        <div className="note-item">
            <h3 className="note-item__title">{title}</h3>
            <p className="note-item__content">{content}</p>
            <div className="note-item__buttons">
                <button className="note-item__button note-item__button--edit" onClick={onEdit}>Редактировать</button>
                <button className="note-item__button note-item__button--delete" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    );
};

export default NoteItem;
