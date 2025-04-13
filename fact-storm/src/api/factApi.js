export const fetchRandomFact = async () => {
    try {
        const response = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random`);
        if(!response.ok) throw new Error(`Ошибка при получении факта`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return 'Не удалось загрузить факт 😢';
    }
}

export const fetchDayFact = async () => {
    try {
        const response = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/today`);
        if (!response.ok) throw new Error(`Ошибка при получении факта дня`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return 'Не удалось загрузить факт дня 😢';
    }
}