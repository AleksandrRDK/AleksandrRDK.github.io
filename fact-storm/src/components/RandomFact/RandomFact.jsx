import { useState, useEffect, useRef } from "react";
import { fetchRandomFact } from "../../api/factApi";
import { translateText } from "../../api/translateApi";

function RandomFact({ addToHistory }) {
    const [randomFact, setRandomFact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [translatedFact, setTranslatedFact] = useState('');
    const [isTranslated, setIsTranslated] = useState(false);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            loadFact();
        }
    }, []);

    const loadFact = async () => {
        setLoading(true);
        setTranslatedFact(""); // Очищаем перевод при смене факта
        setIsTranslated(false);
        try {
            const fact = await fetchRandomFact();
            setRandomFact(fact);
            addToHistory(fact);
        } catch (error) {
            console.error("Ошибка загрузки факта:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTranslate = async () => {
        if (!randomFact) return;
        const targetLang = isTranslated ? "en" : "ru"; // Переключаем язык
        try {
            const translated = await translateText(randomFact.text, targetLang);
            setTranslatedFact(translated);
            setIsTranslated(!isTranslated);
        } catch (error) {
            console.error("Ошибка перевода:", error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-900 px-4">
            <div className="border-2 border-blue-500 rounded-2xl p-6 max-w-lg w-full text-white shadow-lg bg-gray-800 h-full">
                {loading ? (
                    <div className="text-center text-blue-400 text-lg">Загрузка...</div>
                ) : randomFact ? (
                    <>
                        <div className="text-sm text-gray-400 text-center">
                            Источник:{" "}
                            <a
                                href={randomFact?.source_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                {randomFact?.source || "Unknown"}
                            </a>
                        </div>
                        <div className="mt-4 text-lg text-center font-medium">
                            {isTranslated ? translatedFact : randomFact.text}
                        </div>
                    </>
                ) : (
                    <div className="text-center text-red-400 text-lg">Ошибка загрузки</div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={loadFact}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        {loading ? "Загрузка..." : "Следующий факт"}
                    </button>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg text-white text-center">
                    <button
                        onClick={handleTranslate}
                        disabled={!randomFact}
                        className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                        {isTranslated ? "Перевести на английский" : "Перевести на русский"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RandomFact;
