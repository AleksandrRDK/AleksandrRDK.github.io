import { useState } from 'react';
import { fetchPlayerClient } from '../../services/playerService';
import { Player } from '../../types/player';

import './SearchPlayer.scss';

const SearchPlayer = () => {
    const [playerTag, setPlayerTag] = useState<string>('');
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        setError(null);
        setPlayerData(null);
        setLoading(true);

        if (!playerTag.trim()) {
            setError('Введите тег игрока');
            setLoading(false);
            return;
        }

        try {
            // Удаляем символ `#` из тега перед отправкой запроса
            const sanitizedTag = playerTag.replace('#', '');
            const data = await fetchPlayerClient(sanitizedTag);

            setPlayerData(data);
        } catch (e) {
            setError(
                e instanceof Error ? e.message : 'Произошла ошибка при запросе данных'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-player">
            <h1>Поиск игрока</h1>
            <input
                type="text"
                placeholder="Введите тег игрока (например, #ABC123)"
                value={playerTag}
                onChange={(e) => setPlayerTag(e.target.value)}
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Поиск...' : 'Искать'}
            </button>

            {error && <p className="error">{error}</p>}

            {playerData && (
                <div className="player-info">
                    <h2>Информация об игроке</h2>
                    <p>
                        <strong>Имя:</strong> {playerData.name}
                    </p>
                    <p>
                        <strong>Тег:</strong> {playerData.tag}
                    </p>
                    <p>
                        <strong>Трофеи:</strong> {playerData.trophies}
                    </p>
                    <p>
                        <strong>Клуб:</strong>{' '}
                        {playerData.club?.name || 'Нет клуба'}
                    </p>
                    <h3>Список Бравлеров:</h3>
                    <ul>
                        {playerData.brawlers.map((brawler) => (
                            <li key={brawler.id}>
                                <strong>{brawler.name}</strong> — Сила: {brawler.power}, Трофеи:{' '}
                                {brawler.trophies}
                                <br />
                                <em>Звёздные силы:</em>{' '}
                                {brawler.starPowers.length > 0
                                    ? brawler.starPowers.map((sp) => sp.name).join(', ')
                                    : 'Нет'}
                                <br />
                                <em>Гаджеты:</em>{' '}
                                {brawler.gadgets.length > 0
                                    ? brawler.gadgets.map((gadget) => gadget.name).join(', ')
                                    : 'Нет'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchPlayer;
