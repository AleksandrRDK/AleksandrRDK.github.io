import { useState, useEffect } from "react"
import { fetchDayFact } from "../../api/factApi"

function DayFact () {
    const [dayFact, setDayFact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDayFact().then(fact => {
            setDayFact(fact);
            setLoading(false);
        })
    }, [])


    return (
        <div className="flex justify-center items-center bg-gray-900 px-4">
            <div className="border-2 border-blue-500 rounded-2xl p-6 max-w-lg w-full text-white shadow-lg bg-gray-800 h-full">
                {loading ? (
                    <div className="text-center text-blue-400 text-lg">Загрузка...</div>
                ) : (
                    <>
                        <div className="text-sm text-gray-400 text-center">
                            Источник:{" "}
                            <a
                                href={dayFact?.source_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                {dayFact?.source || "Unknown"}
                            </a>
                        </div>
                        <div className="mt-4 text-lg text-center font-medium">{dayFact.text}</div>
                    </>
                )}
            </div>
        </div>
    )
}

export default DayFact;