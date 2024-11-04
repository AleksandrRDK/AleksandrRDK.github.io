import './Header.scss'

const Header = () => {
    return (
        <header className="header__wrapper">
            <h1>Markdown Notes</h1>
            <div className="header__btns">
                <button className="header__btn__add" aria-label="Добавить новую заметку">Добавить</button>
                <button className="header__btn__clear" aria-label="Очистить заметку">Очистить</button>
            </div>
        </header>
    )
}

export default Header;