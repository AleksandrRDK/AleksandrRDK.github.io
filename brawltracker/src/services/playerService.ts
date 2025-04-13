import { Player } from '../types/player';

export const fetchPlayerClient = async (playerTag: string): Promise<Player> => {
    const response = await fetch(`/api/fetchPlayer?playerTag=${playerTag}`);

    // Логируем тело ответа как текст
    const responseBody = await response.text();

    // Проверяем, успешен ли запрос
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}. Ответ: ${responseBody}`);
    }

    // Пробуем распарсить как JSON
    try {
        return JSON.parse(responseBody);
    } catch (error) {
        throw new Error(`Ошибка при разборе JSON. Тело ответа: ${responseBody}`);
    }
};