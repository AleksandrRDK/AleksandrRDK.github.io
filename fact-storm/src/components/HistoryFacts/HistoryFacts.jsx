function HistoryFacts({ history, clearHistory }) {
    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mt-6 border border-blue-500">
            <h2 className="text-xl font-semibold text-blue-400 text-center mb-4">
                История фактов
            </h2>
            {history.length > 0 ? (
                <ul className="space-y-3">
                    {history.map((fact, index) => (
                        <li
                            key={index}
                            className="p-3 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-700 transition"
                        >
                            {fact.text}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-center">История пуста</p>
            )}
            {history.length > 0 && (
                <button
                    onClick={clearHistory}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition font-semibold"
                >
                    Очистить историю
                </button>
            )}
        </div>
    );
}

export default HistoryFacts;
