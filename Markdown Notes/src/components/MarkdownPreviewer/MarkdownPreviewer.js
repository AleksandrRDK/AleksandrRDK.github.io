import { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import './MarkdownPreviewer.scss';

const MarkdownPreviewer = ({ content }) => {
    const [isTextCentered, setIsTextCentered] = useState(false);
    const [isHeadingCentered, setIsHeadingCentered] = useState(false);
    const [theme, setTheme] = useState('theme-light');

    const toggleTextCenter = () => {
        setIsTextCentered(prev => !prev);
    }

    const toggleHeadingCenter = () => {
        setIsHeadingCentered(prev => !prev);
    }

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    return (
        <div className="markdown-previewer">
            <div className="markdown-previewer__controls">
            <button onClick={toggleTextCenter}>
                {isTextCentered ? 'Отменить выравнивание текста' : 'Выровнять текст по центру'}
            </button>
            <button onClick={toggleHeadingCenter}>
                {isHeadingCentered ? 'Отменить выравнивание заголовков' : 'Выровнять заголовки по центру'}
            </button>
            <div className={`markdown-previewer ${theme}`}>
                <div className="theme-selector">
                    <label htmlFor="theme">Выберите тему:</label>
                    <select id="theme" onChange={handleThemeChange} value={theme}>
                        <option value="theme-light">Светлая</option>
                        <option value="theme-dark">Темная</option>
                        <option value="theme-blue">Синяя</option>
                    </select>
                </div>
            </div>
            </div>
            <div
                className={`markdown-previewer__content
                    ${isTextCentered ? 'center-text' : ''}
                    ${isHeadingCentered ? 'center-headings' : ''}`}
            >
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );

};

export default MarkdownPreviewer;