import './Header.scss';
import { useTheme } from '../ThemeContext/ThemeContext';

const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="header__wrapper">
      <h1>Markdown Notes</h1>
      <div className="theme-toggle">
        <button onClick={() => toggleTheme('light')}>Светлая</button>
        <button onClick={() => toggleTheme('dark')}>Тёмная</button>
        <button onClick={() => toggleTheme('blue')}>Морская</button>
      </div>
    </header>
  );
};

export default Header;
