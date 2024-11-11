
import './NoteItem.scss'

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const NoteItem = ({ title, content, onEdit, onDelete, createdDate }) => {
    return (
        <div className="note-item">
            <div className='note-item__header'>
                <h3 className="note-item__title">{truncateText(title, 20)}</h3>
                <p className="note-item__date">{createdDate}</p>
            </div>
            <p className="note-item__content">{truncateText(content, 100)}</p>
            <div className="note-item__buttons">
                <button className="note-item__button note-item__button--edit" onClick={onEdit}>Редактировать</button>
                <button className="note-item__button note-item__button--delete" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    );
};

export default NoteItem;
