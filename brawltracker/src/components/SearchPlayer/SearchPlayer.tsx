import { useState } from 'react';
import { fetchPlayerClient } from '../../services/playerService';
import { Player } from '../../types/player';

import './SearchPlayer.scss';

interface Players {
    name: string;
    tag: string;
}

const SearchPlayer = () => {
    const [playerTag, setPlayerTag] = useState<string>('');
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [brawlerFilter, setBrawlerFilter] = useState<string>('');

    const players: Players[] = [
        {name: "ZOMBEK", tag: "28cqrrcuc"},
        {name: "kolas", tag: "ycjjq0ll"},
        {name: "Gtema", tag: "lgcpj0092"},
        {name: "light", tag: "q92lqg8lc"}
    ]

    const handleSearch = async () => {
        setError(null);
        setPlayerData(null);
        setLoading(true);
        setIsLoading(true);

        if (!playerTag.trim()) {
            setError('Введите тег игрока');
            setLoading(false);
            setIsLoading(false);
            return;
        }

        try {
            const sanitizedTag = playerTag.replace('#', '');
            const data = await fetchPlayerClient(sanitizedTag);

            setPlayerData(data);
        } catch (e) {
            setError(
                e instanceof Error ? e.message : 'Произошла ошибка при запросе данных'
            );
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    };

    const handleButton = async (tag: string) => {
        setError(null);
        setPlayerData(null);
        setLoading(true);
        setIsLoading(true);
        try {
            const data = await fetchPlayerClient(tag);

            setPlayerData(data);
        } catch (e) {
            setError(
                e instanceof Error ? e.message : 'Произошла ошибка при запросе данных'
            );
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    }

    const filteredBrawlers = playerData?.brawlers.filter((brawler) =>
        brawler.name.toLowerCase().includes(brawlerFilter.toLowerCase())
    ) || [];

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

            <div className={`loader ${isLoading ? 'active' : ''}`}>
                <img
                    src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9NNnZ6TFU3Zll0bnZYY3RmS1l0Qy5wbmcifQ:supercell:9pchCIrAjAblmohlFf4vRwm-uooCyfL2WOBidzx8By8?width=2400"
                    alt="Loading..."
                    className="loader__icon"
                />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="player__cards">
                {players.map((player, index) => (
                    <button key={index} className='player__card' onClick={() => handleButton(player.tag)}>
                        {player.name}
                    </button>
                ))}
            </div>

            {playerData && (
                <div className="player-info">
                    <h2>Информация об игроке</h2>
                    <div className="player-header">
                        <div className="avatar">
                        <img
                            src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9CYzd6aEo1VUZYTGNzR25MaEdQdC5wbmcifQ:supercell:wmEhC5hiIQbtzfYgzVcPcm0ukfdOdTK344qRdRi7dNY?width=2400"
                            alt="Avatar"
                        />
                        </div>
                        <div className="player-basic-info">
                            <h3>
                            {playerData.name} <span className="player-tag">({playerData.tag})</span>
                            </h3>
                            <div className="progress-bar">
                            <div className="progress" style={{ width: `${(playerData.expPoints / 10000) * 100}%` }}></div>
                            </div>
                            <p>
                            <strong>Уровень: </strong>{playerData.expLevel} | <strong>Опыт: </strong>{playerData.expPoints}
                            </p>
                            <div className="club-info">
                            {playerData.club?.name || 'Нет клуба'}
                            </div>
                        </div>
                    </div>

                    <div className="player-stats">
                        <div className="stats-column">
                            <p><strong>Трофеи: </strong>{playerData.trophies}</p>
                            <p><strong>Макс. трофеи: </strong>{playerData.highestTrophies}</p>
                            <p><strong>Роборубка: </strong>{playerData.bestRoboRumbleTime}</p>
                            <p><strong>Большой Боец: </strong>{playerData.bestTimeAsBigBrawler}</p>
                        </div>
                        <div className="stats-column">
                            <p><strong>3vs3 Победы: </strong>{playerData['3vs3Victories']}</p>
                            <p><strong>2vs2 Победы: </strong>{playerData.duoVictories}</p>
                            <p><strong>Solo Победы: </strong>{playerData.soloVictories}</p>
                            <p><strong>Чемпионат пройден: </strong>{playerData.isQualifiedFromChampionshipChallenge ? 'Да' : 'Нет'}</p>
                        </div>
                    </div>
                    <h3>Список Бравлеров:</h3>
                    <input
                        type="text"
                        placeholder="Введите имя бравлера"
                        value={brawlerFilter}
                        onChange={(e) => setBrawlerFilter(e.target.value)}
                    />
                    <div className="brawlers-grid">
                        {filteredBrawlers.length > 0 ? (
                            filteredBrawlers.map((brawler) => (
                                <div className="brawler-card" key={brawler.id}>
                                    <h4>{brawler.name}</h4>
                                    <p>Сила: {brawler.power}</p>
                                    <p>Трофеи: {brawler.trophies}</p>
                                    <p>Максимальные трофеи: {brawler.highestTrophies}</p>
                                    <p>Звёздные силы: {brawler.starPowers.length > 0
                                        ? brawler.starPowers.map((sp) => sp.name).join(', ')
                                        : 'Нет'}</p>
                                    <p>Гаджеты: {brawler.gadgets.length > 0
                                        ? brawler.gadgets.map((gadget) => gadget.name).join(', ')
                                        : 'Нет'}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-brawlers">Нет такого бравлера</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPlayer;
